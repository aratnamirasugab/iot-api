"use strict";

const axios = require('axios');
const envs = require('../../config');

module.exports = {
    postRegister: (DTO) => axios({
        "method" : "POST",
        "url" : `${envs.BASE_URL}/api/credentials/register`,
        "headers" : {
            "Content-Type" : "application/json"
        },
        "data" : DTO
    }),
    postLogin: (DTO) => axios({
        "method" : "POST",
        "url" : `${envs.BASE_URL}/api/credentials/login`,
        "headers" : {
            "Content-Type" : "application/json"
        },
        "data" : DTO
    }),
    putChangePassword: (userDTO, DTO) => axios({
        "method" : "PUT",
        "url" : `${envs.BASE_URL}/api/credentials/edit/password`,
        "headers" : {
            "Authorization" : `Bearer ${userDTO.token}`
        },
        "data" : DTO
    }),
    deleteDeactiveAccount: (userDTO, DTO) => axios({
        "method" : "DELETE",
        "url" : `${envs.BASE_URL}/api/credentials/de-actived`,
        "headers" : {
            "Authorization" : `Bearer ${userDTO.token}`
        },
        "data" : DTO
    }),
    postAddPhoneNumber: (userDTO, DTO) => axios({
        "method" : "POST",
        "url" : `${envs.BASE_URL}/api/profile/edit/phone_number`,
        "headers" : {
            "Authorization" : `Bearer ${userDTO.token}`
        },
        "data" : DTO
    }),
    postAddAddress: (userDTO, DTO) => axios({
        "method" : "POST",
        "url" : `${envs.BASE_URL}/api/profile/edit/address`,
        "headers" : {
            "Authorization" : `Bearer ${userDTO.token}`
        },
        "data" : DTO
    }),
    getProfileInfo: (userDTO) => axios({
        "method" : "GET",
        "url" : `${envs.BASE_URL}/api/profile`,
        "headers" : {
            "Authorization" : `Bearer ${userDTO.token}`
        }
    }),
    postProfilePicture : (userDTO, form) => axios({
        "method" : "POST",
        "url" : `${envs.BASE_URL}/api/profile/upload/avatar`,
        "headers" : {
            "Authorization" : `Bearer ${userDTO.token}`,
            ...form.getHeaders()
        },
        "data" : form
    })
    

};