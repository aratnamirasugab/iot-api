"use strict";

const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis)

const client = redis.createClient();

client.on('error', function (err) {
    console.log('Error ' + err);
});

module.exports = client;