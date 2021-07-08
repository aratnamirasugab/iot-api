const awsIot = require('aws-iot-device-sdk');

let device = awsIot.device({
    keyPath: 'PATH_TO_YOUR_KEY_FILE.key',
    certPath: 'PATH_TO_YOUR_CERTIFICATE_PEM_FILE.crt',
    caPath: 'PATH_TO_ROOT_CA_FILE.pem',
    host: "IOT_DEVICE_URL",
    port: 8883,
    clientId: "raspi-data-publisher",
    region: 'ap-southeast-1'
});