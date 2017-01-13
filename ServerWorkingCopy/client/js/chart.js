document.addEventListener('DOMContentLoaded', domloaded, false);
function domloaded() {	
	var dataIn = function( {
		var completed = mysql_query("SELECT COUNT(*) FROM ToDoItem WHERE Completed = 1");
		var total = mysql_query("SELECT COUNT(*) FROM ToDoItem");
		var notCompleted = total - completed;
		return [completed, notCompleted];
	});	

	var ctx = document.getElementById("myChart");
	var myChart = new Chart(ctx, {
	    type: 'pie',
	    data: {
		labels: ["Completed", "To Do"],
		datasets: [{
		    label: 'To Do Items Left To Do',
		    data: [12, 5],
		    backgroundColor: [
			'rgba(255, 99, 132, 0.2)',
			'rgba(54, 162, 235, 0.2)'
		    ],
		    borderColor: [
			'rgba(255,99,132,1)',
			'rgba(54, 162, 235, 1)'
		    ],
		    borderWidth: 1
		}]
	    },
	    options: {
		scales: {
		    yAxes: [{
			ticks: {
			    beginAtZero:true
			}
		    }]
		}
	    }
	});
};
