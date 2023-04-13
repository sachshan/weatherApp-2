const chalk = require('chalk');
const request = require('postman-request');



const forecast = (longitude, lattitude ,callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=b559a4c435ce09fd160c3c3921641d9c&query='+lattitude+','+longitude;


    request(
        {url: url, json:true},
        (error, response)=>{
    
            if(error)
            {
                callback(error, undefined);
            }
            else if(response.body.error)
            {
                callback(response.body.error, undefined);
            }
            else
            {
                const wData = response.body.current;
    
                callback(undefined, wData);
            }
            
        }
    )

}

module.exports = forecast;