const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const candyService = require('./Services/candyService.js');

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

app.post('/api/candies', async function (req,res){
candyService.createCandy(req.body).then(r => {
    return res.status(201).json(r);
}).catch( e => {
    return res.status(400).json(e);
});
});

app.listen(3000, function(){
    console.log('Server is listening on port 3000');
});