/* eslint-disable camelcase */
exports.up = (pgm) => {
    pgm.createTable('threads', {
      id: {
        type: 'VARCHAR(50)',
        primaryKey: true,
      },
      title: {
        type: 'TEXT',
        notNull: true,
      },
      body: {
        type: 'TEXT',
        notNull: true,
      },
      owner: {
        type: 'VARCHAR(50)',
        notNull: true,
      },
      inserted_at: {
        type: 'varchar(30)',
        notNull: true,
      },
      updated_at: {
        type: 'varchar(30)',
        notNull: true,
      },
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('threads');
  };
  