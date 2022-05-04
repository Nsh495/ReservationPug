//var tracker = require("tracker");
var http = require("http");
var qString = require("querystring");
//this calls the let db={}; and instantiates the db for us
let dbManager = require('./dbManager');
let express = require("express");
let app = express();
var ObjectID = require('mongodb').ObjectId;
let bp = require('body-parser');

let mongoose = require('mongoose');
mongoose.set('bufferCommands', false);
var resCol=require('./models/newRes')


function docifyRes(params){
    let doc = new resCol({ 
    firstName: params.firstName,
    lastName: params.lastName, 
    email: params.email,
    capacity: params.capacity, 
    tableName: params.tableName
});
    return doc;
}


var postParams;

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function (req, res){
    res.render('layout')
});

app.get('/makeRes', function(req,res,next){
    res.render('makeRes')
});
app.post('/makeRes', function(req,res){
    postData = '';
    req.on('data', (data) =>{
	postData+=data;
    });
    req.on('end', async ()=>{
        postParams = qString.parse(postData)
        console.log(postParams);
        console.log(postParams.tableName)
        try{
            // var curTracker = resCol.insert(
            //     postParams.name, 
            //     postParams.email,
	        //     postParams.password, 
            //     postParams.capacity, 
            //     postParams.tableName
            // )
            postParams.tableName
            let curDoc = docifyRes(postParams);
            await curDoc.save() 
            res.redirect('/thankYou')
        }catch(err){
            console.log(err)
        }
    })
})
app.get('/thankYou', function(req,res){
    res.render('thankYou')
})
app.listen(6900, async ()=> {
    //start and wait for the DB connection
    try{
		await mongoose.connect('mongodb://localhost:27017/ResTest', {useNewUrlParser: true, useUnifiedTopology: true })

		// await dbManager.get("practiceDB");
    } catch (e){
        console.log(e.message);
    }

    console.log("Server is running...");
});