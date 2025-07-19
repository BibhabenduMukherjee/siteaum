import { NextRequest, NextResponse } from "next/server";

// Note: The 'edge' runtime has been removed. This is now a standard serverless function.

export async function POST(req: NextRequest) {
  // Server-side check for the API key
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    console.error("DEEPSEEK_API_KEY is not set in environment variables.");
    return new NextResponse(
      JSON.stringify({ error: "Server configuration error: API key not found." }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { messages } = await req.json();

    // A simple, static system prompt without any custom data.
    const systemPromptContent = `You are a helpful assistant. Designed by Codeaum team`;

    const systemPrompt = {
      role: "system",
      content: systemPromptContent,
    };

    const payload = {
      model: "deepseek/deepseek-chat",
      messages: [systemPrompt, ...messages],
      stream: true,
    };

    const apiResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!apiResponse.ok) {
      const errorBody = await apiResponse.json();
      console.error("External API Error:", errorBody);
      return new NextResponse(JSON.stringify(errorBody), {
        status: apiResponse.status,
      });
    }

    // The streaming logic remains the same to ensure a real-time response.
    const stream = new ReadableStream({
      async start(controller) {
        if (!apiResponse.body) {
          controller.close();
          return;
        }
        const reader = apiResponse.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          controller.enqueue(new TextEncoder().encode(chunk));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        // 'X-Accel-Buffering' is less critical for Node.js runtime but doesn't hurt
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error: any) {
    console.error("Internal Server Error:", error);
    return new NextResponse(
        JSON.stringify({ error: "An unexpected error occurred.", details: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
