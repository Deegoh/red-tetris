NAME = red-tetris

DOCKER = docker compose -p ${NAME}

all: ${NAME}

${NAME}:
	${DOCKER} up -d --build

logs:
	${DOCKER} logs -f

runbsrv:
	${DOCKER} exec boilerplate-serveur bash

runbscli:
	${DOCKER} exec boilerplate-client bash

clean:
	${DOCKER} down

fclean: clean

re: fclean all

.PHONY: all clean fclean re logs runbsrv runbscli