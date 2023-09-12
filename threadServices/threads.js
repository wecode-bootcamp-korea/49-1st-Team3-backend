const { DataSource } = require('typeorm');

const postCreation = async(req, res) => {
    const inputPost = req.body;
    const { content, users_id } = inputPost;
    const newPost = myDataSource.query(`INSERT INTO users (users_id, content) VALUES ('${users_id}', '${content}')`)
    return res.status(201).json("POST_CREATED");
}


const postDeletion = async(req, res) => {
    const deleteId = req.body;
    const { id } = deleteId;
    const deletePost = await myDataSource.query(`DELETE FROM threads WHERE id = '${deleteId}'`)
    return res.status(201).json("POST_DELETED");
}

const postRead = async(req, res) => {
    const postReadId = req.body;
    postReadId = postReadId.id;
    const readPost = await myDataSource.query(`SELECT * FROM posts WHERE id = '${postReadId}'`)
    return res.status(201).json("POST_READ");
}

const postUpdate = async(req, res) => {
    const postUpdateData = req.body;
    const { id, content } = postUpdateData
    const updatePost = await myDataSource.query(`UPDATE threads SET contents = '${content}' WHERE threads.id = '${id}'`);
    return res.status(201).json("THREADS_UPDATED");
}

module.exports = {
    postCreation,
    postUpdate,
    postDeletion,
    postRead
}



