# IOT Smart Waterpot 

IOT Smart Waterpot is an IOT project of which helps people to simplify their plants watering process. This repository contains it's API

## Installation & Requirements :

- You should have your own : Raspberry, Arduino, Water pump and Soil Humidity Sensor
- Make sure Nodejs is installed on your computer/Raspberry we will stick to Nodejs version 10 LTS


## High Level Design
- Refer to this [Link](https://drive.google.com/file/d/1s24LmhADNQQq-smCoZ5xY6oFJUkGI9k9/view?usp=sharing)

## Diagrams 
- Sequence : TBA
- Class : [link](https://drive.google.com/file/d/11Ml4SSkM-8qtWuvpWOEQSd6d9xDKr-k9/view?usp=sharing)
- Activity : TBA

#
#
# API Documentation
# --- Healthcheck ---
## [GET] Healthcheck
Request :
- Method : GET
- Endpoint : `/api/healthcheck`
- Header :
    - Content-Type: application/json
    - Accept: application/json

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
        "message" : "string"
    }
}
```

# --- Credentials Section ---
## [POST] Register
Request :
- Method : POST
- Endpoint : `/api/register`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :
    
```json 
{
    "username" : "string",
    "email" : "string",
    "password" : "string"
}
```

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
        "message" : "string"
    }
}
```

## [POST] Login
Request :
- Method : POST
- Endpoint : `/api/login`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :
    
```json 
{
    "email" : "string",
    "password" : "string"
}
```

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
        "message" : "string",
        "token" : "string"
    }
}
```

## [DELETE] De-actived account
Request :
- Method : DELETE
- Endpoint : `/api/profile/de-actived`
- Header :
    - Authorization: "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json
- Body : 

```json
{
    "agree" : "boolean"
}
```

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
        "message" : "string"
    }
}
```

## [PUT] Change Password
Request :
- Method : PUT
- Endpoint : `/api/profile/edit/password`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json
- Body :
```json 
{
   "old_password" : "string",
   "new_password" : "string"
}
```

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
        "message" : "string"
    }
}
```

# --- User Section ---
## [GET] Profile Info
Request :
- Method : GET
- Endpoint : `/api/profile`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
        "name" : "string",
        "avatar" : "string",
        "joined_on" : "string",
        "email" : "string"
    }
}
```

## [POST] Add Profile Picture
Request :
- Method : POST
- Endpoint : `/api/profile/upload/avatar`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: multipart/form-data
- Form-Data :
```
{
    "avatar" : "filelocation"
} 
```

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
        "message" : "string"
    }
}
```


## [POST] Add Phone Number
Request :
- Method : POST
- Endpoint : `/api/profile/edit/phone_number`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json
- Body :
```json 
{
   "phone_number" : "string"
}
```

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
        "message" : "string"
    }
}
```

## [POST] Add Address
Request :
- Method : POST
- Endpoint : `/api/profile/edit/address`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json
- Body :
```json 
{
   "address" : "text"
}
```

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
        "message" : "string"
    }
}
```

# --- Plants Section ---
## [GET] Get Plant(s) Status
Request :
- Method : GET
- Endpoint : `/api/plants/status`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
        "message" : "string",
        "plant_status": {
            "plant-1" : {
                "humidity" : "number",
                "last watering" : "datetime"
            },
            "plant-2" : {
                "humidity" : "number",
                "last watering" : "datetime"
            },
            "plant-n" : {
                "humidity" : "number",
                "last watering" : "datetime"
            }
        }
    }
}
```

## [POST] Water the plant
Request :
- Method : POST
- Endpoint : `/api/plants/water/{number}`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
        "message" : "string"
    }
}
```

## [POST] Autopilot the plant
Request :
- Method : POST
- Endpoint : `/api/plants/water/auto/{number}`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json

Response :

```json 
{
    "code" : "number",
    "status" : "string",
    "data" : {
        "message" : "string"
    }
}
```