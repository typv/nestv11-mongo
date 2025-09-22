# Nest1v11-mongo

# Getting Started

## Server Requirements

- Node.js 22
- Mongo latest

## Installing preparation

1. Default Application $BASEPATH : `/home/app.user/nestv11-mongo`

2. Copy the .env file from .env.example under $BASEPATH, fill your config in .env file instead of example config

# I. Build the app (manual)
## 1. Dependencies Installation

```bash
  pnpm install
```

## 2. Running the app

```bash
# development
$ pnpm start

# watch mode
$ pnpm start:dev

# production mode
$ pnpm start:prod
```

# II. Build with Docker

## 1. Setup docker

```bash
  docker compose up -d -- build
  docker compose exec node npm i -g @nestjs/cli
  docker compose exec node pnpm install
```

## 2. Run dev mode

```bash
  docker compose exec node pnpm start:dev
```

## 3. Other

### 3.1. Local url

http://localhost:30050
