const db = require('../data.json');
const request = require('request');
const allowed = ['id', 'name', 'maximumHits', 'currentHits'];
const results = [];
const surprises = ['https://vignette.wikia.nocookie.net/matrix/images/3/32/Neo.jpg/revision/latest?cb=20060715235228',
                   'https://www.thoughtco.com/thmb/T8UuUB3R6VolLVyX9yYyGC5J3KI=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/906520-58b89ea13df78c353cce0fc1.jpg',
                   'https://vignette.wikia.nocookie.net/matrix/images/6/67/Trinityfull.jpg/revision/latest?cb=20060803214449',
                   'https://vignette.wikia.nocookie.net/matrix/images/4/4d/Agent-smith-the-matrix-movie-hd-wallpaper-2880x1800-4710.png/revision/latest?cb=20140504013834'];

let counter = [];
var FileSystem = require('fs');
var directory = './images';
fill_Hits();
function fill_Hits(){
for(var i = 0; i < db.pinatas.length; i++){
    //random generate url
    (db.pinatas[i])['currentHits'] = 0;
}

const globalTryCatch = async cb => {
    try{
        return await cb();
    } catch (e) {
        return e;
    }
};
}
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
    console.log(db.pinatas[Id].surprise);
        return results[Id];
    };
    const createPinata = async function (body){
        
        //request.get(surprises[Math.round(Math.random() * 3)]).pipe(FileSystem.createWriteStream('./images/' + body.name + '.jpg'));
        if (!FileSystem.existsSync(directory)){
            FileSystem.mkdirSync(directory);
        }
        var array = [];
        array = db.pinatas;
        var highest = Math.max(...array.map(x => x.id));
            var newPinata = {
                    id: highest+1,
                    name: body.name,
                    surprise: (surprises[Math.round(Math.random() * 3)]),
                    //surprise: ('./images/' + body.name + '.jpg'),
                    maximumHits: body.maximumHits,
                    currentHits: 0
                }
                
                return array.push(newPinata);
    };

    const hitPinata = async function (Id) {
        //console.log( surprises[Math.round(Math.random() * 3)]);
        console.log((db.pinatas[Id-1])['surprise']);
        (db.pinatas[Id-1])['currentHits'] += 1;
        if((db.pinatas[Id-1])['currentHits'] < (db.pinatas[Id-1])['maximumHits']){
        console.log((db.pinatas[Id-1])['currentHits']);
        return 204;
        }else if((db.pinatas[Id-1])['currentHits'] == (db.pinatas[Id-1])['maximumHits']){
            request.get(db.pinatas[Id-1].surprise).pipe(FileSystem.createWriteStream('./images/' + db.pinatas[Id-1].name + '.jpg'));
            return 200; // Winner
        }else{
            return 423; //locked
        }
    };

return {getAllPinatas, getPinataById, createPinata, hitPinata};
};

module.exports = pinataService();