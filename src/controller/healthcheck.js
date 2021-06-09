"use strict";

const {response} = require('../context/response');

exports.healthcheck = function (req, res) {
    return response({
        "code" : 200,
        "message" : "Middleman project, powered by Nodejs!"
    }, res);
};