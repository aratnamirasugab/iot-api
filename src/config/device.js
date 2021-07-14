const AWS = require('aws-sdk');
const envs = require('../../config');

let awsConfig = {
    "region" : envs.AWS_REGION,
    "endpoint" : envs.AWS_ENDPOINT,
    "accessKeyId" : envs.AWS_ACCESS_KEY_ID,
    "secretAccessKey" : envs.AWS_SECRET_ACCESS_KEY
};

AWS.config.update(awsConfig);
exports.dynammodbClient = new AWS.DynamoDB.DocumentClient();