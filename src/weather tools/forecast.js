const request = require("request")  //
const forecast = (latitude,longtitude,callback) => {
    const url = "https://api.weatherapi.com/v1/current.json?key=dfc81ece8ea24d8ba7a181549231607&q="+ latitude + "," + longtitude
    request({url , json : true} , ( error , response ) => {
        if (error) {  
            callback ("unable to connect weather sarvice" , undefined) // callback (error , data)
        } else if (response.body.error) { 
            callback (response.body.error.message , undefined)
        } else {
            callback (undefined , `You Are In ${response.body.location.name}` +" "
            + `It's ${response.body.current.condition.text}` + ` and Temp ${response.body.current.temp_c} °C`)
        }
    })
}
module.exports = forecast ;   //
