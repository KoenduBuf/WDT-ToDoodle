function changeText2(){
	var itemNameInput = document.getElementById('itemNameInput').value;
	var node=document.createElement("LI");
	var textnode=document.createTextNode(itemNameInput);
	node.appendChild(textnode);
	document.getElementById("list1").appendChild(node);
}