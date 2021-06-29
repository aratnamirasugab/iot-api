"use strict";

const multer = require('multer');
const fs = require('fs');

exports.upload = multer({
    storage : multer.diskStorage({
        destination : function (req, file, cb) {
            let destination = req.url.split('/');
            let customPath = './uploads/' + destination[2] + "/";
            fs.mkdirSync(customPath, { recursive : true });
            cb(null, customPath);
        },
        filename : function (req, file, cb) {
            let filename = req.user.id + "-" + file.fieldname + "-" + file.originalname.toLowerCase();
            req.body.filename = filename;
            cb(null, filename);
        }
    })    
});