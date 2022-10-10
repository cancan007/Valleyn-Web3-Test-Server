/* eslint-disable prettier/prettier */
export const configuration = () => {return ({
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_URI: process.env.MONGODB_URI,
    AVALANCHE_NODE: process.env.AVALANCHE_FUJI_NODE_C,
    PRIVATEKEY: process.env.PRIVATE_KEY,
    PROJECT_ID:process.env.PROJECT_ID,
    port: parseInt(process.env.PORT, 10) || 3001,
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  })};