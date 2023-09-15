const http = require('http')
const express = require('express')
const cors = require('cors')
const { DataSource, LockNotSupportedOnGivenDriverError } = require('typeorm');
const { error } = require('console');
const app = express();
const jwt = require('jsonwebtoken')
const validateToken = require("./middleware/validateToken");

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
    server.listen(8001, () => console.log(`Server is listening on 8001`))
  } catch (err) { 
    console.error(err)
  }
}

start();

myDataSource.initialize().then(
    () => console.log("datasource initialized")
)

const userCreation = app.post("/signUp", async(req, res) => {
    const me = req.body;
    const { email, password, nickname, phoneNumber, birthday, profileImage } = me;
    const userData = await myDataSource.query(`INSERT INTO users (
        email, 
        password, 
        nickname, 
        phoneNumber, 
        birthday, 
        profileImage
      )
      VALUES (
        '${email}',
        '${password}', 
        '${nickname}',
        '${phoneNumber}',
        '${birthday}',
        '${profileImage}'
        )`)
        
        if (email == undefined || password == undefined || nickname == undefined || phoneNumber == undefined || birthday == undefined || profileImage == undefined) {
        console.log("KEY_ERROR");
        }
        console.log("USER_CREATED")
        return res.status(201).json({"message": "user created"})  
        }
    )


const logIn = app.post("/logIn", async (req, res) => {
  try {
          const inputSign = req.body;
          const { email, password } = inputSign;
          if (email === undefined || password === undefined) {
              const error = new Error("EMPTY_SPACE")
              error.statusCode = 400
              throw error
          }
          if (password.length === 0) {
            const error = new Error('잘못된 비밀번호 입니다.')
            error.statusCode = 400
            throw error
          }
          const userCheckout = await myDataSource.query(`
          SELECT email, password FROM users WHERE email = "${email}"
          `);
          console.log("123",userCheckout);
          if (userCheckout.length === 0) {
              const error = new Error('잘못된 이메일 입니다.')
              error.statusCode = 400
              throw error
          }
          console.log("asdasdasd")
          const secretKey = 'your_secret_key'; // 비밀 키를 변경하세요
          const token = jwt.sign({ payloadKey: 'payloadValue' }, secretKey);
          console.log("message created")
           // 클라이언트에 응답
           return res.status(200).json({ "message": token });
        ;
        } catch (error) {
          console.error('로그인 오류 발생:', error);
          return res.status(500).json({
              error: '계정 또는 비밀번호를 확인해주세요.',
          });
      }
  })

const postCreation = app.post("/postCreation", async(req, res) => {
    try {      
      const me2 = req.headers.authorization;
      console.log(me2)
      const inputPost = req.body;
      const { user_id, content } = inputPost;
      const newPost = myDataSource.query(`INSERT INTO threads (user_id, content) VALUES (${user_id}, "${content}")`)
      console.log("added successfully");
      return res.status(201).json({"message": "POST_CREATED"});
  } catch(error){
    console.log(error);
    return res.status(400).json("POST_NOT_CREATED")
  }})
      
const postDeletion = app.post("/postDeletion", async(req, res) => {
  try {
    const deleteId = req.body.id;
    const deletePost = await myDataSource.query("DELETE FROM threads WHERE id = ?", [deleteId]);
    // const deletePost = await myDataSource.query(`DELETE FROM threads WHERE id = "${deleteId}"`);
    console.log("POST_DELETED");
    return res.status(201).json("POST_DELETED");
  } catch (error) {
    console.log(error);
    return res.status(400).json("POST_NOT_DELETED");
  }  
})

const postList = app.get("/postList", async(req, res) => {
  try {
  const updateProfileImage = await myDataSource.query(`UPDATE threads AS t JOIN users AS u ON t.user_id = u.id SET t.profileImage = u.profileImage;`);
  const listPost = await myDataSource.query(`SELECT * FROM threads`);
  console.log("post_read_successfully");
  return res.status(201).json({"POST_READ": listPost});                                                           
  } catch(error) {
    console.log(error);
  }
})

const postUpdate = app.put("/postUpdate", async(req, res) => {
  try {
    const postUpdateData = req.body;
    const { id, content } = postUpdateData;
    const updatePost = await myDataSource.query(`UPDATE threads SET content = '${content}' WHERE id = '${id}'`);
    console.log("UPDATED_SUCCESS_CONTENT: ",  content);
    return res.status(201).json({"UPDATED_THREADS: ": content});
  } catch(error) {
    console.log(error);
    return res.status(400).json("NOT_UPDATED");
}})  
  
// const postRead = app.post("/postRead", async(req, res) => {
//   try {
//     const postReadId = req.body;
//     postReadId = postReadId.id;
//     const readPost = await myDataSource.query(`SELECT * FROM threads WHERE id = '${postReadId}'`)
//     return res.status(201).json("POST_READ");}
//   catch(error) {
//     console.log(error)
//     return res.status(400).json("UNREAD")
//   }
// })



