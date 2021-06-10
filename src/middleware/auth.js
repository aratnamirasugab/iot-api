"use strict";

const {response} = require('../context/response');
const jwt = require('jsonwebtoken');

exports.auth = function (req, res, next) {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return response({
            code : 401,
            message : "You're not authorized"
        }, res);
    }

    jwt.verify(token, "760dd806ab4017fe8ebc5bd8fe6cea0bd892eec510547b73c3278050dae1fe0ea2c01a66034d4ee2dabc73944a46b1053b9931d2a39933e3f4496845278c6aa5", (error, result) => {
        if (error) {
            return response({
                code : 403,
                message : "You're not authorized"
            }, res);
        }

        req.user = result;
        next();
    })
}