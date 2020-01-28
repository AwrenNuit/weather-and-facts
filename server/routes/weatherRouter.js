const express = require('express');
const router = express.Router();

// GET weather from API
router.get('/', (req, res) => {
  let apiKey = process.env.API_KEY;
  axios.get(`https://api.darksky.net/forecast/${apiKey}/44.9778,-93.2650`)
  .then(response=>{
      res.send(response.data);
  })
  .catch(error=>{
    console.log('ERROR IN / GET ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

module.exports = router;