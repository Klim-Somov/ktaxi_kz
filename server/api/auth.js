import db from './db.js';
import { pbkdf2Sync, timingSafeEqual } from 'crypto';
import jwt from 'jsonwebtoken';
import { eventHandler } from 'h3';

const authUser = async (context) => {
  const { secret_key } = useRuntimeConfig();

  function hashPassword(password) {
    const iterations = 10000;
    const keylen = 64;
    return pbkdf2Sync(password, '', iterations, keylen, 'sha256').toString(
      'base64'
    );
  }
  function comparePasswords(inputPassword, hashedPassword) {
    const inputHash = hashPassword(inputPassword);
    return timingSafeEqual(
      Buffer.from(inputHash, 'base64'),
      Buffer.from(hashedPassword, 'base64')
    );
  }

  function createToken(user) {
    const payload = {
      username: user.username,
      isAdmin: !!user.is_superuser || false,
    };

    const options = {
      expiresIn: '24h',
    };

    return jwt.sign(payload, secret_key, options);
  }

  return new Promise((resolve, reject) => {
    let body = '';
    context.req.on('data', (chunk) => {
      body += chunk.toString();
    });

    context.req.on('end', () => {
      const { userName, password } = JSON.parse(body);
      db.get(
        'SELECT * FROM auth_user WHERE username = ?',
        [userName],
        (err, user) => {
          if (err || !user) {
            reject('Invalid username or password');
            return;
          }
          if (comparePasswords(password, user.password)) {
            const token = createToken(user);

            resolve({
              authenticated: true,
              token,
              redirect: '/blog-admin',
              is_admin: !!user.is_superuser,
            });
          } else {
            reject('authenticated: false');
          }
        }
      );
    });
  });
};

export default eventHandler(authUser);
