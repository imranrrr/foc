import knexObject from "./database.js";

export default function tables() {
  const { knex1 } = knexObject();
  knex1.schema.hasTable("books").then(function (exists) {
    if (!exists) {
      return knex1.schema.createTable("books", function (t) {
        t.increments("id").primary();
        t.string("title", 100);
        t.string("author", 100);
        //   t.integer("author_id").unsigned().notNullable();
        //   t.foreign("author_id").references("authors.id");
      });
    }
  });

  knex1.schema.hasTable("comments").then(function (exists) {
    // if (!exists) {
    //   console.log("hh")
    //   return knex1.schema.createTable("comments", function (t) {
    //     t.increments("id").primary();
    //     t.string("product_id", 30);
    //     t.string("user_email", 30);
    //     t.string("user_id", 30);
    //     t.string("user_name", 30);
    //     t.string("description", 100);
    //     t.string("date", 100);
    //     t.string("to", 40)
    //   });
    // }
  if(exists){
    console.log("dropepppp################")
    knex1.schema.dropTable('comments')
  }
    

  });
  
}
