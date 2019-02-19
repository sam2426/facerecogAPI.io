const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors=require('cors');
const knex = require('knex');

const image=require('./controllers/image');
const profile=require('./controllers/profile');
const signIn = require('./controllers/signIn');
const register = require('./controllers/register');

const db = knex({
    client: 'pg',
    version: '10.6',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '',
      database : 'smart_brain'
    }
  });

const app=express();

app.use(bodyParser.json());
app.use(cors());

const database={
    users:[
    {
        id : "123",
        name : "tom",
        email : "tom@gmail.com",
        password : "cookies",
        entries : 0,
        joined : new Date(),

    },
    {
        id : "124",
        name : "Dick",
        email : "dick@gmail.com",
        password : "tennis",
        entries : 0,
        joined : new Date(),

    }
],
login:[
    {
        id: "123",
        hash : '',
        email:'tom@gmail.com'
    }
    

]
}

app.get('/', (req,res)=>{ res.json(database.users); })

app.post('/signin',signIn.handleSignIn(db,bcrypt));

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', profile.handleProfile(db));

app.put('/image',(req,res)=>{image.handleImage(req,res,db)});

app.post('/imageurl',(req,res) => {image.handleApiCall(req,res)});

app.listen(3000);

