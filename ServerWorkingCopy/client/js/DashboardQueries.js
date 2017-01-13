





function dataIn () {
				var done = mysql_query("SELECT COUNT(*) FROM ToDoItem WHERE Completed=1");
				var total = mysql_query("SELECT COUNT(*) FROM ToDoItem");
				var notCompleted = total - done;
				return [done, notCompleted];
			};	
			var ctx = document.getElementById("myChart");
			var myChart = new Chart(ctx, {
			    type: 'pie',
			    data: {
				labels: ["Completed", "To Do"],
				datasets: [{
				    label: 'To Do Items Left To Do',
				    data: [12,5],
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
			});	









document.addEventListener('DOMContentLoaded', domloaded, false);
			function domloaded() {				
				function dataIn () {
				var done = mysql_query("SELECT COUNT(*) FROM ToDoItem WHERE Completed=1");
				var total = mysql_query("SELECT COUNT(*) FROM ToDoItem");
				var notCompleted = total - done;
				return [done, notCompleted];
				};	
				var ctx = document.getElementById("myChart");
				var myChart = new Chart(ctx, {
				    type: 'bar',
				    data: {
					labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
					datasets: [{
					    label: 'Number of tasks per month',
					    data: [1,6,2,9,23,7,2,5,8,3,5,2],
					    backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)',
						'rgba(74, 130, 98, 0.2)',
						'rgba(130, 126, 74, 0.2)',
						'rgba(106, 71, 123, 0.2)',
						'rgba(145, 99, 48, 0.2)',
						'rgba(68, 145, 48, 0.2)',
						'rgba(66, 48, 145, 0.2)'
					    ],
					    borderColor: [
						'rgba(255, 99, 132, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)',
					'rgba(74, 130, 98, 1)',
					'rgba(130, 126, 74, 1)',
					'rgba(106, 71, 123, 1)',
					'rgba(145, 99, 48, 1)',
					'rgba(68, 145, 48, 1)',
					'rgba(66, 48, 145, 1)'
				    ],
				    borderWidth: 1
				}]
			    },
			});	





