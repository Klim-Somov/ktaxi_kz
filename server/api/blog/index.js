import db from '../db.js';
import { eventHandler } from 'h3';

const getArticles = async (context) => {
  const queryString = context._path.split('?')[1];
  const queryParams = new URLSearchParams(queryString);
  const page = queryParams.get('page') || 1;
  const limit = queryParams.get('limit') || 10;
  const offset = (page - 1) * limit;

  try {
    const rows = await new Promise((resolve, reject) => {
      db.all(
        'SELECT id, title, content, created_at, type_id FROM main_blog LIMIT ? OFFSET ?',
        [limit, offset],
        (err, rows) => {
          if (err) {
            console.error(err.message);
            reject(err);
            return;
          }
          resolve(rows);
        }
      );
    });

    const totalCount = await new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) as total FROM main_blog', (err, row) => {
        if (err) {
          console.error(err.message);
          reject(err);
          return;
        }
        resolve(row.total);
      });
    });
    context.res.setHeader('Content-Type', 'application/json');
    context.res.statusCode = 200;
    context.res.end(JSON.stringify({ totalCount, rows }));
  } catch (error) {
    console.error(error.message);
  }
};
export default eventHandler(getArticles);
