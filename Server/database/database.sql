create TABLE person(
    id SERIAL PRIMARY KEY,
    email unique text,
    password text,
    name VARCHAR(255),
    surname VARCHAR(255),
    favorites json,
    homebar json,
    isActivated boolean,
    activationLink text
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