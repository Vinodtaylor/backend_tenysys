// const dotEnv = require("dotenv");

// if (process.env.NODE_ENV !== "prod") {
//   const configFile = `./.env.${process.env.NODE_ENV}`;
//   dotEnv.config({ path: configFile });
// } else {
//   dotEnv.config();
// }


module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  PAGE_SIZE: process.env.PAGE_SIZE,
  SENDER_MAIL: process.env.SENDERMAIL,
  PASS_MAIL: process.env.SENDERPASS,
  GATEWAY_HOST: process.env.GATEWAY_HOST,
  PRODUCT_HOST: process.env.PRODUCT_HOST,
  MERCHANT_HOST: process.env.MERCHANT_HOST,
  PERCENTAGE: process.env.PERCENTAGE,
  PAYMENTDATELAPSE: process.env.PAYMENTDATELAPSE,
  ADMINPANEL_HOST: process.env.ADMINPANEL_HOST,
  FCMKEY: process.env.FCMKEY,
  FCMKEY1: process.env.FCMKEY1,
  ACCOUNTSID: process.env.ACCOUNTSID,
  AUTHTOKEN: process.env.AUTHTOKEN,
  TWILIOFREETRIALNUMBER: process.env.TWILIOFREETRIALNUMBER,
  PASSWORDCREATIONFROMADMIN: process.env.PASSWORDCREATIONFROMADMIN,
  CREATEISSUE: process.env.CREATEISSUE,
  TIMEZONE : process.env.TIME_ZONE,

  awsconfig: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
};
