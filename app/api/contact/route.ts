import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters.")
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    // Check for Resend API Key. If missing, fallback to development mock send.
    if (!process.env.RESEND_API_KEY) {
      console.warn("WARNING: RESEND_API_KEY is not set in environment variables. Simulating email transmission.");
      
      // Simulate network lag
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Message processed successfully (Simulated mode)."
      });
    }

    // Send email via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@codevista.studio>",
      to: "sivatechie17@gmail.com",
      subject: `Synapse Portfolio: Message from ${name}`,
      html: `
        <h3>New Contact Message Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `
    });

    return NextResponse.json({ success: true, data });

  } catch (error: unknown) {
    console.error("Error in contact route:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
