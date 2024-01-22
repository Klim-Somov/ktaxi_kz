import sqlite3 from 'sqlite3'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dbPath = path.resolve(__dirname, '../../data/db.sqlite3')
const db = new sqlite3.Database(dbPath)

export default db
