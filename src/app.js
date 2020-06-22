const express = require("express");
const { sequelize } = require('./models');
const logger = requier("morgan");

const app = express();

require('dotenv').config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(logger('dev'));

app.set('jwt-secret', process.env.JWT_SECRET);

sequelize.sync();

app.listen(3000, () => {
    console.log("Server On");
});