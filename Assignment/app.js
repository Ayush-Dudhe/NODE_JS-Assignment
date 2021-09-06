const express = require('express')
const path = require('path')
const bodyParser =require('body-parser')
const mongoose =require ('mongoose')
const User= require('./model/user')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const { ReturnDocument } = require('mongodb')
var databaseArray=[]
const app= express()
app.use('/', express.static(path.join(__dirname,'static')))
app.use(body, Parser.json()) 
////REGISTRATION API
app.post('/api/register', async (request, response)=>{
    //console.log(request.body)
    
    const{username,password :plainTextPassword ,email,number}= request.body
    //Checking for username already exits or not
    for(var i=0;i<databaseArray.length;i++)
    {
        if(databaseArray[i].username==username)
        {
            return response.json({ status:'error', error:'Username already exits'})
        }
    }
    if(!username||typeof username!=='string'){
        return response.json({ status:'error', error:'Invalid Username'})
    }
    if(!plainTextPassword||typeof plainTextPassword!=='string'){
        return response.json({ status:'error', error:'Invalid password'})
    }
    if(plainTextPassword.length<6){
        return response.json({ status:'error', error:'Password too small. Sholud be atleast 6 characters'})
    }
    if(!number||number.length!==10){
        return response.json({ status:'error', error:'Invalid mobile number'})
    }
    //Hashing  using 10 as salt
    const password = await bcrypt.hash(plainTextPassword,10)

    ////////TRYING ARRAY METHOD
    databaseArray.push({username,password ,email,number})
    //console.log(databaseArray)


    response.json({status: 'ok'})
})

app.listen(5000, function(request,response) {
    console.log("Running...")
})




