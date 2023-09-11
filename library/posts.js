
app.post("/posts/create", async(req, res) => {
    const newPost = req.body;
    const creationPostQuery = `INSERT INTO users (email, password, username) VALUES (?, ?, ?)`;
    newUser = await myDataSource.query(creationQuery, [email, password, usernmae]);
    res.status(201).json("POST_CREATED_SUCCESSFULLY");
})


app.delete("/posts/delete", async(req, res) => {
    const deletePost = req.body;
    const deletePostQuery = `DELETE posts WHERE VALUES (?)`;
    deletePostQuery = await (deletePostQuery, [post_id]);
    res.status(201).json("POST_DELETED_SUCCESSFULLY");
})

app.update("/posts/update", async(req, res) => {
    const updatePost = req.body;
    const updatePostQuery = `UPDATE users SET columns = change value WHERE requirement`;
    res.status(201).json("POST_DELETED_SUCCESSFULLY");
})



// 업데이트에 대해서 기능 구현을 심도있게 해봐야되겠음
// 쿼리문 같은 경우에는 변수가 직접적으로 들어올때 가독성이 높고 단순하게 처리가 가능함
// 단 업데이트와 같이 특정한 컬럼을 지정해서 들어오는 경우에는 코드의 가독성이 오히려 떨어질 수 있으며, 성명해서 출어주는게 좋다.
// 게시판은 업데이트를 구현하는게 핵심임
// 좋아요 클릭도 업데이트를 통해 구현해야함


