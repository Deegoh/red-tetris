NAME = red-tetris

COMPOSE_DEV		= -f ./docker-compose.yml -f ./docker-compose.dev.yml
COMPOSE_PROD	= -f ./docker-compose.yml -f ./docker-compose.override.yml

DOCKER = docker compose ${COMPOSE_DEV} -p ${NAME}
# DOCKER = docker compose ${COMPOSE_PROD} -p ${NAME}

all: ${NAME}

${NAME}:
	${DOCKER} up -d --build

ps:
	${DOCKER} ps -a

logs:
	${DOCKER} logs -f

logsfront:
	${DOCKER} logs frontend -f
logsback:
	${DOCKER} logs backend -f

runfront:
	${DOCKER} exec frontend bash
runback:
	${DOCKER} exec backend bash

testfront:
	${DOCKER} exec frontend pnpm run testlive
coverfront:
	${DOCKER} exec frontend pnpm run coverage
testback:
	${DOCKER} exec backend pnpm run testlive
coverback:
	${DOCKER} exec backend pnpm run coverage

prettierfront:
	${DOCKER} exec frontend pnpm run prettier
prettierback:
	${DOCKER} exec backend pnpm run prettier

test:
	${DOCKER} exec frontend pnpm run test
	${DOCKER} exec backend pnpm run test

cover: coverfront coverback

prettier: prettierfront prettierback

clean:
	${DOCKER} down

down: clean
fclean: clean

re: fclean all

.PHONY: all clean fclean re logs logsfront logsback runfront runback