

var refreshList = function(){
	"use strict";
	console.log("refreshList: refreshing list");

	var addTodosToList = function (todos){
		console.log("loading todos from server");
		for (var key in todos){
			addToDoItemToTable(todos[key], "tableList");
			//console.log(todos[key]);
		}
	};
	$.getJSON("../todos",addTodosToList)
		.error(function(jqXHR, textStatus, errorThrown){
			console.log("error "+textStatus);
			console.log("incommingText: "+jqXHR.responseText);
		});
};










//The function that is called when the add button is pressed
function addItemButton(){
	var inputTitle=document.getElementById("itemNameInput").value;
	var inputPriority=document.getElementById("selectPriorityID").value;

	if(inputName){
		window.location="../additem?Title="+inputTitle+"&Priority="+inputPriority+"&Completed=0";
	}
}

















//add a ToDoItem to a table
function addToDoItemToTable(ToDoI, idTableValue){
	//get table object
	var table=document.getElementById(idTableValue);
	//create a row
	var row=table.insertRow(1);
	//create all cells
	var cell1=row.insertCell(0);
	var cell2=row.insertCell(1);
	var cell3=row.insertCell(2);
	var cell4=row.insertCell(3);
	//var cell5=row.insertCell(4);
	var cell6=row.insertCell(4);
	var cell7=row.insertCell(5);
	var cell8=row.insertCell(6);


	//function:
	//get current date in yyyy-mm-dd format	
	//var getCurrentDate = function () {
	//	var currentDate = new Date();
	//	var month = currentDate.getMonth() + 1;
	//	return currentDate.getFullYear() + "-" + month  + "-" + currentDate.getDate();
	//}
	//function:
	//determine which date is earlier
	//var smallerDate = function(dueDate, today) {
	//	var resDue = dueDate.split("-");
	//	var resToday = today.split("-");
	//	if (resToday[2].charAt[1] == null) {
	//		resToday[2] = "0" + resToday[2];
	//	}
	//	if (resDue[0] < resToday[0]) {
	//		return true;
	//	} else if (resDue[1] < resToday[1]){
	//		return true;
	//	} else if (resDue[2] < resToday[2]) {
	//		return true;
	//	} else {
	//		return false;
	//	}		
	//}
	
	//create a button
	var doneButton = document.createElement("button");
	var t = document.createTextNode("Remove Item");
	doneButton.onclick=function(){		
		window.location="../deleteitem?id="+ToDoI.Id;
	}
	doneButton.appendChild(t);
	
	var editButton = document.createElement("BUTTON");
	var t2 = document.createTextNode("Edit Item");
	editButton.onclick=function() {
		var newName=prompt("What would you like as new title?");
		window.location="../modifyitem?id="+ToDoI.Id+"&Title="+newName;		
	}
	editButton.appendChild(t2);

	var box = document.createElement('input');
	box.type='checkbox';
	box.idName='boxId';
	


	//fill up cells 1 to 5 with proper 
	//names and give them classes for colors
	cell1.innerHTML=ToDoI.Title;
	//cell2.innerHTML=ToDoI.DueDate;
	//if(ToDoI.priority=="High"){
	//	cell3.className="red";
	//}else if(ToDoI.priority=="Medium"){
	//	cell3.className="orange";
	//}else if(ToDoI.priority=="Low"){
	//	cell3.className="green";
	//}
	cell3.innerHTML=ToDoI.Priority;
	//if(ToDoI.reminder){
	//	cell4.className="green";
	//}else{
	//	cell4.className="red";
	//}
	//cell4.innerHTML=ToDoI.reminder;
	//if(ToDoI.done){
	//	cell5.className="green";
	//}else{
	//	cell5.className="red";
	//}
	//if(smallerDate(ToDoI.dueDate, getCurrentDate())) {	
	//	cell2.className="red";
	//}
	//cell5.innerHTML=ToDoI.done;
	cell6.appendChild(doneButton);
	cell7.appendChild(editButton);
	cell8.appendChild(box);
}




//Refresh list when the page is loaded
$(document).ready(refreshList);
