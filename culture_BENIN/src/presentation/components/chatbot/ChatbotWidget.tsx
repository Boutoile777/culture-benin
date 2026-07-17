import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import type { ChatSource, ChatSourceType } from "@/domain/entities/Chat";
import { useChatbot } from "@/presentation/hooks/useChatbot";

const SOURCE_ROUTES: Partial<Record<ChatSourceType, (id: string) => string>> = {
  TouristSite: (id) => `/explorer/sites/${id}`,
  HistoricalFigure: (id) => `/explorer/personnalites/${id}`,
  City: (id) => `/explorer/${id}`,
};

function ChatMessageSources({ sources }: { sources: ChatSource[] }) {
  if (sources.length === 0) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {sources.map((source) => {
        const toRoute = SOURCE_ROUTES[source.sourceType]?.(source.sourceId);
        const chipClassName =
          "rounded-full border border-culture-green/25 bg-white px-2.5 py-1 text-[11px] font-medium text-culture-green-dark transition-colors";

        return toRoute ? (
          <Link
            key={`${source.sourceType}-${source.sourceId}`}
            to={toRoute}
            className={`${chipClassName} hover:bg-culture-green hover:text-white`}
          >
            {source.sourceTitle}
          </Link>
        ) : (
          <span
            key={`${source.sourceType}-${source.sourceId}`}
            className={chipClassName}
          >
            {source.sourceTitle}
          </span>
        );
      })}
    </div>
  );
}

const sharedIconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function ChatBubbleIcon() {
  return (
    <svg {...sharedIconProps} className="h-6 w-6">
      <path d="M4 5.5h16v10H9l-4 3.5v-3.5H4v-10z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg {...sharedIconProps} className="h-6 w-6">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg {...sharedIconProps} className="h-4 w-4">
      <path d="M4 12l16-7-6.5 16-2.5-6-7-3z" />
    </svg>
  );
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const { messages, sendMessage, isSending } = useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isSending]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!draft.trim() || isSending) return;
    void sendMessage(draft);
    setDraft("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? "Fermer l'assistant" : "Ouvrir l'assistant Culture+ Bénin"}
        className="fixed bottom-5 right-5 z-[130] flex h-14 w-14 items-center justify-center rounded-full bg-culture-green text-white shadow-[0_12px_28px_rgba(14,59,46,0.35)] transition-transform duration-200 hover:scale-105"
      >
        {isOpen ? <CloseIcon /> : <ChatBubbleIcon />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-5 z-[130] flex h-[440px] w-[min(360px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_24px_60px_rgba(32,33,36,0.24)]">
          <div className="flex items-center justify-between bg-culture-green px-4 py-3.5 text-white">
            <span className="font-display text-[15px] font-semibold">
              Assistant Culture+
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fermer"
              className="text-white/80 transition-colors hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                  message.author === "bot"
                    ? `self-start ${message.isError ? "bg-red-50 text-red-700" : "bg-gray-100 text-culture-ink"}`
                    : "self-end bg-culture-green text-white"
                }`}
              >
                {message.text}
                {message.sources && <ChatMessageSources sources={message.sources} />}
              </div>
            ))}
            {isSending && (
              <div className="flex max-w-[85%] items-center gap-1 self-start rounded-2xl bg-gray-100 px-3.5 py-2.5">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-culture-ink/50 [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-culture-ink/50 [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-culture-ink/50" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-gray-100 p-3"
          >
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Écrivez votre question…"
              disabled={isSending}
              className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-3.5 py-2 text-[13px] text-culture-ink focus:outline-none focus:ring-2 focus:ring-culture-green disabled:opacity-60"
            />
            <button
              type="submit"
              aria-label="Envoyer"
              disabled={isSending || !draft.trim()}
              className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-culture-green text-white transition-colors duration-200 hover:bg-culture-green-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
