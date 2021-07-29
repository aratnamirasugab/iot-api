"use strict";

const moment = require('moment');

exports.generateCurrentTime = function () {
   return new Date()
}

exports.generateCurrentTimeForDynamoDB = function () {
   let now = new Date()
   return moment(now).format("DD-MM-YYYY HH:mm:ss");
}