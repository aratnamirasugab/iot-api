"use strict";

const {healthcheck} = require('../src/controller/healthcheck');
const {register, login, deactived, changePassword} = require('../src/controller/credentials');
const {auth} = require('./middleware/auth');

module.exports = function (app) {
    app.get('/api/healthcheck', healthcheck); 

    app.post('/api/credentials/register', register);
    app.post('/api/credentials/login', login);
    app.delete('/api/credentials/de-actived', auth, deactived);
    app.put('/api/credentials/edit/password', auth, changePassword);

};