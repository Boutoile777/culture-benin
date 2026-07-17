import type { ChatReply, ChatRepository, SendChatMessageInput } from "@/domain/repositories/ChatRepository";
import { apiFetch } from "@/infrastructure/api/httpClient";

export class ChatRepositoryImpl implements ChatRepository {
  async sendMessage(input: SendChatMessageInput): Promise<ChatReply> {
    return apiFetch<ChatReply>("/rag/chat", { method: "POST", body: input });
  }
}
