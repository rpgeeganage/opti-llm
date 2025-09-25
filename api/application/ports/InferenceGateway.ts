import {
  ChatRequest,
  ChatResponse,
  EmbeddingsRequest,
  EmbeddingsResponse,
} from '@opti-llm/model';

export interface InferenceGateway {
  chatCompletion(request: ChatRequest): Promise<ChatResponse>;
  embeddings(request: EmbeddingsRequest): Promise<EmbeddingsResponse>;
}
