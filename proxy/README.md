# AI Cost Optimizer Proxy Service

This is the proxy service that handles OpenAI API requests and tracks usage/costs. It runs independently from the main API service.

## Features

- OpenAI-compatible API endpoints (`/v1/chat/completions`, `/v1/embeddings`)
- Request/response logging and cost tracking
- API key management and usage analytics
- Shared database with the main API service

## Configuration

The proxy service uses the same database as the main API service but runs on port 3002 by default.

Environment variables:
- `PORT`: Service port (default: 3002)
- `OPENAI_API_KEY`: Your OpenAI API key
- `OPENAI_BASE_URL`: OpenAI API base URL (default: https://api.openai.com/v1)
- `DB_DRIVER`: Database driver (postgres/mysql)
- `DB_HOST`: Database host
- `DB_PORT`: Database port
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name

## Development

```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm dev

# Build
pnpm build

# Start production
pnpm start
```

## Docker

The proxy service can be run with Docker Compose:

```bash
# Run all services
docker-compose -f docker/compose.dev.yml --profile all up

# Run only proxy service
docker-compose -f docker/compose.dev.yml --profile proxy up
```
