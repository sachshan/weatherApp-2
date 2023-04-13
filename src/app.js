const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geolocate = require('../utils/geolocate.js');
const forecast = require('../utils/forecast.js');


const publicDir = path.join(__dirname, "../public");
console.log(publicDir);

// start express
const app = express();

// Set up hbs
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Connect to static resources
app.use(express.static(publicDir));

// Index page
app.get('', (req, res)=>{
    res.render('index', {
        location: 'Boston',
        forecast: 'Rainy',
        name: 'Shantanu Sachdeva'
    });
})

app.get('/weather', (req,res)=>{

    let address = req.query.address;
    console.log(address);

    if(!address)
    {
        return res.send({
            error: "Please provide address!!"
        })
    }


    geolocate(address, (error,{longitude, lattitude, location})=>{
    
        if(error)
        {
            console.log(error);
        }
        else
        {
            console.log("Longitude: " + longitude+" Lattitude: "+lattitude);
            // Request the weather for the location weather stack api and print the result
            forecast(longitude, lattitude, (error, {observation_time, weather_descriptions, temperature, feelslike})=>{
    
                if(error)
                {
                    return res.send(
                        {
                            error: "Hey, there is an error, and we are unable to show the weather!!"
                        });
                }
                else
                {       
                        return res.send({
                            location: location,
                            observation_time: observation_time,
                            weather_description: weather_descriptions[0],
                            temperature: temperature,
                            feelslike: feelslike
                        })
                    
                }    
    
            })
        }
    
        
    })

    
    // res.send({
    //     address: address,
    //     forecast: "Sunny with bouts of clouds"
    // })

})

// Learn about query string in node.js
app.get('/qs',(req,res)=>{
    let qs = req.query;

    if(!req.query.a)
    {
        return res.send({
            Error: "please provide search term!!"
        })
    }
    res.send(qs.a);
})

// About page
app.get('/about', (req, res)=>{
   res.render('about', {
    name: 'Shantanu Sachdeva',
    age: 23
   })
});

// Help page
app.get('/help', (req,res)=>{
    res.render('help',{
        helpCenter: 'Boston Fenway',
        name: 'Shantanu Sachdeva'
    })
})

// HELP Error Page
app.get('/help/*', (req,res)=>{
    res.render('error', {
        message: "Help Page Not Found"
    });
})

// Error Page
app.get('*', (req,res)=>{
    res.render('error', {
        message: "Page Not Found"
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})