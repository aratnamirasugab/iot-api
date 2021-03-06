# IOT Smart Waterpot 

IOT Smart Waterpot is an IOT project of which helps people to simplify their plants watering process. This repository contains it's API

## Installation & Requirements :

- You should have your own : Raspberry, Arduino, Water pump and Soil Humidity Sensor
- Make sure Nodejs is installed on your computer/Raspberry we will stick to Nodejs version 10 LTS


## Error that frequently happens when executing the code:
- message: 'Error: Permission denied, cannot open /dev/ttyACM0', Please change your USB access permission from terminal, because we're using Ubuntu as our development OS, here's the steps that you should be doing to fix the problem:
1. go to dir  /etc/udev/rules.d/
2. create file called 50-myusb.rules
3. add this line to the file and save
KERNEL=”ttyACM[0-9]*”,MODE=”0666″
4. restart your server
5. if problem persist, restart your computer and re-run the code

- Solution 2:
1. change permission on /dev/ttyACM0
2. $ sudo usermod -a -G <group_name> <username>
3. $ sudo chmod a+rw /dev/ttyACM0

usually ubuntu group name is dialout

## High Level Design
- Refer to this [Link](https://drive.google.com/file/d/1s24LmhADNQQq-smCoZ5xY6oFJUkGI9k9/view?usp=sharing)

## Diagrams 
- ERD : Refer to this [Link](https://dbdiagram.io/d/60ec3d994ed9be1c05c8b51d)

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
- Endpoint : `/api/credentials/register`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :
    
```json 
{
    "name" : "string",
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
- Endpoint : `/api/credentials/login`
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
- Endpoint : `/api/credentials/de-actived`
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
- Endpoint : `/api/credentials/edit/password`
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

# --- Profile Section ---
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
    "code": 200,
    "status": "OK",
    "data": {
        "message": "Successfully pull user's data info",
        "user_info": {
            "name": "I Wayan Bagus",
            "avatar": "http://localhost:3000/api/profile/download/avatar/4-profile_avatar-2021-02-28-172154.jpg",
            "joined_on": "2021-07-04T12:56:12.000Z",
            "email": "user1@gmail.com",
            "address": null,
            "phone_number": null
        }
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
    "profile_avatar" : "filelocation"
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

## [GET] Get profile picture
Request :
- Method : GET
- Endpoint : `/api/profile/download/avatar/:name`
- Header :
    - Authorization : "Bearer " + token
    - Content-Type: application/json
    - Accept: application/json

Response :

``Downloadable file```

or

```json 
{
    "code" : "500",
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
    "code": 200,
    "status": "OK",
    "data": {
        "message": {
            "Items": [
                {
                    "created_at": "23-07-2021 19:21:40",
                    "temperature": 25,
                    "user_email": "bot@gmail.com",
                    "soilHumidity": 326
                },
                {
                    "created_at": "23-07-2021 19:21:30",
                    "temperature": 25,
                    "user_email": "bot@gmail.com",
                    "soilHumidity": 325
                },
                {
                    "created_at": "23-07-2021 19:21:20",
                    "temperature": 25,
                    "user_email": "bot@gmail.com",
                    "soilHumidity": 325
                },
                {
                    "created_at": "23-07-2021 19:21:10",
                    "temperature": 25,
                    "user_email": "bot@gmail.com",
                    "soilHumidity": 326
                },
                {
                    "created_at": "23-07-2021 19:21:00",
                    "temperature": 25,
                    "user_email": "bot@gmail.com",
                    "soilHumidity": 325
                },
                {
                    "created_at": "23-07-2021 19:20:50",
                    "temperature": 25,
                    "user_email": "bot@gmail.com",
                    "soilHumidity": 325
                },
                {
                    "created_at": "23-07-2021 19:20:40",
                    "temperature": 25,
                    "user_email": "bot@gmail.com",
                    "soilHumidity": 324
                },
                {
                    "created_at": "23-07-2021 19:20:30",
                    "temperature": 25,
                    "user_email": "bot@gmail.com",
                    "soilHumidity": 323
                },
                {
                    "created_at": "23-07-2021 19:20:20",
                    "temperature": 25,
                    "user_email": "bot@gmail.com"
                }
            ],
            "Count": 9,
            "ScannedCount": 9
        },
        "last_water": {
            "Items": [
                {
                    "user_email": "bot@gmail.com",
                    "created_at": "29-07-2021 19:24:20"
                },
                {
                    "user_email": "bot@gmail.com",
                    "created_at": "29-07-2021 19:23:43"
                },
                {
                    "user_email": "bot@gmail.com",
                    "created_at": "29-07-2021 19:23:36"
                },
                {
                    "user_email": "bot@gmail.com",
                    "created_at": "29-07-2021 19:23:22"
                },
                {
                    "user_email": "bot@gmail.com",
                    "created_at": "29-07-2021 19:22:59"
                }
            ],
            "Count": 5,
            "ScannedCount": 5
        }
    }
}
```

## [POST] Water the plant
Request :
- Method : POST
- Endpoint : `/api/plants/water`
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
- Endpoint : `/api/plants/water/auto`
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