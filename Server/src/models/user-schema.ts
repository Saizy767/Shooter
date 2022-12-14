export const DataQuery = `CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    email VARCHAR (75) UNIQUE,
    password VARCHAR(255),
    name VARCHAR(255),
    surname VARCHAR(255),
    favorites JSON ARRAY,
    homebar JSON ARRAY,
    isActivated boolean,
    tokenActivated boolean,
    activatedCode VARCHAR(6));`