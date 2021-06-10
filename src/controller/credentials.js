"use strict";

const service = require('../service/credentials');
const {response} = require('../context/response');

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

exports.login = async function (req, res) {
    
    let DTO = req.body;

    try {
        let login = await service.login(DTO);
        if (typeof(login.code) !== undefined && login.code === 404) {
            return response({
                code : login.code,
                message : login.message
            }, res);
        } else if (typeof(login.code) !== undefined && login.code === 403) {
            return response({
                code : login.code,
                message : login.message
            }, res);
        }
        
        let dataToResponse = login

        return response({
            "code" : 200,
            "message" : "Successfully login",
            "token" : dataToResponse.token
        }, res);
    } catch (error) {
        return response({
            "code" : 500,
            "message" : error
        }, res);
    }
}

exports.deactived = async function (req, res) {

    let DTO = req.body;
    let userDTO = req.user;

    try {
        if (!DTO.agree) {
            return response({
                code : 200,
                message : "Thank you for staying with us!"
            }, res);
        }

        let deactive = await service.deactived(userDTO);
        let dataToResponse = deactive;

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