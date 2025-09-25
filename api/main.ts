import { HttpServer } from './infrastructure/http/HttpServer';
import { createRepository } from './config/db';
import { config, EnvAdapter } from './config/env';
import { logger } from '@opti-llm/common';

async function main(): Promise<void> {
  try {
    const envAdapter = EnvAdapter.getInstance(config);
    const repository = createRepository();

    // Initialize the repository (create tables)
    await repository.init();

    const httpServer = new HttpServer(repository);

    httpServer.start(envAdapter.get('port'));
    logger.info('AI Cost Optimizer API started');
  } catch (error) {
    logger.error('Failed to start API:', error);
    process.exit(1);
  }
}

main();
