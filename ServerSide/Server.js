//Imports and stuff kinda
var express = require('express');
var url = require('url');
var http = require('http');
var fs = require('fs');





		//Starting da server
var app = express();
app.use(express.static(__dirname + "/.."));
//specify port:
var port=2345;
//create server app on specified port
http.createServer(app).listen(port);
//print to console that server started
console.log("[Info] - Server listening on port"+ port);




var todos = [];
var t1={a:"b",c:true,d:"kees"}
var t2={a:"c",c:false,d:"henk"}
todos.push(t1);
todos.push(t2);

app.get("/todos",function(req,res){
	console.log("todos requested");
	res.json(todos);
});









function writeObject(fileName, object){
	//Open up a write stream to the file
	var writeStream = fs.createWriteStream(fileName);
	//write the object to the file in json format (does not do functions)	
	console.log("[Debug] - Written to file: "+fileName);
	writeStream.write(JSON.stringify(object));
}

function readObject(fileName){
	//Open up a read stream to the file the object is in
	var content=fs.readFileSync(fileName);
	//puts the content in an object
	var object=JSON.parse(content);
	return object;
}



app.get("/getToDos",function(req, res){
	var object=readObject('./data/test.txt');
	console.log("[Test] - data = "+object.c+object.s);
});

app.get("/test",function (req, res){
	writeObject("./data/test.txt", someTestObject1);
});

