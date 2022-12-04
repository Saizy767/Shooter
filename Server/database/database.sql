create TABLE person(
    id SERIAL PRIMARY KEY,
    email VARCHAR (75) UNIQUE,
    password VARCHAR(255),
    name VARCHAR(255),
    surname VARCHAR(255),
    favorites json,
    homebar json,
    isActivated boolean,
    activatedCode VARCHAR(6)
);

create TABLE cocteil(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    image json,
    ingredient json,
    countIngredient int,
    author text,
    likes int,
    saved int,
    watched int,
    recept json
);