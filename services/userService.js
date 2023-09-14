const { DataSource } = require('typeorm')

// database 정보를 이용해서 새로운 연결을 만들어줌. make connection using database information.

const myDataSource = new DataSource({
  // give db information for connection. 연결을 할 수 있는 데이터베이스 정보를 줌.
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'wethread'
})

myDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!")
})


const signUp = async (req, res) => {
  try {
    // 1. front request body에서 email과 password를 받아옴.
    const { email, password, nickname } = req.body;
    // console log로 email이랑 password 출력해서 잘 들어오는 지 확인하기
    console.log(email, password, nickname)
    // const newUser = await createUserInDatabase(email, password, name);
    if (nickname === undefined) {
      const error = new Error("input check plz");
      error.statusCode = 400;
      throw error;
    }
    const alreadySignUp = await myDataSource.query(`
        SELECT id, email FROM users WHERE email = '${email}'
      `)
      
    if (alreadySignUp.length > 0) {
      const error = new Error("input check plz");
      error.statusCode = 400;
      throw error;
    }

    // 이메일이 중복되면 에러가 뜨도록 함.
    // 데이터문을 이용해서 셀렉트문 가져오기. sql 수업자료 데이터 선택 하는 부분에서 특정 조건 거는 파트 찾아서 거기있는 문법 활용.


    // 2. 받아온 email과 password를 데이터베이스 INSERT INTO문으로 입력함.
    await myDataSource.query(`
    INSERT INTO users
     (email, password, nickname)
    VALUES 
    ('${email}', '${password}', '${nickname}');
    `)

    return res.status(201).json({
      "message": "회원가입 완성!"
    });


  } catch (error) {
    console.error('회원 가입 중 오류 발생:', error);
    return res.status(500).json({
      error: '서버 오류로 회원가입을 완료할 수 없습니다.',
    });

  }
}


// export function to enable 
module.exports = {
  signUp
}
