import db from '../db.js';
import verifyToken from './verifyToken.js';
import { eventHandler } from 'h3';

const { secret_key } = useRuntimeConfig();

const postArticle = async (context) => {
  const bearerHeader = context.req.headers.authorization;
  const token = bearerHeader.split(' ')[1];
  const decodedToken = verifyToken(token, secret_key);
  if (!decodedToken) {
    context.res.statusCode = 401;
    context.res.end(JSON.stringify({ error: 'Невалидный токен' }));
    return;
  }
  return new Promise((resolve, reject) => {
    let body = '';
    context.req.on('data', (chunk) => {
      body += chunk.toString();
    });

    context.req.on('end', () => {
      const { title, content, isAdmin } = JSON.parse(body);

      if (!isAdmin) {
        reject('Недостаточно прав для выполнения операции');
        context.res.statusCode = 403;
        return;
      }

      db.run(
        'INSERT INTO main_blog (title, content, created_at, type_id) VALUES (?, ?, ?, ?)',
        [title, content, new Date().toISOString(), 1],
        function (err) {
          if (err) {
            console.error(err.message);
            context.res.statusCode = 500;
            reject('Failed to add article');
            return;
          } else {
            console.log(`Article added `);
            context.res.statusCode = 200;
            resolve({
              status: 'ok',
              message: 'Article added successfully',
            });
          }
        }
      );
    });
  });
};

export default eventHandler(postArticle);
