const db = require('../data.json');

const globalTryCatch = async cb =>{
    try {
        return await cb();
    } catch (e) {
        return e;
    }
};


const candyService = () => {

    const getAllCandies  = async function () {
        var array = [];
        array = db.candies;

        return array;

    };

    const getCandyById = async function (Id) {
        var array = [];
        array = db.candies;
        return array[Id-1];
    };

    const createCandy = async function (body){
        var array = [];
        array = db.candies;
        //var Biggest = 0;

        var highest = Math.max(...array.map(x => x.id));
            var newCandy = {
                    id: highest+1,
                    name: body.name,
                    description: body.description
                }
        return array.push(newCandy);
    };


return {getAllCandies, getCandyById, createCandy};
};

module.exports = candyService();