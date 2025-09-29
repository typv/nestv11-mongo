ps:
	docker-compose ps
build:
	docker-compose up -d --build
up:
	docker-compose up -d
down:
	docker-compose down
stop:
	docker-compose stop
node:
	docker-compose exec node sh
db:
	docker-compose exec db bash
install:
	docker-compose exec node pnpm install
dev:
	docker-compose exec node pnpm start:dev
buildNest:
	docker-compose exec node pnpm build
setup:
	make build
	make install
migrationCreate:
	pnpm migrate:create src/database/migrations/$(n)
migrationGen:
	docker-compose exec node pnpm migrate:gen src/common/database/migrations/$(n)
migrate:
	docker-compose exec node pnpm migrate:run
migrationRevert:
	docker-compose exec node pnpm migrate:revert
seedConfig:
	docker-compose exec node pnpm seed:config
seedRun:
	docker-compose exec node pnpm seed:run
seedRunOne:
	docker-compose exec node pnpm seed:runOne $(class)
ut:
	docker-compose exec node pnpm test
e2e:
	docker-compose exec node pnpm test:e2e
genModule:
	npx @nestjs/cli g res $(n)
commandRun:
	docker-compose exec node pnpm command:run $(c)