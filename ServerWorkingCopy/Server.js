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
	conToDb.query('SELECT Id, Title, Completed, Priority FROM ToDoItem',function(err, rows){
		if(err) throw err;
		res.end(JSON.stringify(rows));
	});
});



//When client adds todo to server:
app.get("/additem", function (req, res) {
	console.log("[  INFO  ] /additem");
	//make query from url
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	
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
	console.log("[  INFO  ] /deleteitem");
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
	console.log("[  INFO  ] /modifyitem");
	//make query fro url
	var url_parts=url.parse(req.url, true);
	var query = url_parts.query;

	

	if(query["Id"]!==undefined) {


			if(query["Title"]!==undefined){

				conToDb.query('UPDATE ToDoItem SET Title = ? WHERE Id = ?',
					[query["Title"], query["Id"]],
					function(err, result){
						if(err) throw err;
						console.log('Changed: ' + result.changedRows + ' rows');
					}
				);

			}
			if(query["Priority"]!==undefined){

				conToDb.query('UPDATE ToDoItem SET Priority = ? WHERE Id = ?',
					[query["Priority"], query["Id"]],
					function(err, result){
						if(err) throw err;
						console.log('Changed: ' + result.changedRows + ' rows');
					}
				);

			}				
			if(query["DueDate"]!==undefined){

				conToDb.query('UPDATE ToDoItem SET DueDate = ? WHERE Id = ?',
					[query["DueDate"], query["Id"]],
					function(err, result){
						if(err) throw err;
						console.log('Changed: ' + result.changedRows + ' rows');
					}
				);

			}
			if(query["Completed"]!==undefined){

				conToDb.query('UPDATE ToDoItem SET Completed = ? WHERE Id = ?',
					[query["Completed"], query["Id"]],
					function(err, result){
						if(err) throw err;
						console.log('Changed: ' + result.changedRows + ' rows');
					}
				);

			}
			
		res.redirect("/html/ToDoodleListPage.html");
	} else {
		res.end("Error, no Id found when trying to modify");
	}

});

//app.get("/dashboard", function (req, res) {
//});

app.get("/dashAmountCompleted", function (req, res) {
	conToDb.query('SELECT SUM(CASE WHEN Completed=1 THEN 1 ELSE 0 END) AS CompletedNum, SUM(CASE WHEN Completed=0 THEN 1 ELSE 0 END) AS NotCompletedNum FROM ToDoItem'
		,function(err, rows){
		if(err) throw err;
		res.end(JSON.stringify(rows));
	});
});

app.get("/dashListOfDueDateNotCompleted", function (req, res) {
	conToDb.query('SELECT Title, DueDate FROM ToDoItem WHERE Completed=0 ORDER BY DueDate'
		,function(err, rows){
		if(err) throw err;
		res.end(JSON.stringify(rows));
	});
});

app.get("/dashNumberOfTaskPerMonth", function (req, res) {
	conToDb.query('SELECT MONTH(DueDate) AS Month, Count(*) AS Amount FROM ToDoItem GROUP BY MONTH(DueDate)'
		,function(err, rows){
		if(err) throw err;
		res.end(JSON.stringify(rows));
	});
});


//the queries from assignment 4 exercise 2
app.get("/query1", function (req, res) {
	conToDb.query('SELECT * FROM ToDoList WHERE Owner = 1'
		,function(err, rows){
		if(err) throw err;
		res.end(JSON.stringify(rows));
	});
});

app.get("/query2", function (req, res) {
	conToDb.query('SELECT * FROM ToDoItem WHERE ToDoListID = 1'
		,function(err, rows){
		if(err) throw err;
		res.end(JSON.stringify(rows));
	});
});

app.get("/query3", function (req, res) {
	conToDb.query('SELECT * FROM ToDoItem WHERE ToDoListID = 1 LIMIT 1,3'
		,function(err, rows){
		if(err) throw err;
		res.end(JSON.stringify(rows));
	});
});

