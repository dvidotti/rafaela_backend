require('dotenv').config();

const bodyParser   = require('body-parser');
const express      = require('express');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const auth = require('./api/routes/auth')
const routes = require('./api/routes/routes')
const cookieParser = require('cookie-parser')
const errorHandler = require('./api/middleware/errorHandler')
const cors = require('cors')


mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors({
  origin: 'https://suspicious-pare-3d027e.netlify.app',
  credentials: true
}))


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// default value for title local
app.locals.title = 'Rafa Site Backend';


app.use('/', routes);
app.use("/auth", auth)



//error handl{er
app.use((err, req, res, next) => {
  let errors = errorHandler(err)
     res.send(errors)
})


module.exports = app;
