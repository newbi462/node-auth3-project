
exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments();
    table.string("username").index().notNullable();
    table.string("password").index().notNullable();
    table.string("department").index().notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
