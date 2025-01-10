const AWS =  require('aws-sdk');
const multer = require('multer');

require('aws-sdk/lib/maintenance_mode_message').suppress = true;
require('dotenv').config();

const { awsconfig } = require('../config/app-config');

const s3 = new AWS.S3(awsconfig);

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = {
  s3,
  upload,
};
