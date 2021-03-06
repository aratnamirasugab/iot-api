"use strict";

const repository = require('../repository/profile')
const envs = require('../../config');
const profileAvatarRoute = envs.BASE_URL_PICTURE + '/api/profile/download/avatar';

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

exports.addAddress = async function (DTO, userDTO) {

    let addressToDB = await repository.addAdress(DTO, userDTO);

    if (addressToDB.affectedRows === 2) {
        return {
            code : 200,
            message : "Successfully updated address"
        }
    } else if (addressToDB.affectedRows === 1) {
        return {
            code : 200,
            message : "Successfully added address"
        }
    } else {
        return {
            code : 500,
            message : "There was a problem when executing address route"
        }
    }
}

exports.addProfilePicture = async function (DTO, userDTO) {

    let profilePictureToDB = await repository.addProfilePicture(DTO, userDTO)
    if (profilePictureToDB.affectedRows === 2) {
        return {
            code : 200,
            message : "Successfully updated profile picture"
        }
    } else if (profilePictureToDB.affectedRows === 1) {
        return {
            code : 200,
            message : "Successfully added profile picture"
        }
    } else {
        return {
            code : 500,
            message : "There was a problem when executing add profile picture route"
        }
    }
}

exports.getProfileInfo = async function (userDTO) {

    let resultFromDB = await repository.getProfileInfo(userDTO);

    if (resultFromDB) {
        return {
            code : 200,
            message : "Successfully pull user's data info",
            user_info : {
                "name" : resultFromDB.name,
                "avatar" : profileAvatarRoute + "/" + resultFromDB.avatar,
                "joined_on" : resultFromDB.created_at,
                "email" : resultFromDB.email,
                "address" : resultFromDB.address,
                "phone_number" : resultFromDB.phone_number
            }
        }
    } else {
        return {
            code : 500,
            message : "Failed to get user's info data"
        }
    }
}