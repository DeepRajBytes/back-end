const express = require('express');
 const app =  express(); 
 const port = 3000;

 app.get('/',(req,res)=>{
    res.send('connected done')
 });

 app.get('/user',(req,res)=>{
 
    res.send('hiiii')
 });

 app.listen(port,() => {
    console.log('http://localhost:',port);
 })