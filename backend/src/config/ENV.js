import dotenv from 'dotenv';
dotenv.config();

const ENV = {
  PORT: process.env.PORT,
  JWTSECRET: process.env.JWTSECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  MONGO_URI: process.env.MONGO_URI,
  DB_NAME: process.env.DB_NAME,
  NODE_ENV: process.env.NODE_ENV
}

export default ENV;
