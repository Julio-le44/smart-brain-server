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
        connectionString: "postgres://smart_brain_iurm_user:FSgMW9IutPz7woe9QY4MHa3eEjNRxx04@dpg-cmk0h47qd2ns73bn2r2g-a/smart_brain_iurm",
        host : 'dpg-cmk0h47qd2ns73bn2r2g-a.oregon-postgres.render.com',
        port : 5432,
        user : 'smart_brain_iurm_user',
        password : 'FSgMW9IutPz7woe9QY4MHa3eEjNRxx04',
        database : 'smart_brain_iurm'
  }
})

const app = express();
app.use(express.json());
app.use(cors())

const port = process.env.PORT

app.get('/',(req, res) => {
    res.json('congrats on loading the page')
})
app.post('/signin', (req, res) => {handleSignin(req, res, bcrypt, db)})

app.post('/register', (req, res) => {handleRegister(req,res, bcrypt, db)})

app.get('/profile/:id', (req, res) => {handleProfile(req, res, db)})

app.put('/image', (req, res) => {handleImage(req, res, db)})

app.post('/imageUrl', (req, res) => {handleAPI(req,res)})

app.listen(port , () => {
    console.log(`app is running on port ${port}`)
})
