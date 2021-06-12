const express = require('express');
const app = express();

const auth = require('./routes/auth');

app.use('/api', auth)

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