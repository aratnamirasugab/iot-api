"use strict";

const {healthcheck} = require('../src/controller/healthcheck');
const {register} = require('../src/controller/credentials');

module.exports = function (app) {
    app.get('/api/healthcheck', healthcheck); 

    app.post('/api/register', register);

};