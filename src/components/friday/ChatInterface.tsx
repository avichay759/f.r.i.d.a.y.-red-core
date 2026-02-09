import { useState, useRef, useEffect } from "react";
import { Send, Mic } from "lucide-react";
import { streamChat, type Msg } from "@/lib/friday-chat";
import { useToast } from "@/hooks/use-toast";

interface ChatInterfaceProps {
  onStateChange?: (state: "idle" | "thinking" | "speaking") => void;
}

const ChatInterface = ({ onStateChange }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const send = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Msg = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    onStateChange?.("thinking");

    let assistantSoFar = "";

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      onStateChange?.("speaking");
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: upsertAssistant,
        onDone: () => {
          setIsLoading(false);
          onStateChange?.("idle");
        },
        onError: (err) => {
          toast({ variant: "destructive", title: "F.R.I.D.A.Y.", description: err });
        },
      });
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      onStateChange?.("idle");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto h-full">
      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin"
        style={{ maxHeight: "calc(100vh - 260px)" }}
      >
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground text-xs font-mono tracking-widest uppercase mt-8 opacity-50">
            NEURAL LINK ACTIVE — SPEAK, BOSS
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-md font-mono text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary/15 border border-primary/25 text-foreground"
                  : "bg-friday-panel border border-primary/10 text-friday-text"
              }`}
            >
              {msg.role === "assistant" && (
                <span className="text-[10px] text-primary/60 tracking-widest uppercase block mb-1">
                  F.R.I.D.A.Y.
                </span>
              )}
              <span className="whitespace-pre-wrap">{msg.content}</span>
              {msg.role === "assistant" && i === messages.length - 1 && isLoading && (
                <span className="inline-block w-1.5 h-4 bg-primary/60 ml-0.5 animate-pulse" />
              )}
            </div>
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="bg-friday-panel border border-primary/10 px-4 py-3 rounded-md">
              <span className="text-[10px] text-primary/60 tracking-widest uppercase block mb-1">
                F.R.I.D.A.Y.
              </span>
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="px-4 pb-4 pt-2">
        <div className="flex items-end gap-2 border border-primary/20 rounded-md bg-friday-panel/50 backdrop-blur-sm px-3 py-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Speak, Boss..."
            rows={1}
            className="flex-1 bg-transparent text-sm font-mono text-foreground placeholder:text-muted-foreground resize-none outline-none min-h-[36px] max-h-[120px] py-1"
          />
          <button
            onClick={send}
            disabled={isLoading || !input.trim()}
            className="p-2 rounded-md text-primary hover:bg-primary/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
