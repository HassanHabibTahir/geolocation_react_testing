require('./config/database')
const express = require('express');
const router = require('./routs/authRoute');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());    
app.use('/', router);

const port = process.env.PORT ||  8000;
// app.post('/yes', (req, res, next) => {
// console.log(req.body,'this is the object')
//   })
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})