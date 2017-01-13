function makeUL () {
	var query = mysql_query("SELECT * FROM ToDoItem ORDER BY DueDate ASC");
	var a = document.createElement('ul');
	for  (var i = 0; i < query.length; i++) {
		var item = document.createElement('li');
		item.appendChild(document.createTextNode(query[i]));
		a.appendChild(item);
	}
	return a;
};
document.getElementById('list').appendChild(makeUL);

