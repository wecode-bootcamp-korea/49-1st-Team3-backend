const http = require('http')
const express = require('express')
const cors = require('cors')
const { DataSource, LockNotSupportedOnGivenDriverError } = require('typeorm');
const { error } = require('console');
const app = express();
// const userService = require('./services/userService')
// const threads = require('./threadServices')
const jwt = require('jsonwebtoken')

app.use(cors());

const myDataSource = new DataSource({
  type: 'mysql', 
  host: '127.0.0.1', 
  port: 3306,
  username: 'root',
  password: '',
  database: 'wethreads'
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


app.post("/logIn", async (req, res) => {
  try {
      const me = req.body;
      const { email, password } = me;
      const userData = await myDataSource.query(`SELECT * FROM users WHERE email = ?`, [email]);
    if (userData == undefined) {
      console.log("error")
      return res.status(400).json("no user")
      } else {
      console.log("login successful")
      return res.status(200).json("login successful")
      }
    } catch(err) {
      console.log(err);
      res.status(400).json("error")
    }
  })

  const postCreation = app.post("/postCreation", async(req, res) => {
          const inputPost = req.body;
          const { user_id, content } = inputPost;
          const newPost = myDataSource.query(`INSERT INTO threads (user_id, content) VALUES (${user_id}, ${content})`)
          console.log("added successfully")
          return res.status(201).json("POST_CREATED");
  })
      
      

// const postCreation = app.post("/postCreation", async(req, res) => {
//   token user_id = req.header; 
  
//     if(!token) {
//       console.log(Error)
//     } else {
//       try {
//         const inputPost = req.body;
//         const { content, user_id } = inputPost;
//         const newPost = myDataSource.query(`INSERT INTO threads (user_id, content) VALUES (${user_id}, ${content})`)
//         console.log("added successfully")
//         return res.status(201).json("POST_CREATED");
//       } catch(error) {
//         console.log(error)
//       }})
    
//     }
    
  
  
    
   

const postDeletion = app.post("/postDeletion", async(req, res) => {
    const deleteId = req.body;
    const { id } = deleteId;
    const deletePost = await myDataSource.query(`DELETE FROM threads WHERE id = ${deleteId}`)
    return res.status(201).json("POST_DELETED");})

// const postList = app.get("/postList", async(req, res) => {
//   const listPost = await myDataSource.query(`SELECT * FROM threads`);
//   console.log("post_read_successfully");
//   return res.status(20122).json("POST_READ:", listPost);
// })


const postRead = app.post("/postRead", async(req, res) => {
    const postReadId = req.body;
    postReadId = postReadId.id;
    const readPost = await myDataSource.query(`SELECT * FROM threads WHERE id = '${postReadId}'`)
    return res.status(201).json("POST_READ");})

const postUpdate = app.post("/postUpdate", async(req, res) => {
    const postUpdateData = req.body;
    const { id, content } = postUpdateData
    const updatePost = await myDataSource.query(`UPDATE threads SET contents = '${content}' WHERE threads.id = '${id}'`);
    return res.status(201).json("THREADS_UPDATED");
})

// const postList = app.toString("appList", async(req, res) =>
//     const list = req.body;
//     const { title, content } = list
//     //그냥 표시


// )

// epd// //user services
// app.post("/signUp", userServices.signUp);

// thread services
// app.post("/postCreation", threadServices.postCreation);
// app.post("/postDeletion", threadServices.postDeletion);
// app.post("/postUpdate", threadServices.postUpdate)
// app.get("/postRead", threadServices.postRead)



// const jwt = require('jsonwebtoken');

// const me = req.body;
// const {email, password} = me;



// const validateToken = async (req, res, next) => {
//       try {
//         const token = req.headers.authorization;
//         if (!token) {
//           return res.status(401).json({ message: 'Unauthorized' });
//         }
//         const secretKey = 'secretKey'; 
//         jwt.verify(token, secretKey, (err, decoded) => {
//           if (err) {
//             return res.status(401).json({ message: 'Unauthorized' });
//           } else {
//             req.decoded = decoded;
//             next();
//           }
//         });
//       } catch (err) {
//         next(err);
//       }
//     };


// if(!decoded) {
//   console.log("token_invalid")
// } else {



// const token2 = jwt.sign({user_id}: user_id);
// const secretKey = jwt.sign({password} : password)
// const payLoader = jwt.verify(password, 'key')


// if (token == undefined) {
//   console.log("ERROR")
//   return res.status(401).json("UNAUTHORISED_ERROR");
//   throw error
// } 
