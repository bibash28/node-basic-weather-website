var request = require('request') 
const weather = (lat, lng, callback) =>{  
    const url = "http://api.weatherstack.com/current?access_key=bc2cbc86fc67d228c46081b84eb9f396&query="+ lat + "," + lng + "units=f"; 
    request({url}, (error, {body}) => {
        if(error){ 
            callback("Unable to connect to weather service", undefined) 
        }else if(body.error){
            callback('Unable to find location', undefined) 
        }else{ 
            const data = JSON.parse(body)
            callback(undefined, data.current.weather_descriptions[0] + ". It is currently " + data.current.temperature + " degree out. It feels like  " + data.current.feelslike + "  degree out. The humidity is "+ data.current.humidity + "%.")
        }    
    })
}


module.exports = weather