// Written by Nicholas Hussain 
// Inspired by https://github.com/profjake/APWJS_Final_Lab
// And isnpired by https://github.com/athoutam1/Restaurant-Reservation/tree/master/api

//var tracker = require("tracker");
const http = require("http");
const qString = require("querystring");
//this calls the let db={}; and instantiates the db for us
let dbManager = require('./dbManager');
let express = require("express");
let app = express();
const ObjectID = require('mongodb').ObjectId;
let bp = require('body-parser');

app.use(bp.urlencoded({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(bp.json())

let mongoose = require('mongoose');
mongoose.set('bufferCommands', false);
const resCol=require('./models/newRes')



function docifyRes(params){
    let doc = new resCol({ 
    firstName: params.firstName,
    lastName: params.lastName, 
    email: params.email,
    capacity: params.capacity
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
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const capacity = req.body.capacity;

    try{
        const makingNew = new docifyRes({firstName:firstName, lastName:lastName,email:email,capacity:capacity });
        makingNew.save()
        console.log(makingNew)
        //makingNew.save()
        res.redirect('/thankYou');
    }catch(e){
        console.log(e)
    }
  //  postData = '';
    // req.on('data', (data) =>{
	// postData+=data;
    // });
    // req.on('end', async ()=>{
    //     postParams = qString.parse(postData)
    //     console.log(postParams);
    //     try{
    //         // var curTracker = resCol.insert(
    //         //     postParams.name, 
    //         //     postParams.email,
	//         //     postParams.password, 
    //         //     postParams.capacity, 
    //         //     postParams.tableName
    //         // )
    //        // postParams.tableName
    //         let curDoc = docifyRes(postParams);
    //         await curDoc.save() 
    //         res.redirect('/thankYou')
    //     }catch(err){
    //         console.log(err)
    //     }
    // })
})
app.get('/thankYou', function(req,res){
    res.render('thankYou')
})

app.get('/view', function(req,res,next){
    res.render('view');
})
app.post('/view', async function(req,res){
    try{
    const searchID = req.body.email
    console.log(searchID)

    const reservations = await resCol.find({email:searchID}).exec();
    const docView = docifyRes(reservations)

    console.log(docView)


    res.render('view',{results: reservations})

    
    }catch(e){
        console.log(e)
    }

})
app.get('/Delete',function(req,res){
    res.render('Delete');
})
app.get('/manageRes', function(req,res){
    res.render('manageRes');
})

app.listen(6900, async ()=> {
    //start and wait for the DB connection
    try{
		await mongoose.connect('mongodb://localhost:27017/dbFinal', {useNewUrlParser: true, useUnifiedTopology: true })

		// await dbManager.get("practiceDB");
    } catch (e){
        console.log(e.message);
    }

    console.log("Server is running...");
});