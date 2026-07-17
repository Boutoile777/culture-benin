import type { ChatSource } from "@/domain/entities/Chat";

export interface ChatFilters {
  region?: string;
  category?: string;
}

export interface SendChatMessageInput {
  message: string;
  conversationId?: string;
  filters?: ChatFilters;
  llmProvider?: "openai" | "gemini";
}

export interface ChatReply {
  answer: string;
  sources: ChatSource[];
  conversationId: string;
  llmProvider?: "openai" | "gemini";
}

export interface ChatRepository {
  sendMessage(input: SendChatMessageInput): Promise<ChatReply>;
}
