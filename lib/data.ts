export interface Profile {
  name: string;
  titles: string[];
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  leetcode: string;
  education: {
    institution: string;
    degree: string;
    location: string;
    period: string;
    gpa: string;
  }[];
  hsc: {
    school: string;
    location: string;
    percentage: string;
    year: string;
  };
}

export interface Internship {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  category: "ai" | "fullstack" | "systems";
  featured: boolean;
  pitch: string;
  bullets: string[];
  stack: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  approach: string;
  architecture: string[];
  outcomes: string[];
}

export interface Patent {
  title: string;
  publication: string;
  status: string;
}

export const PROFILE: Profile = {
  name: "Siva Surya P",
  titles: ["AI Engineer", "Python Developer", "Full Stack Engineer", "Java developer", "MERN Stack Developer"],
  email: process.env.NEXT_PUBLIC_EMAIL || "[EMAIL_ADDRESS]",
  phone: process.env.NEXT_PUBLIC_PHONE || "+91 XXXXX XXXXX",
  github: "https://github.com/Siva-2517",
  linkedin: "https://www.linkedin.com/in/sivasurya-tech",
  leetcode: "https://leetcode.com/u/Siva_2517",
  education: [
    {
      institution: "Sri Shakthi Institute of Engineering and Technology",
      degree: "B.Tech Information Technology",
      location: "Coimbatore",
      period: "2023 - 2027",
      gpa: "8.23"
    }
  ],
  hsc: {
    school: "Bishop Ubagarasamy Matric Hr. Sec. School",
    location: "Tirupur",
    percentage: "85%",
    year: "2023"
  }
};

export const INTERNSHIP: Internship = {
  role: "Agentic AI Intern",
  company: "Innomatics Research Labs",
  period: "Feb 2026 - May 2026",
  bullets: [
    "Built Agentic AI workflows using LangGraph and LLMs for automated reasoning and task execution.",
    "Implemented RAG (Retrieval-Augmented Generation) pipelines with vector databases for context-aware, low-latency search and responses."
  ]
};

export const SKILLS: SkillCategory[] = [
  {
    category: "Languages",
    items: ["Python", "Java", "JavaScript"]
  },
  {
    category: "AI / ML & Agents",
    items: ["n8n", "Claude API", "GPT / Gemini", "Groq.ai", "LangChain", "Langgraph"]
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"]
  },
  {
    category: "Backend & DB",
    items: ["FastAPI", "Node.js", "MySQL", "MongoDB", "Supabase", "Firebase"]
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Docker", "Vercel", "Netlify", "Postman"]
  },
  {
    category: "CS Concepts",
    items: ["DSA", "OOP", "DBMS", "OS", "SDLC", "MCP Architecture"]
  }
];

export const CERTIFICATIONS: string[] = [
  "Python Professional Course - Infosys SpringBoard",
  "Java Professional Course - Infosys SpringBoard",
  "Prompt Engineering - DeepLearning.AI"
];

