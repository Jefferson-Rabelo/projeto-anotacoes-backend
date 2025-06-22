exports.up = function (knex) {
    return knex.schema.createTable('notes', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('content');
        table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('notes');
};
