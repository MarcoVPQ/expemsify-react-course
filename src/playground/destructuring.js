///Object destructuring

/*const person = {
    name: 'Marco',
    age: 35,
    location:{
        city: 'Miami',
        temp: 88
    }
};


const {name: firstName = 'Anonymous', age} = person;
console.log(`${firstName} is ${age}`);

//se puede hacer rename con los dos puntos
const {city, temp: temperature} = person.location;


if (city && temperature ) {
    console.log(`It's ${temperature} in ${city}`);
}
*/

/*const book = {
    title: 'Ego is the enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'penguin'
    }
}

const { name: publisherName = 'Self-published'} = book.publisher;

console.log(publisherName);*/


///Array destructuring


/*const address = ['1299 S Juniper Street', 'Philadelphia','Pennsylvania', '19147'];

const [, , state] = address;

console.log(`you are in ${state}`);*/

const item = ['Coffe (iced)', '$2.00', '$3.50', '$2.75'];

const [itemName, ,mediumPrice] = item;

console.log(`A medium ${itemName} costs ${mediumPrice}`);







