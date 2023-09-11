const http = require('http'); // http 프로토콜 사용
const cors = require('cors'); //cors에 대해 알아야함
const typorm = require('typeorm'); //typeorm에 대해 알아야함
const app = require('express'); // express 다운로드
const jwt = require('jsonwebtoken'); // 로그인을 위한 확인
const morgan = require('morgan'); // morgan이 뭔지 알아야함

app = express();

app.use(express.json());
app.use(morgan.dev());

appDataSource.initialize().then(() => {
    console.log("Datasource inialized!");
  });

app.post("/usercreation", ("./library/post"))
app.get("/null")




const start = async() => {
    server.listen(8000, => console.log("server is listening on port 8000"))
} //서버를 시작합니다.


myDataSource
 
start ();