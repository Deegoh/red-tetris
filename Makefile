NAME = RedTetris

DOCKER = docker compose -p ${NAME}

all: ${NAME}

${NAME}:
	${DOCKER} up -d

logs:
	${DOCKER} logs -f

clean:
	${DOCKER} down

fclean: clean

re: fclean all

.PHONY: all clean fclean re logs