import db from '../db.js';
import { pbkdf2Sync } from 'crypto';
import verifyToken from './verifyToken.js';
import { eventHandler } from 'h3';

const { secret_key } = useRuntimeConfig();

const insertUser = async (context) => {
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
      const { userName, password } = JSON.parse(body);

      const hashedPassword = hashPassword(password);

      db.run(
        'INSERT INTO auth_user (username, password, is_superuser, last_name, email, is_staff, is_active, date_joined, first_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          userName,
          hashedPassword,
          1,
          '',
          '',
          1,
          1,
          new Date().toISOString(),
          '',
        ],
        function (err) {
          if (err) {
            reject('Failed to add user');
            console.log(err);
            return;
          }
          resolve('User added successfully');
        }
      );
    });
  });
};

function hashPassword(password) {
  const iterations = 10000;
  const keylen = 64;
  return pbkdf2Sync(password, '', iterations, keylen, 'sha256').toString(
    'base64'
  );
}

export default eventHandler(insertUser);
