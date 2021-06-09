"use strict";

const {response} = require('../context/response');

exports.healthcheck = function (req, res) {
    return response({
        "code" : 200,
        "message" : "IOT Smart Waterpot project, powered by Nodejs!"
    }, res);
};