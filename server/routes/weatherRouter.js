const express = require(`express`);
const router = express.Router();
const axios = require(`axios`);

// GET weather from API
router.get('/', (req, res) => {
  let apiKey = process.env.API_KEY;
  axios.get(`https://api.darksky.net/forecast/${apiKey}/44.9778,-93.2650`)
  .then(response=>{
      res.send(response.data.daily.data[0]);
  })
  .catch(error=>{
    console.log('ERROR IN / GET ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

router.get('/history', (req, res) => {
  axios.get(`http://history.muffinlabs.com/date`)
  .then(response=>{
      res.send(response.data.data.Events[0]);
  })
  .catch(error=>{
    console.log('ERROR IN /history GET ---------------------------------------->', error);
    res.sendStatus(500);
  });
});
module.exports = router;