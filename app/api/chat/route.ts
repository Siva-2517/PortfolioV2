import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { Redis } from "@upstash/redis";

// Initialize Redis for rate limiting if variables are present
let redis: Redis | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
  });
}

const systemPrompt = `You are a helpful, professional, and friendly AI assistant representing Siva Surya P, an AI Engineer.
Your goal is to answer questions about Siva's portfolio, experience, skills, projects, patent, and background.
Here is the context about Siva:
- Name: Siva Surya P
- Titles: AI Engineer, Python Developer, Full Stack Engineer
- Contact: sivatechie17@gmail.com, +91 9087474500
- Education: B.Tech Information Technology, Sri Shakthi Institute of Engineering and Technology, Coimbatore (CGPA 8.23, expected graduation 2027). HSC: Bishop Ubagarasamy Matric Hr. Sec. School, Tirupur (85%, 2023).
- Internship: Agentic AI Intern at Innomatics Research Labs (Feb 2026 - May 2026). Developed Agentic workflows using LangGraph/LLMs and context-aware RAG pipelines using ChromaDB.
- Skills:
  - Languages: Python, JavaScript, Java, Data Structures & Algorithms
  - AI/ML & GenAI: NumPy, Pandas, LangChain, LangGraph, RAG, HuggingFace, OpenCV
  - Frameworks: FastAPI, Node.js, Express.js, React.js, Spring Boot
  - Databases: MongoDB, ChromaDB
  - Tools: REST APIs, Git/GitHub, Postman, VS Code
- Certifications: Python Professional Course (Infosys SpringBoard), Java Professional Course (Infosys SpringBoard), Prompt Engineering (DeepLearning.AI).
- Patent: "HARBOUR Management System" published in International Journal of Progressive Research in Engineering Management and Science.
- Projects:
  1. NulAware AI: Streamlit, ChromaDB, Gemini API, LangGraph, ydata-profiling, Python, Plotly. Interactive data profiling assistant with CSV upload, automated profiling, semantic retrieval, natural-language Q&A, and PDF reports.
  2. RAG-Based Customer Support Assistant: Python, LangChain, LangGraph, Gemini API, ChromaDB, Streamlit. Features intent routing, vector search, human-in-the-loop, Streamlit chat.
  3. Cursor Movement by Hand Gesture: Python, OpenCV, MediaPipe, PyAutoGUI, NumPy. Webcam-based touchless mouse controls.
  4. College Sphere - Events Management: MERN stack (React, Node, Express, Mongo), Cloudinary, OTP auth.
  5. Automated Attendance System: MERN, Spring Boot, Face recognition APIs, QR module.
  6. Parking Lot Management: Console-based Java OOP system using Collections.
- Personality: Maintain a professional, positive, and technically accurate tone. Speak in the third person when referring to Siva, or act as his personal representative. Keep answers relatively concise and easy to read.
If asked questions outside Siva's background, politely redirect to Siva's work, but stay friendly.`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // 1. Rate Limiting Check (Upstash Redis)
    if (redis) {
      // Resolve visitor IP (supporting Vercel/proxies headers)
      const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
      const key = `rate-limit:chat:${ip}`;
      const limit = 5; // 5 messages per day
      
      const currentCount = await redis.incr(key);
      if (currentCount === 1) {
        await redis.expire(key, 86400); // 24 hours expiry
      }

      if (currentCount > limit) {
        return new Response(
          "Siva's AI assistant has answered enough questions from this address today. Please feel free to view the portfolio sections or check again tomorrow!",
          { status: 429 }
        );
      }
    }

    // 2. Google Gemini Call
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not defined. Simulating chatbot response.");
      
      // Simulate streaming response locally
      const encoder = new TextEncoder();
      const customStream = new ReadableStream({
        async start(controller) {
          const text = "Hello! I am Siva's AI assistant. (Simulation mode: GEMINI_API_KEY is not configured yet). Siva is an AI Engineer specializing in LangGraph agent workflows, RAG retrieval pipelines, and full-stack development. Ask me anything about his projects, experience, or skills once the API key is configured!";
          const words = text.split(" ");
          for (const word of words) {
            controller.enqueue(encoder.encode(word + " "));
            await new Promise((resolve) => setTimeout(resolve, 60));
          }
          controller.close();
        }
      });
      return new Response(customStream, {
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }

    // Initialize Vercel AI SDK Google provider
    const google = createGoogleGenerativeAI({ apiKey });

    // Stream text using Gemini 2.5 Flash
    const result = await streamText({
      model: google("gemini-2.5-flash"),
      messages,
      system: systemPrompt,
    });

    // Return the response as data stream
    return result.toTextStreamResponse();

  } catch (error: unknown) {
    console.error("Error in chat route:", error);
    return new Response(
      "Siva's AI assistant is taking a quick break, try again shortly.",
      { status: 500 }
    );
  }
}
