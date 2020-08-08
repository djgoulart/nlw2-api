import Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('connections', table => {
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.timestamp('created_at').defaultTo('now()').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('connections');
}
