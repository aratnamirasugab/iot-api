"use strict";

const {healthcheck} = require('../src/controller/healthcheck');
const {register, login, deactived} = require('../src/controller/credentials');
const {auth} = require('./middleware/auth');

module.exports = function (app) {
    app.get('/api/healthcheck', healthcheck); 

    app.post('/api/credentials/register', register);
    app.post('/api/credentials/login', login);

    app.delete('/api/credentials/de-actived', auth, deactived);

};