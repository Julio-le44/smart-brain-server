import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcrypt';
import {handleSignin} from './controllers/signin.js';
import {handleRegister} from './controllers/register.js';
import {handleProfile} from './controllers/profile.js';
import {handleImage, handleAPI} from './controllers/image.js';
import { handleDeleteAcc } from './controllers/delete.js';

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.CONNECTION_STRING,
        host : process.env.DATABASE,
        port : 5432,
        user : process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE 
  }
})

const app = express();
app.use(express.json());
app.use(cors())

const port = 10000

app.get('/',(req, res) => {
    res.json('congrats on loading the page')
})
app.post('/signin', (req, res) => {handleSignin(req, res, bcrypt, db)})

app.post('/register', (req, res) => {handleRegister(req,res, bcrypt, db)})

app.get('/profile/:id', (req, res) => {handleProfile(req, res, db)})

app.put('/image', (req, res) => {handleImage(req, res, db)})

app.post('/imageUrl', (req, res) => {handleAPI(req,res)})

app.delete('/delete', (req, res) => {handleDeleteAcc(req,res,bcrypt,db)})

app.listen(port , () => {
    console.log(`app is running on port ${port}`)
})
