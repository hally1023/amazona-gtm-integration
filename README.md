# Amazona ECommerce Website
![hally-amazona](/template/images/hally-amazona.jpg)

## Demo Website

- 👉 Heroku : [https://hally-amazona-app.herokuapp.com/](https://hally-amazona-app.herokuapp.com/)

## Run Locally

### 1. Clone Repo

```
$ git clone git@github.com:hally1023/paid-hally-amazona.git
$ cd paid-hally-amazona
```

### 2. At Root Folder

- Create .env file and copy and paste these codes:
  - JWT_SECRET=somethingsecret
  - PAYPAL_CLIENT_ID=<insert your paypal client id here>
- Here are instructions how to generate PayPal client ID: https://www.appinvoice.com/en/s/documentation/how-to-get-paypal-client-id-and-secret-key-22

### 3. Run Backend

```
# open new terminal
$ cd backend
$ npm install
$ npm start
```

### 4. Run Frontend

```
# open new terminal
$ cd frontend
$ npm install
```

### 5. Run Root Folder

```
# open new terminal
$ npm uninstall eslint
```

### 6. Run Frontend

```
$ npm start
```

### 7. Seed Users and Products

- Run this on chrome: http://localhost:5000/api/users
- It returns admin email and password
- Run this on chrome: http://localhost:5000/api/products
- It creates 6 sample products

### 6. Admin Login

- Run http://localhost:3000/signin
- Enter admin email and password and click signin

### 7. Enjoy the Website
