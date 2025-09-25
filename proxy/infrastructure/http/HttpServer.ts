import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ProxyRequest } from '../../application/usecases/ProxyRequest';
import { ChatRequest, EmbeddingsRequest } from '@opti-llm/model';
import { logger, isApiError } from '@opti-llm/common';

export class HttpServer {
  private app = express();
  private proxyRequest: ProxyRequest;

  constructor(proxyRequest: ProxyRequest) {
    this.proxyRequest = proxyRequest;
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
  }

  private extractApiKey(req: Request): string | undefined {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    return undefined;
  }

  private setupRoutes(): void {
    // OpenAI-compatible proxy endpoints
    this.app.post(
      '/v1/chat/completions',
      async (req: Request, res: Response) => {
        try {
          const request = ChatRequest.parse(req.body);
          const apiKey = this.extractApiKey(req);
          const response = await this.proxyRequest.handleChatCompletion(
            request,
            apiKey
          );
          res.json(response);
        } catch (error) {
          logger.error('Chat completion error:', error);
          this.handleError(error, res);
        }
      }
    );

    this.app.post('/v1/embeddings', async (req: Request, res: Response) => {
      try {
        const request = EmbeddingsRequest.parse(req.body);
        const apiKey = this.extractApiKey(req);
        const response = await this.proxyRequest.handleEmbeddings(
          request,
          apiKey
        );
        res.json(response);
      } catch (error) {
        logger.error('Embeddings error:', error);
        this.handleError(error, res);
      }
    });

    // Health check endpoint
    this.app.get('/health', (_req: Request, res: Response) => {
      res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });
  }

  start(port: number): void {
    this.app.listen(port, () => {
      logger.info(`Proxy server running on port ${port}`);
    });
  }

  private handleError(error: unknown, res: Response): void {
    if (isApiError(error)) {
      res.status(error.status).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Invalid request' });
    }
  }
}
