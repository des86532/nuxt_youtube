import express from 'express'
import firebase from '../../plugins/firebase'
import jwt from 'jsonwebtoken'

const router = express.Router();
router.use(express.json())

const SECRET = 'aaabbb'

const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, SECRET, (err, user) => {
          if (err) {
            return res.status(200).json({ code: 403, message: '權限不足', data: {} });
          }
          req.user = user;
          next();
      });
  } else {
    return res.status(200).json({ code: 401, message: '沒有身份', data: {} });
  }
};

router.get('/users', (req, res) => {
  firebase.database().ref().child("users").get().then((snapshot) => {
    res.status(200).json({ code: 200, message: 'success', data: snapshot.val() })
  }).catch((error) => {
    res.status(200).json({ code: 999, message: error.message })
  });
})

router.get('/user', checkAuth, (req, res) => {
  firebase.database().ref().child("users").child(req.user.account).get().then((snapshot) => {
    if (snapshot.exists()) {
      res.status(200).json({ code: 200, message: 'success', data: snapshot.val() })
    } else {
      res.status(200).json({ code: 400, message: '帳號不存在' })
    }
  }).catch((error) => {
    res.status(200).json({ code: 999, message: error.message })
  });
})

module.exports = router