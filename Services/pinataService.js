const db = require('../data.json');
const request = require('request');
const allowed = ['id', 'name', 'maximumHits'];
const results = [];
const surprises = ['https://vignette.wikia.nocookie.net/matrix/images/3/32/Neo.jpg/revision/latest?cb=20060715235228',
                   'https://www.thoughtco.com/thmb/T8UuUB3R6VolLVyX9yYyGC5J3KI=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/906520-58b89ea13df78c353cce0fc1.jpg',
                   'https://vignette.wikia.nocookie.net/matrix/images/6/67/Trinityfull.jpg/revision/latest?cb=20060803214449',
                   'https://vignette.wikia.nocookie.net/matrix/images/4/4d/Agent-smith-the-matrix-movie-hd-wallpaper-2880x1800-4710.png/revision/latest?cb=20140504013834'];
const globalTryCatch = async cb => {
    try{
        return await cb();
    } catch (e) {
        return e;
    }
};

const pinataService = () => {

    const getAllPinatas = async function () {
        var array = [];
        array = db.pinatas;
        
        const clone = JSON.parse(JSON.stringify(array));
        for(var i = 0; i < db.pinatas.length; i++){
        results[i] = Object.keys(clone[i])
            .filter(id => allowed.includes(id))
            .reduce((obj, id) => {
                obj[id] = (clone[i])[id];
                return obj;
            }, {});
        }
        return results;
    };
    const getPinataById = async function (Id) {  
        var array = [];
        Id = Id-1;
        array = db.pinatas;
        results[Id] = Object.keys(array[Id])
            .filter(id => allowed.includes(id))
            .reduce((obj, id) => {
                obj[id] = (array[Id])[id];
                return obj;
            }, {});  
    
        return results[Id];
    };
    const createPinata = async function (body){
        var FileSystem = require('fs');
        var directory = './images';
        request.get(surprises[Math.round(Math.random() * 3)]).pipe(FileSystem.createWriteStream('./images/' + body.name + '.jpg'));
        if (!FileSystem.existsSync(directory)){
            FileSystem.mkdirSync(directory);
        }
        var array = [];
        array = db.pinatas;
        var highest = Math.max(...array.map(x => x.id));
            var newPinata = {
                    id: highest+1,
                    name: body.name,
                    surprise: ('./images/' + body.name + '.jpg'),
                    maximumHits: body.maximumHits
                }
        return array.push(newPinata);
    };

return {getAllPinatas, getPinataById, createPinata};
};

module.exports = pinataService();