"use strict";

const service = require('../service/credentials');
const {response} = require('../context/response');
let {runBoard} = require('../helpers/moisture');

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
        console.log(error);
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
        if (dataToResponse.code === 200) {
            runBoard(DTO);
        }

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

        let dataToResponse = await service.deactived(userDTO);
        
        if (typeof(dataToResponse.code) !== undefined && dataToResponse.code === 500) {
            return response({
                code : dataToResponse.code,
                message : dataToResponse.message
            }, res);
        }

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

exports.changePassword = async function (req, res) {
    
    let DTO = req.body;
    let userDTO = req.user;

    try {
        let dataToResponse = await service.changePassword(DTO, userDTO);

        if (typeof(dataToResponse.code) !== undefined && dataToResponse.code === 403) {
            return response({
                code : dataToResponse.code,
                message : dataToResponse.message
            }, res);
        }

        if (typeof(dataToResponse.code) !== undefined && dataToResponse.code === 500) {
            return response({
                code : dataToResponse.code,
                message : dataToResponse.message
            }, res);
        }

        return response({
            code : dataToResponse.code,
            message : dataToResponse.message
        }, res);
    } catch (error) {
        console.log(error)
        return response({
            "code" : 500,
            "message" : error
        }, res);
    }
}