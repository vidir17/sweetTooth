const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const candyService = require('./Services/candyService.js');
const offerService = require('./Services/offerService.js');

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



app.listen(3000, function(){
    console.log('Server is listening on port 3000');
});