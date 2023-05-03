NAME = red-tetris

DOCKER = docker compose -p ${NAME}

all: ${NAME}

${NAME}:
	${DOCKER} up -d --build


build:
	${DOCKER} build --no-cache

ps:
	${DOCKER} ps -a

logs:
	${DOCKER} logs -f

runserver:
	${DOCKER} exec server bash

runclient:
	${DOCKER} exec client bash


clean:
	${DOCKER} down

fclean: clean

re: fclean all

.PHONY: all build clean fclean re ps logs runserver runclient