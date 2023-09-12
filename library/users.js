
//user creation
app.post("/users", async(req, res) => {
    const newUser = req.body;
    const creationQuery = `INSERT INTO users (email, password, username) VALUES (?, ?, ?)`;
    newUser = await myDataSource.query(creationQuery, [email, password, usernmae]);

    const me = req.body;
    const {email, password} = me
    = await myDataSource.query('INSERT INTO users ')

    // 예외처리 해줘야함

    res.status(201).json("USER_CREATED_SUCCESSFULLY");
})

app.get("/signin", async(req, res) => {
    const signIn = req.body;
    const checkUser = `SELECT users FROM westagram`
    checkUser = await myDataSource.query(checkUser, [userName, email, password])

    const userId = {`password`: password}
    const payLoader = jwt.sign("WESTAGRAM");
    const token = jwt.verify(userId, payLoader);
    console.log(token)
})

// app.get("/signin", async(req, res) => {
//     const signIn = req.body;
//     const signIn = {email, password} 
//     const checkUser = `SELECT email FROM users WHERE`
//     checkUser = await myDataSource.query(checkUser, [userName, email, password])

//     const userId = {`password`: password}
//     const payLoader = jwt.sign("WESTAGRAM");
//     const token = jwt.verify(userId, payLoader);
//     console.log(token)
// })


// 예외 처리를 해줘야함