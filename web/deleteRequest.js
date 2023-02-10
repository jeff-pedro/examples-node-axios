const request = require('./config.js');

console.log('DELETE Request\n');

request.delete('/user', {
    params: {
        id: 2
    }
})
.then(() => {
    console.log('You Delete: user with id:2');
})
.catch((err) => console.log(err.message));
