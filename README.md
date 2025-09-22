# snaptic_care_be

# Getting Started

## Server Requirements

- Node.js 22
- PostgreSQL 16

## Installing preparation

1. Default Application $BASEPATH : `/home/app.user/nest_base_v11`

2. Copy the .env file from .env.example under $BASEPATH, fill your config in .env file instead of example config

# I. Build the app (manual)
## 1. Dependencies Installation

```bash
  pnpm install
```

## 2. Migrate database

### 2.1. Create migration file
```bash
  pnpm migrate:create src/database/migrations/your_migration_name
```

### 2.2. Migrate
```bash
  pnpm build
  pnpm migrate:run
```

### 2.3. Revert
```bash
  pnpm migrate:revert
```

## 3. Running the app

```bash
# development
$ pnpm start

# watch mode
$ pnpm start:dev

# production mode
$ pnpm start:prod
```

## 4. Other
### 4.1. Run seed
```bash
  pnpm seed:run
```

# II. Build with Docker

## 1. Setup docker

```bash
  docker compose up -d -- build
  docker compose exec node npm i -g @nestjs/cli
  docker compose exec node pnpm install
```

## 3. Migrate database

## 3.1. Migrate

```bash
  docker compose exec node pnpm migrate:run
```

## 3.2. Revert Migration

```bash
  docker compose exec node pnpm migrate:revert
```

## 4. Run dev mode

```bash
  docker compose exec node pnpm start:dev
```

## 5. Other

### 5.1. Run seed
```bash
  docker compose exec node pnpm seed:run
```

### 5.2. Local url

http://localhost:31003
