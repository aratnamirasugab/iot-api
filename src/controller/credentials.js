"use strict";

const service = require('../service/credentials');

exports.register = async function (req, res) {

    let DTO = req.body;

    try {
        let register = await service.register(DTO);
        if (register.code === 400 && typeof(register.code) !== undefined) {
            return response({
                code : register.code,
                message : register.message
            }, res);
        }

        let dataToResponse = register;

        return response({
            code : dataToResponse.code,
            message : dataToResponse.message
        }, res);
    } catch (error) {
        return response({
            "code" : 500,
            "message" : error
        }, res);
    }
}