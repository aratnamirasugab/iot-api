const bcyrpt = require('bcrypt');
const saltRounds = process.env.SALT_ROUNDS || 8;

exports.hashPassword = async function (password) {
    return new Promise(function(resolve, reject){
        bcyrpt.hash(password, saltRounds, function(err, hash) {
            if (err) reject(err);
            resolve(hash);
        })       
    })
}

exports.comparePassword = async function (password, passFromDB) {
    return new Promise(function(resolve, reject) {
        bcyrpt.compare(password, passFromDB, function(err, result){
            if (err) reject(err);
            resolve(result);
        })
    })
}