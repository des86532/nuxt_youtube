import express from 'express';
const router = express.Router();

router.post('/login', (req, res) => {
  res.send('12312312');
})

router.get('thirdLogin', (req, res) => {
  res.send('sdfsdfsdfsdf')
})

module.exports = router