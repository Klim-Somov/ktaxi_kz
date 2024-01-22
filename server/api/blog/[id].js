import db from '../db.js';
import { eventHandler } from 'h3';

const getArticle = async (context) => {
  const articleId = context._path.split('/').pop();

  try {
    const row = await new Promise((resolve, reject) => {
      db.get(
        `SELECT id, title, content, created_at FROM main_blog WHERE id = ?`,
        [articleId],
        (err, row) => {
          if (err) {
            console.error('ошибка статьи', err.message);
            reject(err);
            return;
          }
          resolve(row);
        }
      );
    });

    if (!row) {
      context.res.setHeader('Content-Type', 'application/json');
      context.res.statusCode = 404;
      context.res.end(JSON.stringify({ error: 'Article not found' }));
      return;
    }

    context.res.setHeader('Content-Type', 'application/json');
    context.res.statusCode = 200;
    context.res.end(JSON.stringify(row));
  } catch (error) {
    console.error(error.message);
    context.res.setHeader('Content-Type', 'application/json');
    context.res.statusCode = 500;
    context.res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
};
export default eventHandler(getArticle);
