const express = require('express');
const app = express();

const auth = require('./routes/auth');
const user = require('./routes/user');
const list = require('./routes/list');

app.use('/api', auth)
app.use('/api', user)
app.use('/api', list)

module.exports = {
  handler: app
};

/*
  # api success response
    - code
    - message
    - data

  # api error response
    - code
    - message

  
  ## api response code
    - 200: api response success
    - 400: api response error
    - 998: google api error
    - 999: firebase error
*/