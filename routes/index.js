const express = require('express');
const axios = require('axios');

const router = express.Router();


router.get('/test', async (req, res, next) => {
  try {
    if (!req.session.jwt) {
      const tokenResult = await axios.post('http://localhost:8002/v1/token', {
        clientSecret: process.env.CLIENT_SECRET,
      });
      if (tokenResult.data && tokenResult.data.code === 200) {
        req.session.jwt = tokenResult.data.token;
      } else {
        return res.json(tokenResult.data);
      }
    }
    return res.json(result.data);
  } catch (err) {
    console.error(err);
    if (err.response.status == 419) {
      return res.json(error.response.data);
    }
    return next(err);
  }
});

module.exports = router;
