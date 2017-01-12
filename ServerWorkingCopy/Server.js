//Imports and stuff kinda
var express = require('express');
var url = require('url');
var http = require('http');
var fs = require('fs');
var mysql = require("mysql");
var util = require('util');


//Connected to database
var conToDb = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "webdata",
	database: "todo"
});
conToDb.connect(function(err){
	if(err){
		console.log("Error when connecting to the database");
		return;
	}
	console.log("Connection to database established");
});




//Old: The list!
//var todos=[];
//todos=readObject("./list.json");






//Starting da server
var app = express();
app.use(express.static(__dirname + "/client"));
//specify port:
var port=2345;
//create server app on specified port
http.createServer(app).listen(port);
//print to console that server started
console.log("[i] - Server listening on port " + port);










//When client requests todos:
app.get("/todos", function (req, res){
	//send back todos in json format
	var dataThing = [];
	conToDb.query('SELECT Id, Title, Completed, Priority FROM ToDoItem',function(err, rows){
		if(err) throw err;
		for (var i = 0; i< rows.length;i++){
			dataThing.push(rows[i]);
		}
		console.log(dataThing);
	});

	
	//res.end(JSON.stringify(data));
});

//When client adds todo to server:
app.get("/additem", function (req, res) {
//	console.log("[i] /additem");
	//make query from url
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	//var newId = conToDb.query('SELECT MAX(Id) FROM ToDoItem') + 1;

	
	//add item based on query 
	if(query["Title"]!==undefined) {
		var newItem={ Title : query["Title"],
			Priority : query["Priority"],
			//DueDate : query["DueDate"],
			Completed : query["Completed"]
		};
		conToDb.query('INSERT INTO ToDoItem SET ?', newItem, function(err, res){
			if(err) throw err;
			console.log("Last added ID: " + res.insertId)
		});
	}else{
		//if name is not defined, send back error
		res.end("Error: missing Title");
	}
});
//When the client deletes something from the todos
app.get("/deleteitem", function (req, res) {
//	console.log("[i] /deleteitem");
	//make query from url
	var url_parts=url.parse(req.url, true);
	var query = url_parts.query;

	if(query["Id"]!==undefined) {
		conToDb.query('DELETE FROM ToDoItem WHERE Id=?', query["Id"],function(err, res){
			if(err) throw err;
			console.log("Deleted: " + res.affectedRows + " rows");
		});
		res.redirect("/html/ToDoodleListPage.html");
	}else{
		//if name is not defined, send back error
		res.end("Error: missing Id");
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





//function ToDoItem(name, priority, dueDate, reminder, done, id){
//	this.name=name;
//	this.priority=priority;
//	this.dueDate=dueDate;
//	this.reminder=reminder;
//	this.done=done;
//	this.id=id;
//}
//function writeObject(fileName, object){









