/* eslint-disable prettier/prettier */
const p = process.env
export const configuration = () => {return ({
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_URI: process.env.MONGODB_URI,
    AVALANCHE_NODE: process.env.AVALANCHE_FUJI_NODE_C,
    PRIVATEKEY: process.env.VALLEYN_PRIVATEKEY,
    PROJECT_ID:process.env.PROJECT_ID,
    PROJECT_SECRET_KEY:process.env.PROJECT_SECRET_KEY,
    port: parseInt(process.env.PORT, 10) || 3001,
    MYSQL_ROOT_PASSWORD: p.MYSQL_ROOT_PASSWORD,
    MYSQL_USER: p.MYSQL_USER,
    MYSQL_PASSWORD: p.MYSQL_PASSWORD,
    MYSQL_DATABASE: p.MYSQL_DATABASE,
    DB_HOST: p.DB_HOST,
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  })};