import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '25032003',
  database: 'blog_app',
});

export const db = Object.freeze({
  pool: pool,
});
