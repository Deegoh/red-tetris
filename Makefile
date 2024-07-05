NAME = red-tetris

DOCKER = docker compose -p ${NAME}

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

runserver:
	${DOCKER} exec server bash


clean:
	${DOCKER} down

down: clean
fclean: clean

re: fclean all

.PHONY: all clean fclean re logs runserver