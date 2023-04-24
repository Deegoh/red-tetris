NAME = red-tetris

DOCKER = docker compose -p ${NAME}

all: ${NAME}

${NAME}:
	${DOCKER} up -d --build

logs:
	${DOCKER} logs -f

runserver:
	${DOCKER} exec server bash


clean:
	${DOCKER} down

fclean: clean

re: fclean all

.PHONY: all clean fclean re logs runserver