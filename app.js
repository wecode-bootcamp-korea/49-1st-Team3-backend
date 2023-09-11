const app = require('express');
const http = require('http');
const cors = require('cors');
const typorm = require('typeorm');
const app = require('express');
const jwt = require('jsonwebtoken');

app = express();

const start = async() => {
    server.listen(8000, => console.log("server is listening on port 8000"))
} //서버를 시작합니다.
 
start ();