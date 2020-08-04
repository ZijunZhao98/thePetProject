//Get a random Key between 0 and 1(0 inclusive, 1 exclusive)
function getRandom() {
    var randomKey = Math.random();
    console.log(randomKey);
    return randomKey;
};
function getPets() {
    var NormalAnimals = {
        '1': 'N1',
        '2': 'N2',
        '3': 'N3',
        '4': 'N4',
        '5': 'N5',
        '6': 'N6',
        '7': 'N7',
    };
    var RareAnimals = {
        '8': 'R1',
        '9': 'R2',
    };
    var SuperRareAnimals = {
        '10': 'SR',
    };
 
    var Key = getRandom();
    // If we got 0 from getRandom(), we ask it to get a new number cuz we don't want 0 as a probability
    if (Key < 0) {
        var Key = getRandom();
    }
    if (Key > 0 && Key < 0.889) { // Normal pet
        console.log('You get a normal pet!')
        return result = Object.entries(NormalAnimals)[Math.floor(Math.random() * Object.keys(NormalAnimals).length)];
    } else if (Key > 0.889 && Key < 0.989) {// Rare pet
        console.log('You get a rare pet!')
        return result = Object.entries(RareAnimals)[Math.floor(Math.random() * Object.keys(RareAnimals).length)];
    } else if (Key > 0.989 && Key < 1) {// Super Rare pet
        console.log('You get a super rare pet!')
        return result = Object.entries(SuperRareAnimals)[Math.floor(Math.random() * Object.keys(SuperRareAnimals).length)];
    }
}
var pet = getPets();
console.log(pet);

export { getPets };
