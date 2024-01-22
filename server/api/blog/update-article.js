import db from '../db.js';
import verifyToken from './verifyToken.js';
import { eventHandler } from 'h3';

const { secret_key } = useRuntimeConfig();

const editArticle = async (context) => {
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
      const { id, isAdmin, title, content } = JSON.parse(body);

      if (!isAdmin) {
        reject('Недостаточно прав для выполнения операции');
        context.res.statusCode = 403;
        context.res.end(
          JSON.stringify({ error: 'Недостаточно прав для выполнения операции' })
        );
        return;
      }

      db.run(
        'UPDATE main_blog SET title = ?, content = ? WHERE id = ?',
        [title, content, id],
        function (err) {
          if (err) {
            console.error(err.message);
            context.res.statusCode = 500;
            context.res.end(
              JSON.stringify({ error: 'Failed to edit article' })
            );
          } else {
            console.log(`Article edited`);
            context.res.statusCode = 200;
            context.res.end(
              JSON.stringify({ message: 'Article edited successfully' })
            );
          }
        }
      );
    });
  });
};

export default eventHandler(editArticle);
