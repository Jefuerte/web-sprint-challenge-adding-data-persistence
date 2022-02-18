
exports.up = function(knex) {
  return knex.schema
  .createTable('projects', tbl => {
      tbl.increments('project_id')
      tbl.string('project_name', 200)
      .notNullable()
      tbl.string('project_description', 200)
      tbl.integer('project_completed')
      .defaultTo(0)
      .unsigned()
  })
  .createTable('resources', tbl => {
      tbl.increments('resource_id')
      tbl.string('resource_name', 200)
      .notNullable()
      .unique()
      tbl.string('resource_description', 200)
  })
  .createTable('tasks', tbl => {
      tbl.increments('task_id')
      tbl.string('task_description', 200)
      .notNullable()
      tbl.string('task_notes', 200)
      tbl.integer('task_completed')
      .defaultTo(0)
      .unsigned()
      tbl.integer('project_id')
      .notNullable()
      .unsigned()
      .references('project_id')
      .inTable('projects')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT')
  })
  .createTable('project_resources', tbl => {
      tbl.increments('project_resources_id')
      tbl.string('resource_assignment', 200)
      tbl.integer('resource_id')
      .notNullable()
      .unsigned()
      .references('resource_id')
      .inTable('resource')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT')
  })
}


exports.down = function(knex) {
return knex.schema
.dropTableIfExists('project_resources')
.dropTableIfExists('tasks')
.dropTableIfExists('resources')
.dropTableIfExists('projects')
};
