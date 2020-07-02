const express = require("express");
const { sequelize } = require('./models');
const logger = require("morgan");
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const app = express();

require('dotenv').config();
const swaggerDoc = YAML.load('./apidocs/swagger.yaml');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(logger('dev'));
app.use('/', require('./routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.set('jwt-secret', process.env.JWT_SECRET);
app.set('refresh-secret', process.env.REFRESH_SECRET);
app.set('crypto-secret', process.env.CRYPTO_SECRET);

sequelize.sync();

app.listen(8000, () => {
    console.log("Server On");
});