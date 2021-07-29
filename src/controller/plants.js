"use strict";

const {response} = require('../context/response');
let {getDataByKey, getWaterData} = require('../helpers/dynammo-script');
let {publishDataWater} = require('../helpers/dynammo-script');

exports.getPlantsStatus = async function (req, res) {

    let userDTO = req.user;
    try {
        
        let result = await getDataByKey(userDTO);
        let water_result = await getWaterData(userDTO);

        result.Items.sort(function (a,b) {
            return new Date(b.created_at) - new Date(a.created_at);
        })

        water_result.Items.sort(function (a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
        })

        if (result.Items.length > 10) {
            result.Items.length = 10;
        }

        if (water_result.Items.length > 10) {
            water_result.Items.length = 10;
        }

        return response({
            code : 200,
            message : result,
            last_water : water_result
        }, res);
        
    } catch (error) {
        console.log(error);
        return response({
            code : 500,
            message : error
        }, res);
    }
}

exports.postWaterPlant = async function (req, res) {

    let userDTO = req.user;

    try {
        let result = publishDataWater(userDTO);

        return response({
            code : result.code,
            message : result.message
        }, res);
        
    } catch (error) {
        console.log(error);
        return response({
            code : 500,
            message : error
        }, res);
    }
}