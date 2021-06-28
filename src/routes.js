"use strict";

const {healthcheck} = require('./controller/healthcheck');
const {register, login, deactived, changePassword} = require('./controller/credentials');
const {addPhoneNumber, addAddress, addProfilePicture} = require('./controller/profile');
const {auth} = require('./middleware/auth');
const {upload} = require('./middleware/multer');

module.exports = function (app) {
    app.get('/api/healthcheck', healthcheck); 

    app.post('/api/credentials/register', register);
    app.post('/api/credentials/login', login);
    app.delete('/api/credentials/de-actived', auth, deactived);
    app.put('/api/credentials/edit/password', auth, changePassword);

    app.post('/api/profile/edit/phone_number', auth, addPhoneNumber);
    app.post('/api/profile/edit/address', auth, addAddress);
    app.post('/api/profile/upload/avatar', auth, upload.single('profile_avatar'), addProfilePicture);


};