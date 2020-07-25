"use strict";


//set up
var fs = require('fs');
var express = require('express');
var path = require('path');

var app = express();


app.get('/', function(req, res){
  res.sendFile("C:/Users/Nagi Y/folder/thePetProject/temp.html");
});

console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
