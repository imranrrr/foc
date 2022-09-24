import knex from "knex";

export default function knexObject() {
  const knex1 = knex({
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
    },
  });
  return { knex1 };
}
