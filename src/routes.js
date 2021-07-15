"use strict";

const {healthcheck} = require('./controller/healthcheck');
const {register, login, deactived, changePassword} = require('./controller/credentials');
const {addPhoneNumber, addAddress, addProfilePicture, getProfileInfo, getProfileAvatar} = require('./controller/profile');
const {getPlantsStatus} = require('./controller/plants');
const {auth} = require('./middleware/auth');
const {upload} = require('./middleware/multer');

module.exports = function (app) {
    
    app.get('/api/healthcheck', healthcheck); 

    app.post('/api/credentials/register', register);
    app.post('/api/credentials/login', login);
    app.delete('/api/credentials/de-actived', auth, deactived);
    app.put('/api/credentials/edit/password', auth, changePassword);

    app.get('/api/profile', auth, getProfileInfo);
    app.post('/api/profile/edit/phone_number', auth, addPhoneNumber);
    app.post('/api/profile/edit/address', auth, addAddress);
    app.get('/api/profile/download/avatar/:name', getProfileAvatar);
    app.post('/api/profile/upload/avatar', auth, upload.single('profile_avatar'), addProfilePicture);

    app.get('/api/plants/status', auth, getPlantsStatus);

};