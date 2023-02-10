const request = require('./config.js');

console.log('GET Request\n');

// default method
//request('/user?id=1').then((response) => console.log(response.data));


// common use
request.get('/users')
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error.message))
    .then(() => console.log('All users returned sucessfully\n'));


// with parameters
// request.get('/user', {
//     params: {
//         id: 1
//     }
// })
// .then((response) => console.log(response.data))
// .catch((err) => console.log(err.message))


// with async/await
// async function getUser(userId) {
//     try {
//         const response = await request.get('/user', {
//             params: { 
//                 id: userId
//             } 
//         });
//         console.log(response.data);
//     } catch (err) {
//         console.log(err.message);
//     }
// }

// getUser(2);
