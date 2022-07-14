/* eslint-disable camelcase */

exports.up = (pgm) => {
    pgm.createTable('threads', {
      id: {
        type: 'varchar(50)',
        primaryKey: true,
      },
      title: {
        type: 'varchar(255)',
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
  
    pgm.addConstraint('threads', 'fk_threads.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('threads');
  };