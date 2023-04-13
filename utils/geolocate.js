const chalk = require('chalk');
const request = require('postman-request');

const geolocate = (address, callback)=>{

    const lurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2hhbnNhY2giLCJhIjoiY2xnMnA5YWxuMDd1ZDNrcnZtbmJmbGUzcyJ9.D6uxQniAPbIMVcLnqUipdQ';

    request(
        {url: lurl, json:true },
        (error, response)=>{
    
            if(error)
            {
                callback(error, undefined);
            }
            else if(response.body.error)
            {
                callback(error, undefined);
            }
            else
            {
                if(response.body.features.length === 0)
                {
                    callback(error, undefined);
                }
                else
                {
                    
                    const longitude = response.body.features[0].center[0];
                    const lattitude = response.body.features[0].center[1];
                    const location = response.body.features[0].place_name;
    
                    callback(undefined, {longitude, lattitude, location});
                }
                
    
            }
        }
    );

}

module.exports = geolocate;