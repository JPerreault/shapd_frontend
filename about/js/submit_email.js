//Logic for landing page forms - simple script that calls on the action from the form (input.php) to insert data into the MySQLDB

//Form 1
$("#email_form1").submit(function() {

	//Validate the form	
	var email = document.getElementById("email1");
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if (!filter.test(email.value)) {
 	   $("#result1").html(""); 
		$("#result2").html("Please enter a valid email address");
  	  email.focus;
	} 
	else {
	//Post into DB
	$.post( $("#email_form1").attr("action"), $("#email_form1").serializeArray(), function(info) { $("#result1").html(""); $("#result2").html(info); $("#result3").html(""); $("#result4").html(info); document.										getElementById("result2").setAttribute("style","color:rgb(70,225,120); font-weight:bold;"); document.getElementById("result4").setAttribute("style","color:rgb(70,225,120); font-weight:bold;");} );
	}
});




//Form2

$("#email_form2").submit(function() {
	
	//Validate the form	
	var email = document.getElementById("email2");
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if (!filter.test(email.value)) {
 	   $("#result3").html(""); 
		$("#result4").html("Please enter a valid email address");
  	  email.focus;
	} 
	else {
	//Post into DB
	$.post( $("#email_form2").attr("action"), $("#email_form2").serializeArray(), function(info) { $("#result1").html(""); $("#result2").html(info); $("#result3").html(""); $("#result4").html(info); document.										getElementById("result2").setAttribute("style","color:rgb(70,225,120); font-weight:bold;"); document.getElementById("result4").setAttribute("style","color:rgb(70,225,120); font-weight:bold;");} );
	}
});


$(document).ready("#email_form1").submit( function() {
	return false;	
});

$(document).ready("#email_form2").submit( function() {
	return false;	
});
