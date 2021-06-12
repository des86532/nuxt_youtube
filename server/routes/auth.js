import express from 'express'
import firebase from '../../plugins/firebase'
import svgCaptcha from 'svg-captcha' // 驗證碼
import bcrypt from 'bcrypt' // 加密
import jwt from 'jsonwebtoken'
// import request from 'request-promise';

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
    res.status(400).json({ code: 400, message: `驗證碼錯誤` }).end()
  }

  // 加密
  const hashPassword = bcrypt.hashSync(password, saltRounds);

  firebase.database().ref(`users/${account}`).set({
    username,
    password: hashPassword,
    email,
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
      const token = jwt.sign({ account: account.toString() }, SECRET, { expiresIn: '1 day' })
      res.status(200).json({ code: 200, message: 'success', data: { token } })
    } else {
      res.status(200).json({ code: 400, message: '帳號密碼錯誤' })
    }
  }).catch((error) => {
    res.status(200).json({ code: 999, message: error.message })
  });
})

// third party
router.post('/googleLogin', (req, res) => {
  const { token } = req.body
  const { OAuth2Client } = require('google-auth-library')
  const client = new OAuth2Client('748419381762-0edvmckcmv5hf576m9ved8ccot05o35j.apps.googleusercontent.com');

  async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '748419381762-0edvmckcmv5hf576m9ved8ccot05o35j.apps.googleusercontent.com',
    });
  }

  verify().then(() => {
    res.status(200).json({ code: 200, message: 'success', data: {} })
  }).catch((err) => {
    res.status(400).json({ code: 998, message: err.message })
  });
})

module.exports = router