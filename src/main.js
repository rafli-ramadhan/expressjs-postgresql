const express = require('express')
const app = express()
const morgan = require('morgan');
const cors = require('cors');

// enable env variable
require('dotenv').config()

// cors
app.use(cors());
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// route
require("./route")(app);

// database connection synchronously
require("./connection").sequelize.sync({ alter: true})

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}.`);
});
