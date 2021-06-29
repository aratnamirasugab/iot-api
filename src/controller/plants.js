"use strict";

const {response} = require('../context/response');
let {runMoistfunction} = require('../helpers/moisture');

exports.getPlantsStatus = async function (req, res) {

    try {
        
        let dataToResponse = runMoistfunction();
        console.log(dataToResponse)

        // return response({
        //     code : dataToResponse.code,
        //     message : dataToResponse.message
        // }, res);
    } catch (error) {
        console.log(error);
        return response({
            code : 500,
            message : error
        }, res);
    }
}