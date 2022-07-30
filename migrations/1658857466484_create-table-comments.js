/* eslint-disable camelcase */

exports.up = (pgm) => {
    pgm.createTable('comments', {
      id: {
        type: 'varchar(50)',
        primaryKey: true,
      },
      thread_id: {
        type: 'VARCHAR(50)',
        notNull: true,
      },
      owner: {
        type: 'VARCHAR(50)',
        notNull: true,
      },
      content: {
        type: 'TEXT',
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
      deleted_at: {
        type: 'varchar(30)',
        notNull: false,
      },
    });
  
    pgm.addConstraint('comments', 'fk_comments.thread_id_threads.id', 'FOREIGN KEY(thread_id) REFERENCES threads(id) ON DELETE CASCADE');
    pgm.addConstraint('comments', 'fk_comments.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('comments');
  };