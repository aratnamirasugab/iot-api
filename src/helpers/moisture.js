// "use strict";

// let five = require('johnny-five')
// let board = new five.Board({ port: "/dev/ttyACM0"});

// exports.runMoistfunction = function(callback) {

//     console.log("masoekskk");
//     let level_moist = "";
//     let moisture_value = 0;

//     board.on("ready", function() {
        
//         // change or add this depending on your sensor(s)
//         let moisture = new five.Sensor({
//             pin : "A0"
//         })

//         // let getMoistAndLevel = function(callback) {

//         console.log("test")
        
//         moisture.on("data", function() {
//             moisture.enable();
//             moisture_value = moisture.value;

//             if (moisture.value <= 400) {
//                 level_moist = "Low"
//             } else if (moisture.value > 400 && moisture.value < 800) {
//                 level_moist =   "Average"
//             } else {
//                 level_moist = "High"
//             }
            
//             console.log("halo")
//             console.log(moisture_value)
//             moisture.disable();
//             // callback (
//             //     level_moist,
//             //     moisture_value
//             // )
//         })
//     })
//     console.log("woiiiiiii ", level_moist)
//     // return 
// }