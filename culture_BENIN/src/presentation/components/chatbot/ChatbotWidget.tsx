import { useState, type FormEvent } from "react";

interface ChatMessage {
  id: string;
  author: "bot" | "user";
  text: string;
}

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  author: "bot",
  text: "👋 Bonjour ! Je suis l'assistant Culture+ Bénin. Posez-moi une question sur les villes, récits ou événements — cette fonctionnalité arrive bientôt.",
};

const CANNED_REPLY: ChatMessage = {
  id: "canned-reply",
  author: "bot",
  text: "Merci pour votre message ! Je ne suis pas encore connecté à une vraie intelligence — revenez bientôt pour des réponses complètes.",
};

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
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [draft, setDraft] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), author: "user", text: trimmed },
      { ...CANNED_REPLY, id: crypto.randomUUID() },
    ]);
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
                    ? "self-start bg-gray-100 text-culture-ink"
                    : "self-end bg-culture-green text-white"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-gray-100 p-3"
          >
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Écrivez votre question…"
              className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-3.5 py-2 text-[13px] text-culture-ink focus:outline-none focus:ring-2 focus:ring-culture-green"
            />
            <button
              type="submit"
              aria-label="Envoyer"
              className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-culture-green text-white transition-colors duration-200 hover:bg-culture-green-dark"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
