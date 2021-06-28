"use strict";

const db = require('../config/db');
const {generateCurrentTime} = require('../helpers/time');

exports.addPhoneNumber = async function (DTO, userDTO) {

    let query = `
        INSERT INTO user_detail (user_id, phone_number, created_at)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            phone_number = ?,
            updated_at = ?
    `

    let values = [
        userDTO.id, DTO.phone_number, generateCurrentTime(),
        DTO.phone_number, generateCurrentTime()
    ]

    return new Promise(function(resolve, reject) {
        db.query(query, values, function(error, rows, fields) {
            if (error) reject(error)
            resolve(rows);
        })
    })
}

exports.addAdress = async function (DTO, userDTO) {
    
    let query = `
        INSERT INTO user_detail (
            user_id, address, created_at
        )
        VALUES (
            ?,?,?
        )
        ON DUPLICATE KEY 
        UPDATE
            address = ?, updated_at = ?
    `

    let values = [
        userDTO.id, DTO.address, generateCurrentTime(),
        DTO.address, generateCurrentTime()
    ]

    return new Promise(function(resolve, reject) {
        db.query(query, values, function(error, rows, fields) {
            if (error) reject(error)
            resolve(rows);
        })
    })
}

exports.addProfilePicture = async function (DTO, userDTO) {

    let query = `
        INSERT INTO user_detail(
            user_id, avatar, created_at
        )
        VALUES(
            ?,?,?
        )
        ON DUPLICATE KEY
        UPDATE
            avatar = ?, updated_at = ?
    `

    let values = [
        userDTO.id, DTO.filename, generateCurrentTime(),
        DTO.filename, generateCurrentTime()
    ];
    
    return new Promise(function(resolve, reject) {
        db.query(query, values, function(error, rows, fields) {
            if (error) reject(error)
            resolve(rows);            
        })
    })
}