# Passport JWT DEMO

Little demo of an API using Passport to authorize users via JWT

**NOTE** it requires a local MongoDB server running in order to work

## Commands

- Start server

```sh
$ npm start
```

- Inspect server

```sh
$ npm run inspect
```

## Endpoints

- Hello, World!

curl http://localhost:8080/hello

- Register user

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{ "name": "John Doe", "email": "johndoe@mail.com", "password": "123123123" }' \
  http://localhost:8080/api/users

  - Authenticate user

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{ "email": "johndoe@mail.com", "password": "123123123" }' \
  http://localhost:8080/api/users/auth

  - Retrieve user

curl --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTJjZGY5OTVlZjcxZjM0YmVlZjkxMGUiLCJpYXQiOjE2MzAzMzA3ODZ9.iB392GWxuA5WCwfN_bcy9h3E9mIpJQKxAW_KOEatrec" \
  http://localhost:8080/api/users