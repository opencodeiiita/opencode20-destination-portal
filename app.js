var Express=    require('express'),
	bodyparser= require('body-parser'),
	ejsLint=    require('ejs-lint'),
	https=	    require('https');

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

//7th route ->
app.get("/api/:place",(req,res)=>{
	var key = process.env.API_KEY;
	https.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query='+req.params.place+'+point+of+interest&language=en&radius=2000&key='+key, (resp) => {
		let data = '';

		resp.on('data', (chunk) => {
			data += chunk;
		});

		resp.on('end', () => {
			places = JSON.parse(data).results;
			places.sort(function(a, b) { 
				return b.user_ratings_total - a.user_ratings_total;
			})
			res.render("api.ejs",{places:places});
		});
	}).on("error", (err) => {
		console.log("Error: " + err.message);
	});
});

//writing server listen route
app.listen(process.env.PORT,()=> {
	console.log("server started");
});
