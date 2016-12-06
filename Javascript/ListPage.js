/*	  Controllers	*/

function addItemButton(){
	var inputName=document.getElementById("itemNameInput").value;
	var inputDueDate=document.getElementById("dueDateInput").value;
	var inputPriority=document.getElementById("selectPriorityID").value;
	var inputReminder=document.getElementById("reminderCheckbox").checked;
	
	if(inputName && inputDueDate && inputPriority){
		var newItem=new ToDoItem(inputName,inputPriority,inputDueDate,inputReminder,false);
		if(!TheList.contains(newItem)){
			TheList.addItem(newItem);
			addToDoItemToTable(newItem, "tableList");
		}
		
	}
}



/*	  /Controllers	*/
/*		Classes		*/




function ToDoItemList(ListName){
	this.name=ListName;
	this.list=[];
	this.counter=0;
	this.addItem=function(Item){
		this.list[this.counter]=Item;
		this.counter=this.counter+1;
	}
	this.contains=function(Item){
		var i=this.counter-1;
		while(i>=0){
			if(Item.equals(this.list[i])){
				return true;
			}
			i--;
		}
		return false;
	}
}


function ToDoItem(name, priority, dueDate, reminder, done){
	this.name=name;
	this.priority=priority;
	this.dueDate=dueDate;
	this.reminder=reminder;
	this.done=done;
	this.equals=function(Other){
		if(this.name != Other.name){
			return false;
		}
		if(this.priority != Other.priority){
			return false;
		}
		if(this.dueDate != Other.dueDate){
			return false;
		}
		if(this.reminder != Other.reminder){
			return false;
		}
		if(this.done != Other.done){
			return false;
		}
		return true;
	}
}



/*		/Classes	*/
/*		Methods		*/



function addToDoItemToTable(ToDoI, idTableValue){
	var table=document.getElementById(idTableValue);
	var row=table.insertRow(1);
	var cell1=row.insertCell(0);
	var cell2=row.insertCell(1);
	var cell3=row.insertCell(2);
	var cell4=row.insertCell(3);
	var cell5=row.insertCell(4);
	cell1.innerHTML=ToDoI.name;
	cell2.innerHTML=ToDoI.dueDate;
	if(ToDoI.priority=="High"){
		cell3.className="red";
	}else if(ToDoI.priority=="Medium"){
		cell3.className="orange";
	}else if(ToDoI.priority=="Low"){
		cell3.className="green";
	}
	cell3.innerHTML=ToDoI.priority;
	if(ToDoI.reminder){
		cell4.className="green";
	}else{
		cell4.className="red";
	}
	cell4.innerHTML=ToDoI.reminder;
	if(ToDoI.done){
		cell5.className="green";
	}else{
		cell5.className="red";
	}
	cell5.innerHTML=ToDoI.done;
}


/*		/Methods	*/
/*		Fields		*/
TheList=new ToDoItemList("YourList");

/*		/Fields		*/