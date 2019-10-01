const db = require('../data.json');

const globalTryCatch = async cb =>{
    try {
        return await cb();
    } catch (e) {
        return e;
    }
};

const offerService = () => {

    const getAllOffers = async function () {
    //console.log(array.find(x => x.id == i));
    let offerArray, candyArray = [];
    offerArray = db.offers;
    candyArray = db.candies;
    //const temp = Object.assign(offerArray, candyArray); 
    //temp.push(offerArray);
    
    const clone = JSON.parse(JSON.stringify(offerArray));
    
    for(var h = 0; h < offerArray.length; h++){
        for(var i = 0; i < offerArray[h].candies.length; i++){
            clone[h].candies[i] = candyArray[clone[h].candies[i]-1];   
        }
    }
   
    
    //console.log(offerArray.length);
    //console.log(offerArray[1].candies.length);
    //console.log(offerArray[0].candies[0].findById());
    //console.log(array.find(x=>x.candies==1));
    return clone;
};

return {getAllOffers};
};

module.exports = offerService();