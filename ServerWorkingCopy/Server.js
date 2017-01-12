//Imports and stuff kinda
var express = require('express');
var url = require('url');
var http = require('http');
var fs = require('fs');


//The list!
var todos=[];
todos=readObject("./list.json");




		//Starting da server
var app = express();
app.use(express.static(__dirname + "/client"));
//specify port:
var port=2345;
//create server app on specified port
http.createServer(app).listen(port);
//print to console that server started
console.log("[i] - Server listening on port "+ port);










//When client requests todos:
app.get("/todos", function (req, res){
//	console.log("[i] /todos");
	//send back todos in json format
	res.json(todos);
});

//When client adds todo to server:
app.get("/additem", function (req, res) {
//	console.log("[i] /additem");
	//make query from url
	var url_parts=url.parse(req.url, true);
	var query = url_parts.query;
	var newId=todos.length+1;
	
	//add item based on query
	if(query["name"]!==undefined) {
		var newItem={ name : query["name"],
			id : newId,
			priority : query["priority"],
			dueDate : query["dueDate"],
			reminder : query["reminder"],
			done : false
		};
		todos.push(newItem);
		writeObject("./list.json",todos);
		console.log("[u] >>> added item "+newItem.id);
		res.json(todos);
	}else{
		//if name is not defined, send back error
		res.end("Error: missing name");
	}
});
//When the client deletes something from the todos
app.get("/deleteitem", function (req, res) {
//	console.log("[i] /deleteitem");
	//make query from url
	var url_parts=url.parse(req.url, true);
	var query = url_parts.query;

	if(query["id"]!==undefined) {
		todos=todos.filter(function(e){
			return e.id != query["id"];
		});
		writeObject("./list.json",todos);
		console.log("[u] >>> deleted "+query["id"]);
		res.redirect("/html/ToDoodleListPage.html");
	}else{
		//if name is not defined, send back error
		res.end("Error: missing id");
	}
});
//Modify a todo item
app.get("/modifyitem", function (req, res) {
	console.log("[i] /modifyitem");
	//make query fro url
	var url_parts=url.parse(req.url, true);
	var query = url_parts.query;
	var newTodos=[];

		
	if(query["id"]!==undefined) {
		for (var key=0; key<todos.length;key++){
			if(query["id"]==todos[key].id){
				if(query["name"]!==undefined){
					todos[key].name=query["name"];
				}
				if(query["priority"]!==undefined){
					todos[key].priority=query["priority"];
				}				
				if(query["dueDate"]!==undefined){
					todos[key].dueDate=query["dueDate"];
				}
				if(query["reminder"]!==undefined){
					todos[key].reminder=query["reminder"];
				}
				if(query["done"]!==undefined){
					todos[key].done=query["done"];
				}
			}
			var newItem=JSON.parse(JSON.stringify(todos[key]));
			console.log("modified stuff");
			newTodos.push(newItem);
			
		}
		todos=newTodos;
		writeObject("./list.json",todos);
		res.redirect("/html/ToDoodleListPage.html");
	}else{
		res.end("Error, no ID when trying to modify");
	}

});






function ToDoItem(name, priority, dueDate, reminder, done, id){
	this.name=name;
	this.priority=priority;
	this.dueDate=dueDate;
	this.reminder=reminder;
	this.done=done;
	this.id=id;
}	







function writeObject(fileName, object){
	//Open up a write stream to the file
	var writeStream = fs.createWriteStream(fileName);
	//write the object to the file in json format (does not do functions)	
//	console.log("[d] written: "+fileName);
	writeStream.write(JSON.stringify(object));
}

function readObject(fileName){
	//Open up a read stream to the file the object is in
	var content=fs.readFileSync(fileName);
	//puts the content in an object
//	console.log("[d] read: "+fileName);
	var object=JSON.parse(content);
	return object;
}





