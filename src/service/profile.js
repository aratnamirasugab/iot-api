"use strict";

const repository = require('../repository/profile')

exports.addPhoneNumber = async function (DTO, userDTO) {

    let addPhoneNumberToDB = await repository.addPhoneNumber(DTO, userDTO);
    
    if (addPhoneNumberToDB.affectedRows === 2) {
        return {
            code : 200,
            message : "Successfully updated phone number"
        }
    } else if (addPhoneNumberToDB.affectedRows === 1) {
        return {
            code : 200,
            message : "Successfully added phone number"
        }
    } else {
        return {
            code : 500,
            message : "There was a problem when executing phone number route"
        }
    }
}