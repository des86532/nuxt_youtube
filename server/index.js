const express = require('express');

const app = express();

app.get('/thirdLogin', (req, res) => {
  res.send('123')
})

module.exports = {
  path: 'api',
  handler: app
};