/* eslint-disable camelcase */

exports.up = (pgm) => {
    pgm.createTable('comments_like', {
      user_id: {
        type: 'VARCHAR(50)',
        notNull: true,
      },
      comment_id: {
        type: 'varchar(50)',
        notNull: true,
      },
      inserted_at: {
        type: 'varchar(30)',
        notNull: true,
      },
    });
  
    pgm.addConstraint('comments_like', 'primary_user_id_comment_id', 'PRIMARY KEY(user_id, comment_id)');
    pgm.addConstraint('comments_like', 'fk_comments_like.user_id_users.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');
    pgm.addConstraint('comments_like', 'fk_comments_like.comment_id_comments.id', 'FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE');
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('comments_like');
  };