const http = require('http')
const express = require('express')
const cors = require('cors')
const userService = require("./services/userService")

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
 
app.post("/logIn", userService.logIn)

// app.get("/posts")
// app.post("/signUp", userServise.signUp)  sooah
// app.post("/logIn", logIn)
