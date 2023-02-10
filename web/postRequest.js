const request = require('./config.js');

console.log('POST Request\n');

request.post('/user', {
    firstname: 'Fred',
    lastname: 'Flintstone',
    email: 'fred@rockhead.com'
})
.then((response) => console.log(response.data))
.catch(() => console.log(error.message));
