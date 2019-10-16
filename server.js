const express = require('express');
const bodyParser = require('body-parser')
const cor = require('cors')
const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'postgres',
      database : 'codecamptest'
    }
  });
  

const app = express();

app.use(bodyParser.json());
app.use(cor())

app.post('/signin', (req, res) => {
    console.log('======hit signin=====')
    const {email, password} = req.body;
    
    db.select('email', 'password').from('users')
    .where({
        email: email,
        password: password
    })
    .then(() => {
        return db.select('*').from('users').then(data => {
            res.json(data)
        })

    })
})

app.post('/registor', (req, res) => {
    console.log('=====someone has been regist=======')

    const {firstname, lastname, email, password, description} = req.body;
    db('users')
    .returning('*')
    .insert({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        description: description
    })
    .then(data => {
        res.json(data[0])
    })
})


app.listen(3000, () => {
    console.log('server is running on PORT 3000')
})