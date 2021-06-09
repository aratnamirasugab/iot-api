"use strict";

const repository = require('../repository/credentials');
const {hashPassword} = require('../helpers/bcrypt');


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