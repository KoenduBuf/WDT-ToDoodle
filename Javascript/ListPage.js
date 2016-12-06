

function addItemButton(){
	var newItem=new ToDoItem(document.getElementById("itemNameInput").value,3,12,true);
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(newItem.name));
	addToListWithID(li,"list1");
}





function ToDoItem(name, priority, dueDate, reminder){
	this.name=name;
	this.priority=priority;
	this.dueDate=dueDate;
	this.reminder=reminder;
}

function addToListWithID(li, idValue){
	var ul=document.getElementById(idValue);
	ul.appendChild(li);
}
function addToListWithClass(li, classValue){
	var ul=document.getElementsByClassName(classValue);
	ul.appendChild(li);
}




disList= new ItemList("disList");