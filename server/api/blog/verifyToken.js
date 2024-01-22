import jwt from 'jsonwebtoken';

export default function verifyToken(token, secretKey) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    console.error(err);
    return null;
  }
}