import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0A0A0F",
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(108, 92, 231, 0.22) 0%, rgba(255, 107, 91, 0.12) 45%, rgba(10, 10, 15, 0) 75%)",
            color: "#F4F3F7",
            padding: "80px",
            fontFamily: "sans-serif",
          }}
        >
          {/* Card Border */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              backgroundColor: "rgba(20, 20, 28, 0.65)",
              padding: "60px 80px",
              borderRadius: "24px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#FF6B5B",
                textTransform: "uppercase",
                letterSpacing: "3px",
                marginBottom: "20px",
              }}
            >
              AI Engineer Portfolio
            </span>
            <span
              style={{
                fontSize: "64px",
                fontWeight: "extrabold",
                color: "#F4F3F7",
                marginBottom: "15px",
                letterSpacing: "-1px"
              }}
            >
              Siva Surya P
            </span>
            <span
              style={{
                fontSize: "24px",
                color: "#6C5CE7",
                fontWeight: "bold",
              }}
            >
              LangGraph AI Agents • RAG Pipelines • Full Stack
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error: unknown) {
    console.error("Failed to generate OG image:", error);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
