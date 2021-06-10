"use strict";

const repository = require('../repository/credentials');
const {hashPassword, comparePassword} = require('../helpers/bcrypt');
const {generateAccessToken} = require('../middleware/jwt');


exports.register = async function(DTO) {

    let emailOnly = DTO.email;

    let checkUserAlreadyRegistered = await repository.checkUserByEmail(emailOnly);
    if (checkUserAlreadyRegistered.length !== 0) {
        return {
            code : 400,
            message : "Already registered"
        }
    }

    let dataToRegister = {
        email : DTO.email,
        password : await hashPassword(DTO.password),
        name : DTO.name
    };

    let registered = await repository.register(dataToRegister);
    if (registered.affectedRows !== 0) {
        return {
            code : 200,
            message : "Successfully registered"
        }
    }
}

exports.login = async function (DTO) {
    
    let emailOnly = DTO.email;

    let checkUserAlreadyRegistered = await repository.checkUserByEmail(emailOnly);
    if (!checkUserAlreadyRegistered) {
        return {
            code : 404,
            message : "Account not found"
        }
    }

    let valueFromDB = checkUserAlreadyRegistered[0];
    let passwordCompareResult = await comparePassword(DTO.password, valueFromDB.password);
    if (!passwordCompareResult) {
        return {
            code : 403,
            message : "Wrong credential"
        }
    }

    return {
        code : 200,
        message : "Successfully login",
        token : await generateAccessToken(valueFromDB)
    }
}