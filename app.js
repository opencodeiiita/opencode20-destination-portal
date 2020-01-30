var Express=    require('express'),
	bodyparser= require('body-parser'),
	ejsLint=    require('ejs-lint');

var app=Express();
ejsLint("index.ejs","-d");
app.use('/decfiles',Express.static('decfiles'));
//this body-parser is included when POST request is used
app.use(bodyparser.urlencoded({extended:true}));

//my array/list of objects which stores the placesnode 
 var itemlist=[];
 
// 1st route-->index route
app.get("/",(req,res)=>{
	
	res.render("index.ejs",{itemlist:itemlist});	
	
});

//2nd route ->
app.get("/index/new",(req,res)=>{
	res.render("addplaceform.ejs");
});


//3rd route
app.post("/index/new",(req,res)=>{
	
	var newplace= {
		name : req.body.dstname,
		url  : req.body.imgurl
	};
	
	itemlist.push(newplace);
	res.redirect('/');
	
});

//4th route -->show route
app.get("/index/:id",(req, res)=>{
	
	dstplace.findById(req.params.id,(err,foundplace)=>{
		if(err){
		console.log(err);
	     }
	    else{
		 res.render("places_info.ejs",{place_id:foundplace});	
		}	
	});
});
	
//5th route ->
app.get("/login",(req,res)=>{
	res.render("login.ejs");
});

//6th route ->
app.get("/places_info",(req,res)=>{
	res.render("places_info.ejs");
});

//writing server listen route
app.listen(1112,()=> {
	console.log("server started");
});
