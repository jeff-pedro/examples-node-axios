const http = require('http');
const url = require('url');

// server params
const host = 'localhost';
const port = 3000;

// fake database
const users = [
    { id: 1, firstname: "Jonh", lastname: "Wick", email: "jonh.wick@mail.com" },
    { id: 2, firstname: "Chuck", lastname: "Norris", email: "chuck.norris@mail.com" }
];

// server
const server = http.createServer((req, res) => {
    // crud
    if(req.method === 'GET') {
        return handleGetReq(req, res);
    } else if (req.method === 'POST') {
        return handlePostReq(req, res);
    } else if (req.method === 'PUT') {
        return handlePutReq(req, res);
    } else if (req.method === 'DELETE') {
        return handleDeleteReq(req, res);
    }

});

// handlers
function handleGetReq(req, res) {
    const { pathname } = url.parse(req.url); 
    const { query } = url.parse(req.url);
    const id = (query !== null) ? parseInt(query.split('=')[1]) : undefined;

    // GET /
    if (pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
        res.end('{ Welcome to Axios Examples }')
    // GET /users
    } else if (pathname === '/users') {
        res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
        res.end(JSON.stringify(users));
    // GET /user/:id
    } else if (pathname === '/user' || query == null) {
        const result = users.find((user) => user.id === id)
        res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
        res.end(JSON.stringify(result));
    // Error Handler
    } else {
        res.end(`{ "error": "${http.STATUS_CODES[404]}" }`);
    }
}

function handlePostReq(req, res) {
    const size = parseInt(req.headers['content-length'], 10);
    const buffer = Buffer.allocUnsafe(size);
    let pos = 0;

    const { pathname } = url.parse(req.url);
    
    // Error Handler
    if (pathname !== '/user') {
        res.writeHead(404, { 'Content-Type': 'application/json;charset=utf-8' });
        return res.end(`{ "error": "${http.STATUS_CODES[404]}" }`);
    }

    req
        .on('data', (chunk) => {
            const offset = pos + chunk.length;
            
            if (offset > size) {
                res.writeHead(413, { 'Content-Type': 'application/json;charset=utf-8' });
                return res.end(`{ "error": "${http.STATUS_CODES[413]}" }`);
            }

            chunk.copy(buffer, pos);
            pos = offset;
        })
        .on('end', () => {
            if (pos !== size) {
                res.writeHead(400, { 'Content-Type': 'application/json;charset=utf-8' });
                return res.end(`{ "error": "${http.STATUS_CODES[400]}" }`);
            }

            let data = JSON.parse(buffer.toString());
            const userId = users.length + 1;
            data = {'id': userId, ...data};
            users.push(data) 
            res.end('You Posted: ' + JSON.stringify(data));
        });
}

function handlePutReq(req, res) {
    const size = parseInt(req.headers['content-length'], 10);
    const buffer = Buffer.allocUnsafe(size);
    let pos = 0;
    
    const { pathname } = url.parse(req.url);
    const { query } = url.parse(req.url);
    const id = (query == null) ? undefined : parseInt(query.split('=')[1]);

    //Handler Error
    if (pathname !== '/user' || query == null) {
        res.writeHead|(404, { 'Content-Type': 'application/json;charset=utf-8' });
        return res.end(`{ "error": "${http.STATUS_CODES[404]}" }`);
    }

    req
    .on('data', (chunk) => {
        const offset = pos + chunk.length;
        
        if (offset > size) {
            res.writeHead(413, { 'Content-Type': 'application/json;charset=utf-8' });
            res.end(`{ "error": "${http.STATUS_CODES[413]}" }`);
        }

        chunk.copy(buffer, pos);
        pos = offset;
    })
    .on('end', () => {
        if (pos !== size) {
            res.writeHead(400, { 'Content-Type': 'application/json;charset=utf-8' });
            res.end(`{ "error": "${http.STATUS_CODES[400]}" }`);
        }

        const user = users.find((user) => {
            return user.id === id;
        });

        const data = JSON.parse(buffer.toString());
        
        for (const key in data) {
            user[key] = data[key];
        }

        res.end('You Updated: ' + JSON.stringify(user));
    });
}

function handleDeleteReq(req, res) {
    const { pathname } = url.parse(req.url);
    const { query } = url.parse(req.url);
    const id = (query === null) ? undefined : parseInt(query.split('=')[1]);

    // Error Handler
    if (pathname !== '/user' || query == null) {
        res.writeHead(404, { 'Content-Type': 'application/json;charset=utf-8' });
        return res.end(`{ "error": "${http.STATUS_CODES[404]}" }`);
    }

    users.find((user, index) => {
        if (user.id === id) users.pop(index);
    });

    res.writeHead(204, { 'Content-Type': 'application/json;charset=utf-8' });
    res.end('{ User updated sucessfuly }');
}


// server listen
server.listen(port, host, () => {
    console.log(`Servidor rodando em http://${host}:${port}`);
})
