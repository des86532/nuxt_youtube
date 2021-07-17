import express from 'express'
import firebase from '../../plugins/firebase'
import svgCaptcha from 'svg-captcha' // 驗證碼
import bcrypt from 'bcrypt' // 加密
import jwt from 'jsonwebtoken'
import rp from 'request-promise'

const router = express.Router();
router.use(express.json())

let captchaCode;
const saltRounds = 10;

/*
  none
*/
router.get('/captcha', (req, res) => {
	const captcha = svgCaptcha.create();
  captchaCode = captcha.text
	
	res.type('svg');
	res.status(200).json({ code: 200, message: 'success', data: captcha.data });
});

/*
  account 帳號
*/
router.get('/checkAccount', (req, res) => {
  const { account } = req.query
  firebase.database().ref().child("users").child(account).get().then((snapshot) => {
    if (snapshot.exists()) {
      res.status(200).json({ code: 400, message: '帳號已存在' })
    } else {
      res.status(200).json({ code: 200, message: 'success', data: {} })
    }
  }).catch((error) => {
    res.status(200).json({ code: 999, message: error.message })
  });
})

/*
  account 帳號
  password 密碼
  verifyCode 驗證碼
  username 姓名
  email 信箱
*/
router.post('/register', (req, res) => {
  const { account, password, verifyCode, username, email } = req.body;
  if (verifyCode !== captchaCode) {
    return res.status(200).json({ code: 400, message: `驗證碼錯誤` })
  }

  // 加密
  const hashPassword = bcrypt.hashSync(password, saltRounds);

  firebase.database().ref(`users/${account}`).set({
    account,
    username,
    password: hashPassword,
    email,
    likeList: ''
  }).then(() => {
    res.status(200).json({ code: 200, message: 'success', data: {} })
  }).catch((error) => {
    res.status(200).json({ code: 999, message: error.message })
  })
})

/*
  account 帳號
  password 密碼
*/

// 設定密鑰
const SECRET = 'aaabbb'

router.post('/login', (req, res) => {
  const { account, password } = req.body
  // 驗證密碼
  firebase.database().ref().child("users").child(account).get().then((snapshot) => {
    if (snapshot.exists() && bcrypt.compareSync(password, snapshot.val().password)) {
      // 建立 Token
      const token = jwt.sign({ account: account.toString() }, SECRET, { expiresIn: '1h' })
      res.status(200).json({ code: 200, message: 'success', data: { token } })
    } else {
      res.status(200).json({ code: 400, message: '帳號密碼錯誤' })
    }
  }).catch((error) => {
    res.status(200).json({ code: 400, message: '帳號密碼錯誤' })
  });
})

// third party
router.post('/googleLogin', async (req, res) => {
  const { id_token } = req.body
  const { OAuth2Client } = require('google-auth-library')
  const client = new OAuth2Client('748419381762-0edvmckcmv5hf576m9ved8ccot05o35j.apps.googleusercontent.com');

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: '748419381762-0edvmckcmv5hf576m9ved8ccot05o35j.apps.googleusercontent.com',
    });
  }

  verify().then(async () => {
    // 拿到帳號個人信息
    let userInfo = await rp({
      method: 'get',
      url: `https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`,
    })

    userInfo = JSON.parse(userInfo)

    const payload = {
      account: `google_${userInfo.sub}`,
      username: userInfo.name,
      email: userInfo.email
    }

    const { account, username, email } = payload

    // 判定資料庫是否有此帳號，有就登入，沒有就註冊後登入
    const snapshot = await firebase.database().ref().child("users").child(account).get();

    const token = jwt.sign({ account: account.toString() }, SECRET, { expiresIn: '1h' })

    if (snapshot.exists()) {
      res.status(200).json({ code: 200, message: 'success', data: { token }})
    } else {
      firebase.database().ref(`users/${account}`).set({
        account,
        username,
        email,
        likeList: ''
      })
      res.status(200).json({ code: 200, message: 'success', data: { token }})
    }
  }).catch((err) => {
    res.status(400).json({ code: 998, message: err.message })
  });
})

module.exports = router