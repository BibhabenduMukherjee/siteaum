'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Link from 'next/link';

// Define the structure of a message
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// --- Custom Code Block Component with Copy Button ---
const CodeBlock = ({ children, ...props }: any) => {
  const [isCopied, setIsCopied] = useState(false);
  const textToCopy = String(children).replace(/\n$/, '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative group my-4">
      <pre {...props} className="p-4 bg-zinc-800 text-white rounded-md overflow-x-auto">
        <code>{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 bg-zinc-700 rounded-md text-zinc-300 hover:bg-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy code"
      >
        {isCopied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
};


export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Set an initial welcome message
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: "Hello! I am your personal assistant for Codeaum. Ask me anything about our articles on technology and spirituality.",
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'The server returned an error.');
      }
      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';
      
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.substring(6);
            if(jsonStr === '[DONE]') continue;
            try {
              const parsed = JSON.parse(jsonStr);
              assistantMessage += parsed.choices[0]?.delta?.content || '';
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1].content = assistantMessage;
                return updated;
              });
            } catch (error) {
              // Ignore parsing errors for incomplete JSON chunks
            }
          }
        }
      }
    } catch (error: any) {
      console.error('Error fetching chat response:', error);
      const errorMessage = `Sorry, something went wrong. ${error.message || ''}`;
      setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-white dark:bg-zinc-900 flex flex-col h-screen ">
      {/* Chat Messages Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-8">
            {messages.map((msg, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-gray-200 dark:bg-zinc-700' : 'bg-green-500'}`}>
                  {msg.role === 'user' ? <User size={20} className="text-gray-600 dark:text-gray-300"/> : <Bot size={20} className="text-white"/>}
                </div>
                
                <div className="flex-1 text-sm pt-0.5">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      code({node, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '')
                        return match ? (
                          <CodeBlock {...props}>{children}</CodeBlock>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        )
                      },
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-4">
                 <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Bot size={20} className="text-white"/>
                </div>
                <div className="flex-1 text-sm pt-1">
                    <span className="h-3 w-3 bg-gray-400 rounded-full inline-block animate-pulse"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <div className="p-4 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700">
         <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about our articles..."
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed"
                disabled={isLoading || !input.trim()}
              >
                <Send size={20} />
              </button>
            </form>
         </div>
      </div>
    </main>
  );
}