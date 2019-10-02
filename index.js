const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const candyService = require('./Services/candyService.js');
const offerService = require('./Services/offerService.js');
const pinataService = require('./Services/pinataService.js');

app.use(bodyParser.json());

//(10%) /api/candies - Gets all candies within the application
app.get('/api/candies', async function (req, res) {
    const result = await candyService.getAllCandies();
    return res.json(result);
});

//(10%) /api/candies/{id} - Gets a candy with a certain id
app.get('/api/candies/:Id', async function (req, res){
    const Id = req.params.Id;
    const result = await candyService.getCandyById(Id);
    return res.json(result);
});

//(10%) /api/candies - Creates a new candy (NO MODEL VALIDATION) and should return
//the newly created model along with a proper status code
app.post('/api/candies', async function (req,res){
        candyService.createCandy(req.body).then(r => {
        return res.status(201).json(r);
    }).catch( e => {
        return res.status(400).json(e);
    });
});

//(10%) /api/offers - Gets all offers within the application and the output should include the
//nested candies within the offer object as seen in the Model Structure section
app.get('/api/offers', async function (req, res){
    const result = await offerService.getAllOffers();
    return res.json(result);
});

//(10%) /api/pinatas - Gets all pinatas within the application - should contain all properties
//excluding surprise
app.get('/api/pinatas', async function (req, res){
    
    const result = await pinataService.getAllPinatas();
    return res.json(result);
});

//(10%) /api/pinatas/{id} - Gets a pinata with a certain id - should contain all properties
//excluding surprise
app.get('/api/pinatas/:Id', async function (req, res){
    const Id = req.params.Id;
    const result = await pinataService.getPinataById(Id);
    return res.json(result);
});

//(20%) /api/pinatas - Create a new pinata (NO MODEL VALIDATION) and should return the
//newly created model along with a proper status code. Here the model should also include a
//surprise property which can either be a written text or an URL to a valid image (.jpg, .png,
//etc.)
app.post('/api/pinatas', async function (req,res){
    pinataService.createPinata(req.body).then(r => {
    return res.status(201).json(r);
}).catch( e => {
    return res.status(400).json(e);
});
});



app.listen(3000, function(){
    console.log('Server is listening on port 3000');
});