const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const errorLogger = require('./utilities/errorlogger');
const requestLogger = require('./utilities/requestlogger');
const router = require('./routes/routing');
const create = require('./model/dbSetup');
const cors = require('cors')
let port = 1111;

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(requestLogger);
app.use( '/', router );
app.use(errorLogger);

router.get("/setupDB", (req, res, next) => {
    create.setupDB().then( response =>{
        if(response) res.json({ message : "Successfully inserted "+ response +" documents into database"})
    }).catch( error =>{
       next(error);
    })
});
router.get("/setupProducts",(req,res,next)=>{
    create.setupProducts().then(response=>{
        if(response) res.json({ message : "Successfully inserted "+ response +" products into database"})
    }).catch(error=>{
        next(error);
    })
})

var server = app.listen(port);
 console.log('Service started at ' + port);

module.exports = server;