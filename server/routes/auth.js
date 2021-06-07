import express from 'express';
import request from 'request-promise';

const router = express.Router();
router.use(express.json())

router.post('/login', (req, res) => {
  res.send('1231231234444');
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
    res.status(200).send('login success')
  }).catch((err) => {
    res.status(400).send(err)
  });
})

module.exports = router