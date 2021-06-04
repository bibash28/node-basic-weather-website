var request = require('request')

const geocode = (address, callback) =>{ 
    const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiYmliYXNoMjgiLCJhIjoiY2twZ2RvcWxtMDYxczJvcDlzNG85Y25yNCJ9.DpC7hxEfi6t3m8tEDObSdg&limit=1";
 
    request({url:geocodeUrl, json: true}, (error, {body}) => { 
        if(error){
            callback("Unable to connect to weather service", undefined) 
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
       }else{ 
            var latitude = body.features[0].geometry.coordinates[1];
            var longitude = body.features[0].geometry.coordinates[0]; 
            var location = body.features[0].place_name; 
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: location
            })
        }
    })
}

module.exports = geocode