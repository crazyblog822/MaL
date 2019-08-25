const express = require('express');
const mongo =require('mongoose');
const body_parser = require('body-parser');
const route = require('./route');

mongo.connect("mongodb://localhost:27017/Users");
mongo.connection.on('connected', () => {
    console.log('connected');
});

var app= express();
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());
app.use('/user', route);
const port = 4000;
app.listen(port, () => {
console.log('app listens at port 4000');
});
