const db = require('../data.json');


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
        console.log(Object.getOwnPropertyNames(array[0]));
        let allowed = ['id', 'name', 'maximumHits'];
        const results = [];
        
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

return {getAllPinatas};
};

module.exports = pinataService();