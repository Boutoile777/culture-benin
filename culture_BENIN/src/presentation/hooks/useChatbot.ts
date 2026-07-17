import { useCallback, useState } from "react";
import type { ChatMessage } from "@/domain/entities/Chat";
import { getErrorMessage } from "@/infrastructure/api/httpClient";
import { chatRepository } from "@/infrastructure/config/repositories";

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  author: "bot",
  text: "👋 Bonjour ! Je suis l'assistant Culture+ Bénin. Posez-moi une question sur les villes, sites, personnalités ou traditions du Bénin.",
};

export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isSending, setIsSending] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isSending) return;

      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), author: "user", text: trimmed },
      ]);
      setIsSending(true);

      try {
        const reply = await chatRepository.sendMessage({
          message: trimmed,
          conversationId,
        });
        setConversationId(reply.conversationId);
        setMessages((current) => [
          ...current,
          {
            id: crypto.randomUUID(),
            author: "bot",
            text: reply.answer,
            sources: reply.sources,
          },
        ]);
      } catch (error) {
        setMessages((current) => [
          ...current,
          {
            id: crypto.randomUUID(),
            author: "bot",
            text: getErrorMessage(error),
            isError: true,
          },
        ]);
      } finally {
        setIsSending(false);
      }
    },
    [conversationId, isSending],
  );

  return { messages, sendMessage, isSending };
}
