import express from 'express'
import firebase from '../../plugins/firebase'
import jwt from 'jsonwebtoken'

const router = express.Router()
router.use(express.json())

const API_KEY = 'AIzaSyAqNjCDwR3gxEIrslaQkqih368n8OkpRo4'
const SECRET = 'aaabbb'

const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, SECRET, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }
          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
};

let likeList = ''

async function getLikeIds(userRef) {
  await userRef.once('value').then(function(snapshot) {
    likeList = snapshot.child('likeList').val()
  });
}

router.get('/updateFavoriteList', checkAuth, async (req, res) => {
  const { id } = req.query

  const userRef = firebase.database().ref(`users/${req.user.account}`);

  await getLikeIds(userRef)
  
  if (!likeList) {
    userRef.child('likeList').set(id).then(() => {
      res.status(200).json({ code: 200, message: 'success', data: {} })
    }).catch((error) => {
      res.status(200).json({ code: 999, message: error.message })
    })
  } else if (likeList.indexOf(id) > -1) {
    res.status(200).json({ code: 400, message: '影片已存在', data: {} })
  } else {
    userRef.child('likeList').set(`${likeList},${id}`).then(async () => {
      await getLikeIds(userRef)
      res.status(200).json({ code: 200, message: 'success', data: { likeList } })
    }).catch((error) => {
      res.status(200).json({ code: 999, message: error.message })
    })
  }
});

router.delete('/updateFavoriteList', checkAuth, async (req, res) => {
  const { id } = req.query

  const userRef = firebase.database().ref(`users/${req.user.account}`);

  await getLikeIds(userRef)
  
  if (!likeList) {
    res.status(200).json({ code: 400, message: '影片不存在', data: {} })
  } else if (likeList.indexOf(id) === -1) {
    res.status(200).json({ code: 400, message: '影片不存在', data: {} })
  } else {
    const listArray = likeList.split(',')
    listArray.splice(listArray.indexOf(id), 1).join(',')
    const newList = listArray.join(',')
    userRef.child('likeList').set(newList).then(async () => {
      await getLikeIds(userRef)
      res.status(200).json({ code: 200, message: 'success', data: {} })
    }).catch((error) => {
      res.status(200).json({ code: 999, message: error.message })
    })
  }
})

module.exports = router