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

    let checkUserAlreadyRegistered = await repository.checkUserByEmail(DTO);

    if (!checkUserAlreadyRegistered || checkUserAlreadyRegistered.length === 0) {
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

exports.deactived = async function (userDTO) {

    let resultFromDB = await repository.deactived(userDTO);
    if (resultFromDB.affectedRows === 0) {
        return {
            code : 500,
            message : "Failed to deactivate user"
        }
    }

    return {
        code : 200,
        message : "Successfully deactived the account"
    }
}

exports.changePassword = async function (DTO, userDTO) {

    let dataUser = await repository.checkUserByEmail(userDTO);

    if (dataUser.length === 0) {
        return {
            code : 403,
            message : "Wrong Credentials"
        }
    }

    let compPasswd = await comparePassword(DTO.old_password, dataUser[0].password);
    
    if (!compPasswd) {
        return {
            code : 403,
            message : "Wrong Credentials"
        }
    }

    DTO.new_password = await hashPassword(DTO.new_password);
    let resultFromDB = await repository.changePassword(DTO, userDTO);
    
    if (resultFromDB.affectedRows === 0) {
        return {
            code : 500,
            message : "Failed to change user password"
        }
    }

    return {
        code : 200,
        message : "Successfully change user password"
    }
}