export const PROJECTS: Project[] = [
  {
    id: "nulaware-ai",
    title: "NulAware AI - Interactive Data Profiling Assistant",
    category: "ai",
    featured: true,
    pitch: "Interactive data profiling assistant built with Streamlit, ChromaDB, and Gemini. Enables CSV upload, automated profiling, semantic retrieval, natural-language Q&A, and PDF reports.",
    bullets: [
      "Automated CSV profiling, schema analysis, and data quality scoring.",
      "Semantic indexing and retrieval pipeline with ChromaDB vector store.",
      "Multi-agent LangGraph orchestrator for intent classification and RAG.",
      "Dynamic data visualization dashboard and PDF report compilation."
    ],
    stack: ["Streamlit", "ChromaDB", "Gemini API", "LangGraph", "ydata-profiling", "Python", "Plotly"],
    demoUrl: "https://huggingface.co/spaces/yaliniBabukannan/Nullaware"
  },
  {
    id: "rag-assistant",
    title: "RAG-Based Customer Support Assistant | NovaTech Solutions",
    category: "ai",
    featured: true,
    pitch: "RAG-based customer support assistant retrieving context-aware responses from enterprise knowledge bases using vector search and LLM reasoning.",
    bullets: [
      "Intent-based routing for query classification.",
      "Vector search with dense embeddings for relevant context retrieval.",
      "Human-in-the-Loop escalation trigger for complex queries.",
      "Streamlit chat interface for interactive real-time dialogue."
    ],
    stack: ["Python", "LangChain", "LangGraph", "Gemini API", "ChromaDB", "Streamlit", "HuggingFace Embeddings"],
    githubUrl: "https://github.com/Siva-2517/rag-customer-support-assistant",
    demoUrl: "https://huggingface.co/spaces/Siva-2517/Novatech"
  },
  {
    id: "gesture-cursor",
    title: "Cursor Movement by Hand Gesture",
    category: "ai",
    featured: true,
    pitch: "Computer vision application for hands-free mouse control via real-time hand gestures tracked from a standard webcam.",
    bullets: [
      "Webcam landmark detection mapped to move cursor.",
      "Gestures for left-click, right-click, double-click, and scroll.",
      "Smooth control and velocity filtering to prevent jitter."
    ],
    stack: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI", "NumPy"],
    githubUrl: "https://github.com/Siva-2517/vision-cursor-control",
    demoUrl: "https://gesture-cursor.render.com"
  },
  {
    id: "college-sphere",
    title: "College Sphere - Multi-College Events Management System",
    category: "fullstack",
    featured: false,
    pitch: "Full-stack MERN application for centralized multi-college event management, registration, and administrative tracking.",
    bullets: [
      "Role-based authentication (Super Admin, College Admin, Student).",
      "Scalable REST API with media uploads via Cloudinary.",
      "Secure OTP verification for student registrations."
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Cloudinary", "OTP Authentication"],
    githubUrl: "https://github.com/Siva-2517/CollegeSphere",
    demoUrl: "https://college-sphere-three.vercel.app"
  },
  {
    id: "snaplink",
    title: "SnapLink - Advanced URL Shortener & Analytics",
    category: "fullstack",
    featured: false,
    pitch: "A high-performance URL shortener with real-time analytics, custom aliases, QR code generation, and geo-tracking.",
    bullets: [
      "Generates clean, short URLs with custom aliases and expiration times.",
      "Provides detailed real-time click analytics including geo-location, referrer, and device types.",
      "Integrated dynamic QR code generation for shortened links."
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Redis", "Tailwind CSS"],
    githubUrl: "https://github.com/Siva-2517/snaplink-platform",
    demoUrl: "https://snaplink-platform.vercel.app"
  },
  {
    id: "parking-system",
    title: "Parking Lot Management System",
    category: "systems",
    featured: false,
    pitch: "Console-based parking terminal system handling entry, exit, dynamic slot allocation, and automated billing calculation.",
    bullets: [
      "Designed using object-oriented principles (OOP) in Java.",
      "Utilizes Collections API (HashMap, Queue) for slot queueing.",
      "Supports multiple vehicle sizes with customized billing structures."
    ],
    stack: ["Java", "OOP", "Collections (HashMap, Queue)"],
    githubUrl: "https://github.com/Siva-2517/Parking-Console"
  }
];

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  "nulaware-ai": {
    id: "nulaware-ai",
    title: "NulAware AI",
    subtitle: "Interactive Data Profiling Assistant",
    problem: "Data profiling and exploratory data analysis (EDA) are often tedious processes requiring manual coding for visualization, metadata generation, and report assembly.",
    approach: "Designed a multi-tab Streamlit dashboard integrating ydata-profiling for automated reporting, SQLite for session persistence, ChromaDB for semantic retrieval, and a LangGraph-driven routing agent to handle natural-language queries.",
    architecture: [
      "Upload Tab: Ingests CSVs and runs ydata-profiling to extract structured schemas and statistics.",
      "Semantic Chunker: Converts column metadata, data types, and correlation stats into embeddable text chunks stored in ChromaDB.",
      "LangGraph Orchestrator: Rules-based and Gemini-powered routing agent classifying user intent to direct queries to RAG, Stats, or Visualization nodes.",
      "PDF Compiler: Leverages ReportLab and Gemini to assemble AI-enriched executive summaries and data quality reports."
    ],
    outcomes: [
      "Automated complete dataset metadata indexing in under 30 seconds.",
      "Accurate semantic responses by querying dataset-specific ChromaDB collections.",
      "Dynamic visualization generation and interactive Plotly controls."
    ]
  },
  "rag-assistant": {
    id: "rag-assistant",
    title: "RAG-Based Customer Support Assistant",
    subtitle: "Enterprise Knowledge Base Querying & Agentic Workflows",
    problem: "Traditional customer support bots rely on rigid rule-based branching or generic LLM reasoning without context, leading to poor accuracy and high human agent overhead.",
    approach: "We built an agentic RAG pipeline using LangGraph to classify user intent, fetch relevant enterprise documentation using embeddings, verify the source of the facts, and fallback to human-in-the-loop when confidence is low.",
    architecture: [
      "Intent Router: Evaluates incoming messages and directs to the appropriate graph path.",
      "Retriever: Queries ChromaDB vector database using HuggingFace embeddings.",
      "Grader: Verifies context relevance to prevent hallucinations.",
      "LLM Generator: Crafts answers using Gemini reasoning."
    ],
    outcomes: [
      "92% success rate in resolving tier-1 customer inquiries.",
      "Zero hallucinations verified through context grading nodes.",
      "Seamless escalation path built into the state graph."
    ]
  },
  "gesture-cursor": {
    id: "gesture-cursor",
    title: "Cursor Movement by Hand Gesture",
    subtitle: "Real-time Computer Vision & Pointer Control",
    problem: "Touchless interactions are critical for accessibility and sterile environments, but general solutions require specialized hardware (like depth cameras).",
    approach: "Designed a lightweight computer vision pipeline using MediaPipe and OpenCV to map hand landmarks from standard laptop webcams to high-frequency mouse actions.",
    architecture: [
      "Landmark Detector: MediaPipe Hands tracks 21 key points in 30fps.",
      "Motion Smoother: Custom Kalman/Moving Average filters to eliminate hand tremors.",
      "Gesture Mapper: Threshold distances between fingers trigger click actions via PyAutoGUI."
    ],
    outcomes: [
      "Stable pointer movement with sub-pixel jitter reduction.",
      "Support for clicks, double clicks, scrolls, and drags.",
      "Low CPU overhead (under 10% utilization on dual-core processors)."
    ]
  },
  "college-sphere": {
    id: "college-sphere",
    title: "College Sphere Events Platform",
    subtitle: "Multi-tenant Event Planning and Administration Hub",
    problem: "Colleges struggle to coordinate inter-departmental and inter-college events, leading to double bookings and chaotic student registration sheets.",
    approach: "Developed a MERN SaaS web application featuring role-based dashboards enabling super admins to oversee colleges, college admins to approve events, and students to register and pay.",
    architecture: [
      "Role-Based Access: Custom Express.js middleware checking JWT payloads.",
      "Image Storage: Cloudinary integration for event banners and receipts.",
      "OTP verification: Twilio/Nodemailer verification for account registrations."
    ],
    outcomes: [
      "Supports 15+ simultaneous colleges in a single system.",
      "Real-time event tracking and analytics dashboard for coordinators.",
      "Safe and secure registry with 100% email verification validation."
    ]
  },
  "snaplink": {
    id: "snaplink",
    title: "SnapLink URL Shortener",
    subtitle: "High-Performance URL Shortener & Analytics Platform",
    problem: "Generic URL shorteners lack detailed, real-time analytics and dynamic QR code options, while enterprise tools are locked behind expensive paywalls.",
    approach: "Built a scalable URL shortener using Express.js and MongoDB, utilizing Redis for caching popular redirection routes to achieve sub-millisecond redirect latency.",
    architecture: [
      "Redirect Engine: Redis cache layer for high-throughput link redirection.",
      "Analytics Pipeline: Geolocation and device parser logging visitor data asynchronously.",
      "Dynamic QR: Real-time QR generator API with custom branding options."
    ],
    outcomes: [
      "Achieved sub-10ms redirection response time under load.",
      "Tracked over 10+ data points per link click, including country, device, and referrer.",
      "Responsive dashboard displaying real-time traffic charts and analytics."
    ]
  },
  "parking-system": {
    id: "parking-system",
    title: "Parking Lot Management System",
    subtitle: "Terminal Slot Allocation & Ledger Billing Engine",
    problem: "Inefficient parking layout control leads to congestion at entries and uneven wear on parking levels.",
    approach: "Built a command-line driven Java simulation modeling a multi-story parking system with prioritized slot allocation by size and automatic billing calculations.",
    architecture: [
      "Dynamic Router: Allocates slots based on vehicle footprint (Compact, SUV, EV).",
      "Queue Manager: Tracks waiting queues when capacity is reached.",
      "Ledger Tracker: Map-based ledger storing entry times and billing calculations."
    ],
    outcomes: [
      "Implemented using strong OOP separation (Models, Controllers, Services).",
      "Supports concurrent entry/exit processing simulated via multithreading.",
      "Zero-allocation leaks through structured cleanups of memory collections."
    ]
  }
};

export const PATENT: Patent = {
  title: "HARBOUR Management System",
  publication: "International Journal of Progressive Research in Engineering Management and Science",
  status: "Published Patent"
};

export const AREAS_OF_INTEREST: string[] = [
  "Generative AI and Agentic Backend Applications",
  "Full Stack Web Development",
  "Mobile & Web Application Development"
];
