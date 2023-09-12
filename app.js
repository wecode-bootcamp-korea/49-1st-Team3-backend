const http = require('http')
const express = require('express')
const cors = require('cors')
const { DataSource }  = require("typeorm")
// database 정보를 이용해서 새로운 연결을 만든다
const userService = require("./services/userService")

const myDataSource = new DataSource ({
  // 연결을 할 수 있는 데이터 베이스를 준다
  type:'mysql',
  host: 'localhost',
  port: 3306,
  username:'root',
  password:'lhy',
  database: 'wethread'
})

const app = express();
app.use(cors());




app.use(express.json()) // for parsing application/json

app.get("/", async(req,res) => {
  try{
    return res.status(200).json("welcome!")
  } catch(error) {
    console.log(error);
  }
})

const server = http.createServer(app) // express app 으로 서버를 만듭니다.

const start = async () => { // 서버를 시작하는 함수입니다.
  try {
    server.listen(8000, () => console.log(`Server is listening on 8000`))
  } catch (err) { 
    console.error(err)
  }
}

start();
 
myDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!")
})

app.post("/logIn", userService.logIn)

// app.get("/posts")
// app.post("/signUp", userServise.signUp)  sooah
// app.post("/logIn", logIn)
