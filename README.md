# agro_api

## This repo contains the source code of my submission

> Testing API

## Prerequisites

Before running the source code in the local environment,
You must fulfill the following prerequisites:

* Node installed in your local environment(mine is 12.16.1 version)
* npm installed (mine is 6.14.7)
* local Mongodb environment

If you cannot setup local Mongodb environment,then kindly opt for atlas mongodb

## Clone the repo

> `git clone https://github.com/kanhaiya-2000/agro_api.git`

Now navigate to the folder `agro_api`

## Setup .env file

Create a `.env` file and add it at the main route of project and add the following content in the file

```javascript
MONGOURI=<Your_mongodb_url>
```
If you can set your local mongodb ,you can use `mongodb://localhost:27017/agroapi` as the `MONGOURI`

## Install node_modules

> `npm install`

## Run the server

> `node index`

## Test the API

### Automatic testing

Install all dependencies and run `npx mocha` to test and see the server response when a report with given reportID is requested

To test the API manually,you may either use postman or anyother relevant comfortable tool
<a href="https://www.postman.com/downloads/">Download postman</a>

### Available API call

## * Create a new report

```bash
http://localhost:5000/reports
```
Make a post request to the server using above URL with the following JSON data as body to create a new report.
If report with the supplied marketID and cmdtyID exists already,then it will modify the `meanprice` and will update the user list

```javascript
{
"reportDetails": {
  "userID": "user-1",
  "marketID": "market-1",
  "marketName": "Mg road khagaria",
  "cmdtyID": "cmdty-1",
  "marketType": "Mandi",
  "cmdtyName": "Cabbage",
  "priceUnit": "Quintol",
  "convFctr": 100,
  "price": 1700
 }}
```
Response on postman will look like as shown in the below screenshot

<img src="https://i.imgur.com/soKQOs0.png"/>

similary we can make one more post request

```javascript
{
"reportDetails": {
  "userID": "user-2",
  "marketID": "market-1",
  "marketName": "Mg road khagaria",
  "cmdtyID": "cmdty-1",
  "marketType": "Mandi",
  "cmdtyName": "Cabbage",
  "priceUnit": "pack",
  "convFctr": 50,
  "price": 1800
 }}
 ```
 
 ## * Fetch reportdetail 
 
 Make a GET request to the server with `reportID` as a query
 
 Note the `reportID` from the above response and make this api call to fetch the report
 
 ```javascript
 http://localhost:5000/reports/?reportID={reportID_from_response_in_first_step}
 ```
 
 Response on postman will look like as shown in the below screenshot

<img src="https://i.imgur.com/MDIsTAc.png"/>

## Final notes

* Error checking has been applied to validate the data that user submit while creating a report
* The code follows MVC architecture
* Screenshots of Tests have been attached to verify the result
* mean price is calculated on-fly and is updated when a new user files the report about the same product of market.


