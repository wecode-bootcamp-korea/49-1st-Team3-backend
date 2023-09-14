const jwt = require('jsonwebtoken')

const userCreation = ("/signUp", async(req, res) => {
    const me = req.body;
    const { email, password, nickname, phoneNumber, birthday, profileImage } = me;
    const userData = myDataSource.query(`INSERT INTO users (
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
        return res.status(201).json({"message": "user created"})
        })



const signIn = ("/signIn", async(req, res) => {
    try { 
        const payLoader = { password : 'password'}
        const secretKey = "IWANTTOSLEEP"
        const token = jwt.sign(payLoader, secretKey)
        console.log(token)
        console.log("SIGN_IN_SUCCESSFUL")
        return res.status(200).json("SIGN_IN_SUCCESSFUL")
        
        
    } catch (err) {

    }
})