app.get("/query4", function (req, res) {
	conToDb.query("SELECT * FROM ToDoItem WHERE ToDoListID = 1 AND Priority > 2 AND Completed = 1 AND CreationDate BETWEEN '2014/01/01' AND '2015/01/01' LIMIT 0,8"
		,function(err, rows){
		if(err) throw err;
		res.end(JSON.stringify(rows));
	});
});

app.get("/query5", function (req, res) {
	conToDb.query('SELECT * FROM ToDoItem WHERE ParentToDo IN (SELECT Id FROM ToDoItem           WHERE Id = 6)'
		,function(err, rows){
		if(err) throw err;
		res.end(JSON.stringify(rows));
	});
});

app.get("/query6", function (req, res) {
	conToDb.query('SELECT Text FROM Tag WHERE Id IN (SELECT TagId FROM ItemTag WHERE ToDoId IN (SELECT Id FROM ToDoItem WHERE Id = 1))'
		,function(err, rows){
		if(err) throw err;
		res.end(JSON.stringify(rows));
	});
});

app.get("/query7", function (req, res) {
	conToDb.query('SELECT * FROM ToDoList WHERE Id IN (SELECT ToDoListID FROM ToDoItem WHERE Id IN (SELECT ToDoId FROM ItemTag WHERE TagId IN (SELECT Id FROM Tag WHERE Id = 1 )))'
		,function(err, rows){
		if(err) throw err;
		res.end(JSON.stringify(rows));
	});
});

app.get("/query8", function (req, res) {
	conToDb.query('SELECT SUM(CASE WHEN Completed=1 THEN 1 ELSE 0 END) as Completed, SUM(CASE WHEN Completed=0 THEN 1 ELSE 0 END) as Not_Completed FROM ToDoItem WHERE Id IN (SELECT ToDoId FROM ItemTag WHERE TagId IN (SELECT Id  FROM Tag WHERE Id = 1 ))'
		,function(err, rows){
		if(err) throw err;
		res.end(JSON.stringify(rows));
	});
});

app.get("/query9", function (req, res) {
	conToDb.query('SELECT WEEK(CompletionDate), Count(*) FROM ToDoItem WHERE Completed=1 GROUP BY WEEK(CompletionDate)'
		,function(err, rows){
		if(err) throw err;
		res.end(JSON.stringify(rows));
	});
});

app.get("/query10", function (req, res) {
	conToDb.query('SELECT * FROM ToDoItem WHERE ToDoItem.Completed = 1 ORDER BY DATEDIFF(ToDoItem.CreationDate, ToDoItem.CompletionDate) DESC LIMIT 0,10'
		,function(err, rows){
		if(err) throw err;
		res.end(JSON.stringify(rows));
	});
});

app.get("/query11", function (req, res) {
	conToDb.query('SELECT T1.TagId As Tag1, T2.TagId AS Tag2, COUNT(*) FROM ItemTag AS T1 JOIN ItemTag AS T2 ON T1.ToDoId = T2.ToDoId WHERE T1.TagId < T2.TagId GROUP BY T1.TagId, T2.TagId'
		,function(err, rows){
		if(err) throw err;
		res.end(JSON.stringify(rows));
	});
});

app.get("/query12", function (req, res) {
	conToDb.query('SELECT AVG(datediff(ToDoItem.CompletionDate, ToDoItem.CreationDate)) AS DifferenceInDays FROM ToDoItem WHERE ToDoItem.Completed = 1 AND ToDoItem.ToDoListID = 1'
		,function(err, rows){
		if(err) throw err;
		res.end(JSON.stringify(rows));
	});
});

app.get("/query13", function (req, res) {
	conToDb.query('SELECT * FROM ToDoItem WHERE datediff(ToDoItem.CompletionDate, ToDoItem.CreationDate) > (SELECT AVG(datediff(ToDoItem.CompletionDate, ToDoItem.CreationDate)) AS DifferenceInDays FROM ToDoItem WHERE ToDoItem.Completed = 1 AND ToDoItem.ToDoListID = 1) AND ToDoItem.ToDoListID = 1'
		,function(err, rows){
		if(err) throw err;
		res.end(JSON.stringify(rows));
	});
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









