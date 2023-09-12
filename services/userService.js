const { json } = require('body-parser');
const { log } = require('console');
const { appendFile } = require('fs');
const { request } = require('http');
const { DataSource } = require('typeorm');


const myDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'lhy',
    database: 'wethread'
})

myDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!")
})
// sooah - signup
// hoyoung - login
// sw - createThread



const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)
        // 만약에 email password가 공란이면 
        if (email === undefined || password === undefined) {
            // error를 만들어서
            const error = new Error("공란입니다~")
            // error는 오류 코드 400이다
            error.statusCode = 400
            // error를 던져라
            throw error
        }

        const userCheckout = await myDataSource.query(`
        SELECT email, password FROM users WHERE email = "${email}" 
        `);

        if (userCheckout.length === 0) {
            const error = new Error('잘못된 이메일 입니다.')
            error.statusCode = 400
            throw error
        }


        console.log('사용자 정보!', userCheckout)

        return res.status(201).json({
            "message": "로그인 성공!"
        });

    } catch (error) {
        console.error('로그인 오류 발생:', error);
        return res.status(500), json({
            error: '계정 또는 비밀번호를 확인해주세요.',
        });
    }
}

// 다른 파일에서도 쓸 수 있게 만들어줌
module.exports = {
    logIn
}