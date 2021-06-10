"use strict";

const db = require('../config/db');
const {generateCurrentTime} = require('../helpers/time');

exports.register = async function (DTO) {

    let query = "INSERT INTO user(email, password, name, created_at) values(?,?,?,?)"

    let values = [
        DTO.email, DTO.password, DTO.name, generateCurrentTime()
    ];

    return new Promise(function(resolve, reject) {
        db.query(query, values, function(error, rows, fields) {
            if (error) reject(error);
            resolve(rows);    
        });
    });
}

exports.checkUserByEmail = async function (DTO) {

    let query = "SELECT * FROM user WHERE email = ?";

    return new Promise(function(resolve, reject) {
        db.query(query, DTO, function(error, rows, fields){
            if (error) reject(error);
            resolve(rows);
        });
    });
}

exports.deactived = async function (userDTO) {

    let query = `
        UPDATE user
        SET
            deleted_at = ?,
            updated_at = ?
        WHERE
            email = ?
    `

    let values = [
        generateCurrentTime(), generateCurrentTime(), userDTO.email
    ];

    return new Promise(function(resolve, reject) {
        db.query(query, values, function(error, rows, fields) {
            if (error) reject(error);
            resolve(rows);    
        });
    });
}

exports.changePassword = async function (DTO, userDTO) {
    
    let query = `
        UPDATE user
        SET
            password = ?,
            updated_at = ?
        WHERE
            email = ?
    `

    let values = [
        DTO.new_password, generateCurrentTime(), userDTO.email
    ]

    return new Promise(function(resolve, reject) {
        db.query(query, values, function(error, rows, fields) {
            if (error) reject(error);
            resolve(rows);
        })
    })
}