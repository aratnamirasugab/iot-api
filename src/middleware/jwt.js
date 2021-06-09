"use strict";

const jwt = require('jsonwebtoken');

exports.generateAccessToken = async function (DTO) {
    return jwt.sign({
        id : DTO.id,
        email : DTO.email,
        name : DTO.name
    }, "760dd806ab4017fe8ebc5bd8fe6cea0bd892eec510547b73c3278050dae1fe0ea2c01a66034d4ee2dabc73944a46b1053b9931d2a39933e3f4496845278c6aa5", {
        expiresIn: '30d'
    });
}