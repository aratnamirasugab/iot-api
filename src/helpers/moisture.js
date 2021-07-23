let five = require('johnny-five');
let {publishData} = require('./dynammo-script');

function runBoard(userDTO) {
    // init board
    var boards = new five.Boards ([
        {id: 'uno', port: "/dev/ttyACM0", debug: true}
    ])
    
    // init value
    let temperature, humidity;
    
    boards.on('ready', function() {

        console.log("board ready");
    
        let soilMoisture = new five.Sensor({
            pin: "A0",
            enabled : false,
            board : boards.byId("uno")
        });

        let waterPump = new five.Relay({
            pin : 10,
            type : "NO"
        });

        waterPump.toggle();
    
        soilMoisture.on("data", function() {
            humidity = soilMoisture.value;
        })
    
        boards.byId("uno").loop(15000, function () {
            soilMoisture.enable();
            boards.byId("uno").wait(500, function() {
                soilMoisture.disable();
            })
        })
    
        awsUpdater();
    })
    
    function awsUpdater() {
        setInterval(function() {
            let DTO = {
                "email" : userDTO.email,
                "humidity" : humidity,
                "temperature" : 25
            }
            publishData(DTO);
        },  20000);
    }
}

module.exports.runBoard = runBoard;