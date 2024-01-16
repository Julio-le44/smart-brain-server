import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcrypt';
import {handleSignin} from './controllers/signin.js';
import {handleRegister} from './controllers/register.js';
import {handleProfile} from './controllers/profile.js';
import {handleImage, handleAPI} from './controllers/image.js';

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : 'PatriotsFan44',
        database : 'smart-brain'
  }
})

const app = express();
app.use(express.json());
app.use(cors())
console.log(process.env.PORT)
const PORT = process.env.PORT

app.get('/',(req, res) => {
    res.json('congrats on loading the page')
})
app.post('/signin', (req, res) => {handleSignin(req, res, bcrypt, db)})

app.post('/register', (req, res) => {handleRegister(req,res, bcrypt, db)})

app.get('/profile/:id', (req, res) => {handleProfile(req, res, db)})

app.put('/image', (req, res) => {handleImage(req, res, db)})

app.post('/imageUrl', (req, res) => {handleAPI(req,res)})

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})
