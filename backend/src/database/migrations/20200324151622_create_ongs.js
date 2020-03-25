
exports.up = function(knex) { //método up é responsável pela criação da tabela
  return knex.schema.createTable('ongs', function (table){
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable(); //número representa o tamanho
  });
};

exports.down = function(knex) { //método down é o que acontece caso dê algum problema e se queira voltar atrás
  return knex.schema.dropTable('ongs');
};
