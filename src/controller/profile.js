"use strict";

const service = require('../service/profile');
const {response} = require('../context/response')

exports.addPhoneNumber = async function (req, res) {
    
    let DTO = req.body;
    let userDTO = req.user;

    try {
        let dataToResponse = await service.addPhoneNumber(DTO, userDTO);
        if (dataToResponse.code === 500 && typeof(dataToResponse.code) !== undefined) {
            return response({
                code : register.code,
                message : register.message
            }, res);
        }

        return response({
            code : dataToResponse.code,
            message : dataToResponse.message
        }, res);
    } catch (error) {
        return response({
            code : 500,
            message : error
        }, res);
    }
}

exports.addAddress = async function (req, res) {

    let DTO = req.body;
    let userDTO = req.user;

    try {
        let dataToResponse = await service.addAddress(DTO, userDTO);

        return response({
            code : dataToResponse.code,
            message : dataToResponse.message
        }, res);
    } catch (error) {
        return response({
            code : 500,
            message : error
        }, res);
    }
}

exports.addProfilePicture = async function (req, res) {
    
    let DTO = req.body;
    let userDTO = req.user;

    try {
        let dataToResponse = await service.addProfilePicture(DTO, userDTO);

        return response({
            code : dataToResponse.code,
            message : dataToResponse.message
        }, res);
    } catch (error) {
        return response({
            code : 500,
            message : error
        }, res);
    }
}

exports.getProfileInfo = async function (req, res) {

    let userDTO = req.user;

    try {
        let dataToResponse = await service.getProfileInfo(userDTO);

        return response({
            code : dataToResponse.code,
            message : dataToResponse.message,
            user_info : dataToResponse.user_info
        }, res);
    } catch (error) {
        console.log(error);
        return response({
            code : 500,
            message : error
        }, res);
    }
}