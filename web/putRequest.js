const request = require('./config.js');

console.log('PUT Request\n');

// axios.method(url[, data[, config]])
request.put('/user', 
{ 
    email: 'c.norris@mail.com' 
}, {
    params: {
        id: 2
    }
})
.then((response) => console.log(response.data))
.catch(() => console.log(error.message));


// axios({})
request({
    method: 'put',
    url: '/user?ID=1',
    data: {
        firstname: 'Jardani',
        lastname: 'Jovonovich'
    }
}).then((response) => console.log(response.data));
