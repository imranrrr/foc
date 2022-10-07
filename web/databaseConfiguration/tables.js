import knexObject from "./database.js";

export default function tables() {
  const { knexObj } = knexObject();
  knexObj.schema.hasTable("books").then(function (exists) {
    if (!exists) {
      return knexObj.schema.createTable("books", function (t) {
        t.increments("id").primary();
        t.string("title", 100);
        t.string("author", 100);
        //   t.integer("author_id").unsigned().notNullable();
        //   t.foreign("author_id").references("authors.id");
      });
    }
  });

  knexObj.schema.hasTable("comments").then(function (exists) {
    if (!exists) {
      console.log("hh")
      return knexObj.schema.createTable("comments", function (t) {
        t.increments("id").primary();
        t.string("product_id", 30);
        t.string("user_email", 30);
        t.string("user_id", 30);
        t.string("user_name", 30);
        t.string("description", 100);
        t.string("date", 100);
      });
    }
  // if(exists){
  //   console.log("dropepppp################")
  //   knexObj.schema.dropTable('comments')
  // }
  });
  knexObj.schema.hasTable("messages").then(function (exists) {
    if(!exists){
      knexObj.schema.table('messages', function(t) {
        t.increments("id").primary();
        t.string("product_id", 30);
        t.string("user_email", 30);
        t.string("user_id", 30);
        t.string("user_name", 30);
        t.string("description", 100);
        t.string("date", 100);
        t.string('to', 40);
      });
    }
  });
}
