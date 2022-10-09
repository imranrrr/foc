/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    console.log(knex)
    return knex.schema.createTable("messages", function (t) {
        t.increments("id").primary();
        t.string("product_id", 30);
        t.string("user_email", 30);
        t.string("user_id", 30);
        t.string("user_name", 30);
        t.string("description", 100);
        t.string("to", 100);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("messages")
};
