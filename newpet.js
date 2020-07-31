function getPets() {
    var animals = {
        '1': 'Penguin',
        '2': 'Squirrel',
        '3': 'Turkey',
        '4': 'Banana slug',
        '5': 'Fox'
    };

    // Random Key
    var result = Object.entries(animals)[Math.floor(Math.random() * Object.keys(animals).length)];
    return result;
}
var pet = getPets();
console.log(pet);

export { getPets };