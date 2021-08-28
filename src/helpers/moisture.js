let five = require('johnny-five');
let {publishData} = require('./dynammo-script');

function runBoard(userDTO) {
    // init board
    var boards = new five.Boards ([
        {id: 'uno', port: "/dev/ttyACM0", debug: true}
    ])
    
    // init value
    let tmp, humidity;
    
    boards.on('ready', function() {

        console.log("board ready");
    
        let soilMoisture = new five.Sensor({
            pin: "A2",
            enabled : false,
            board : boards.byId("uno")
        });

        let temperature = new five.Sensor({
            pin: "A1",
            enabled : false,
            board : boards.byId("uno")
        });

        let waterPump = new five.Relay({
            pin : "A3"
        });

        setInterval(function() {
            waterPump.toggle();
        }, 3000);
        
        waterPump.toggle(); // ini ngeclose listrik
    
        soilMoisture.on("data", function() {
            humidity = soilMoisture.value;
        })

        temperature.on("data", function() {
            tmp = temperature.value;
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
                "temperature" : tmp
            }
            publishData(DTO);
        },  10000);
    }
}

module.exports.runBoard = runBoard;