const person = {
    name: 'Demba',
    age: 27,
    location: {
        city: 'Nouakchott',
        temp: 92
    }
};

const {name, age} = person;

console.log(`${name} is ${age}`);

const {city, temp: temperature } = person.location;

if (city && temperature) {
    console.log(`It's ${temperature} in ${city}.`);
}