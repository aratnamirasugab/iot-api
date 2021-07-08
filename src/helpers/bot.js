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
    })



};