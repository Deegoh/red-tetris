CREATE TABLE "scores" (
    "id" SERIAL NOT NULL, 
    "pseudo" character varying NOT NULL, 
    "score" integer NOT NULL,
    "level" integer NOT NULL,
    "lines" integer NOT NULL,
    "settings" character varying NOT NULL DEFAULT '', 
    "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
    CONSTRAINT "PK_SCORE_ID" PRIMARY KEY ("id")
);