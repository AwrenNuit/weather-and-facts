const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const weatherRouter = require('./routes/weatherRouter');

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/weather', weatherRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});