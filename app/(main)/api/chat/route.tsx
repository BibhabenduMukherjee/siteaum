import { NextRequest } from "next/server";
import { knowledgeBase, Article } from "@/lib/knowledge-base"; // Import your new knowledge base

export const runtime = "edge";

const searchKnowledgeBase = (query: string, topK = 3): Article[] => {
  const queryWords = query.toLowerCase().split(/\s+/);

  const scores = knowledgeBase.map((article) => {
    let score = 0;
    const content =
      `${article.title} ${article.description} ${article.keywords.join(" ")}`.toLowerCase();

    queryWords.forEach((word) => {
      if (content.includes(word)) {
        score++;
      }
    });

    return { article, score };
  });

  // Sort by score and return the top K articles with a score > 0
  return scores
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((item) => item.article);
};

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // --- 1. Find the latest user query ---
    const userQuery =
      messages.findLast((msg: any) => msg.role === "user")?.content || "";

    // --- 2. Search for relevant articles ---
    const relevantArticles = searchKnowledgeBase(userQuery);
    let systemPromptContent = `You are a helpful assistant for a website called Codeaum.
Your goal is to assist users by answering their questions.
Be concise and welcoming in your responses.`;

    if (relevantArticles.length > 0) {
      const articlesContext = relevantArticles
        .map(
          (article) =>
            `Title: ${article.title}\nURL: ${article.slug}\nDescription: ${article.description}`
        )
        .join("\n\n");

      systemPromptContent += `\n\nUse the following articles to answer the user's query.
If you use information from an article, you **must** cite it by providing the link using markdown format, like [Title](URL).

---
ARTICLES CONTEXT:
${articlesContext}
---`;
    }

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
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!apiResponse.ok) {
      const errorBody = await apiResponse.json();
      console.error("API Error:", errorBody);
      return new Response(JSON.stringify(errorBody), {
        status: apiResponse.status,
      });
    }

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
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return new Response("An unexpected error occurred.", { status: 500 });
  }
}
