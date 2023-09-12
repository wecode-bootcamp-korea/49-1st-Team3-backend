const http = require('http')
const express = require('express')
const cors = require('cors')
const { DataSource } = require('typeorm');
const { error } = require('console');
const app = express();
const userService = require('./services/userService')
const threads = require('./threadServices')


app.use(cors());

const myDataSource = new DataSource({
  type: 'mysql', 
  host: '127.0.0.1', 
  port: 3306,
  username: 'root',
  password: '',
  database: 'wethread'
 })


app.use(express.json()) // for parsing application/json

app.get("/", async(req,res) => {
  try{
    return res.status(200).json("Welcome")
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

myDataSource.initialize().then(
    () => console.log("datasource initialized")
)
//user services
app.post("/signUp", userServices.signUp);

//thread services
app.post("/postCreation", threadServices.postCreation);
app.post("/postDeletion", threadServices.postDeletion);
app.post("/postUpdate", threadServices.postUpdate)
app.get("/postRead", threadServices.postRead)

