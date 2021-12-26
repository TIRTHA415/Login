if( process.env.Node_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const bcrypt = require('bcrypt') 
const app = express()
const passport = require('passport') 
const flash = require( 'express-flash' )
const session = require('express-session')
require('./DB/connection')
const users = require('users')

console.log(user)

const initialize = require('./passportCon')
initialize(passport ,
     email => users.find(user => user.email === email ) ,
        id => users.find(user => user.id === id )

         )




app.set('view-engine' , 'ejs')
app.use(express.json())
app.use( express.urlencoded({ extended : false }))
app.use(flash())
app.use(session({
    secret : process.env.SESSION_SECRET ,
    resave : false ,
    saveUninitialized : false,
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/',(req , res )=> {
    res.render('index.ejs' , { name: 'Tirtha'})
})

app.get('/login',(req , res )=> {
    res.render('login.ejs' , { name: 'Tirtha'})
})

app.post('/login' ,  passport.authenticate('local' , {
        successRedirect : '/' ,
        failureRedirect : '/login',
        failureFlash : true
}))

app.get('/register',(req , res )=> {
    res.render('register.ejs' , { name: 'Tirtha'})
    
})

app.post('/register' , async (req , res)=> {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password , 10)

            users.name = req.body.name;
            users.email = req.body.email;
            users.password = hashedPassword;

        res.redirect('/login')
    }
    catch{
        res.redirect('/register')
    }
  console.log(users)
})

app.listen(3000)