const app = require('express');
const http = require('http');
const cors = require('cors');
const typorm = require('typeorm');
const app = require('express'); // express 다운로드
const jwt = require('jsonwebtoken'); // 로그인을 위한 확인
const morgan = require('morgan'); // morgan이 뭔지 알아야함

app = express();

app.post("/usercreation", ("./library/post"))
app.get("/null")




const start = async() => {
    server.listen(8000, => console.log("server is listening on port 8000"))
} //서버를 시작합니다.


myDataSource
 
start ();