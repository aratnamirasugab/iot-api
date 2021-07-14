let {dynammodbClient} = require('../config/device');

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
        "ScanIndexForward": true
    };

    const result = await dynammodbClient.query(params).promise();
    return result;
}

exports.publishData = function (DTO) {
        
    let input = {
        'user_email' : DTO.email,
        'soilHumidity': DTO.humidity.toString(),
        'temperature' : DTO.temperature,
        'timeStamp' : new Date().toString()
    }

    let params = {
        TableName : "iot_data",
        Item : input
    }

    dynammodbClient.put(params, (err, data) => {
        if (err) {
            console.log("failed to insert data to dynammodb ", err);
        }
    })
}
