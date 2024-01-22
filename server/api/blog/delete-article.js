import db from '../db.js';
import verifyToken from './verifyToken.js';
import { eventHandler } from 'h3';

const { secret_key } = useRuntimeConfig();

const deleteArticle = async (context) => {
  const bearerHeader = context.req.headers.authorization;
  const token = bearerHeader.split(' ')[1];
  const decodedToken = verifyToken(token, secret_key);
  if (!decodedToken) {
    context.res.statusCode = 401;
    context.res.end(JSON.stringify({ error: 'Невалидный токен' }));
    return;
  }
  return new Promise((reject) => {
    let body = '';
    context.req.on('data', (chunk) => {
      body += chunk.toString();
    });

    context.req.on('end', () => {
      const { id, isAdmin } = JSON.parse(body);

      if (!isAdmin) {
        reject('Недостаточно прав для выполнения операции');
        context.res.statusCode = 403;
        return;
      }

      db.run('DELETE FROM main_blog WHERE id = ?', [id], function (err) {
        if (err) {
          console.error(err.message);
          context.res.statusCode = 500;
          context.res.end(
            JSON.stringify({ error: 'Failed to delete article' })
          );
        } else {
          console.log(`Article deleted`);
          context.res.statusCode = 200;
          context.res.end(
            JSON.stringify({ message: 'Article deleted successfully' })
          );
        }
      });
    });
  });
};

export default eventHandler(deleteArticle);
