let {dynammodbClient} = require('../config/device');
const { generateCurrentTime, generateCurrentTimeForDynamoDB } = require('./time');

exports.getDataByKey = async function (DTO) {

    let params = {
        "TableName": "iot_data",
        "KeyConditionExpression": "#DYNOBASE_user_email = :pkey",
        "ExpressionAttributeValues": {
          ":pkey": `${DTO.email}`
        },
        "ExpressionAttributeNames": {
          "#DYNOBASE_user_email": "user_email"
        },
        "ScanIndexForward": false
    };

    const result = await dynammodbClient.query(params).promise();
    return result;
}

exports.getWaterData = async function (DTO) {

    let params = {
        "TableName": "water_data",
        "KeyConditionExpression": "#DYNOBASE_user_email = :pkey",
        "ExpressionAttributeValues": {
          ":pkey": `${DTO.email}`
        },
        "ExpressionAttributeNames": {
          "#DYNOBASE_user_email": "user_email"
        },
        "ScanIndexForward": false
    };

    const result = await dynammodbClient.query(params).promise();
    return result;
}

exports.publishData = function (DTO) {

    let params = {
        TableName : "iot_data",
        Item : {
            'user_email' : DTO.email,
            'soilHumidity': DTO.humidity,
            'temperature' : DTO.temperature,
            'created_at' : generateCurrentTimeForDynamoDB()
        }
    }
    
    dynammodbClient.put(params, (err, data) => {
        if (err) {
            console.log("failed to insert data to dynammodb ", err);
        }
    })
}

exports.publishDataWater = function (DTO) {
    
    let params = {
        TableName : "water_data",
        Item : {
            'user_email' : DTO.email,
            'created_at' : generateCurrentTimeForDynamoDB()
        }
    }

    dynammodbClient.put(params, (err, data) => {

        if (err) {
            return {
                "code" : 500,
                "message" : "Failed to insert data to dynammodb " + err
            }
        }
    })
    return {
        "code" : 200,
        "message" : "Successfully water the plant"
    }
}
