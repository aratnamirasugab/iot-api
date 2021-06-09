"use strict";

const {healthcheck} = require('../src/controller/healthcheck')

module.exports = function (app) {
    app.get('/api/healthcheck', healthcheck); 
};