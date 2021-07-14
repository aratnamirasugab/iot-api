"use strict";

const {response} = require('../context/response');
let {getDataByKey} = require('../helpers/dynammo-script');

exports.getPlantsStatus = async function (req, res) {

    let userDTO = req.user;
    try {
        
        let result = await getDataByKey(userDTO);

        return response({
            code : 200,
            message : result
        }, res);
        
    } catch (error) {
        console.log(error);
        return response({
            code : 500,
            message : error
        }, res);
    }
}