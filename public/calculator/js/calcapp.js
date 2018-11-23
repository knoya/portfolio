var keys = document.querySelectorAll('.calculator span');
var opArr = ['x', '+', '-', '÷'];
var negArr = ['x', '+', '÷'];


// tests the screen string. if it hits a dot before hitting an operator 
//(or the end of the string), it returns true. once it hits an operator it returns false
function dotTester(screenString) { 
	for (var i = screenString.length-1; i >= 0; i--) {
		if (opArr.indexOf(screenString.charAt(i)) > -1) {
			return false;
			break;
		}
		else if (screenString.charAt(i) == ".") {
			return true;
			break;
		}
	}
}

// facilitates the use of the "lastchar" variable, which is used to check if operators and 
// periods can be placed. I put " " on both sides of operators when updating innerHTML 
// so I want to overlook the " " when doing those comparisons 
function truelastchar(screenString) {
	for (var i = screenString.length-1; i >= 0; i--) {
		if (screenString.charAt(i) == " ") {
			continue;
		}
		return screenString.charAt(i);
		break;
	}
}

for(var i = 0; i < keys.length; i++) { 
	keys[i].onclick = function(e) { // begin onclick functionality
		var input = document.querySelector('.screen'); // html in .screen will both store and display current equation
		var btnVal = this.innerHTML; // val of button you just clicked
		var lastchar = truelastchar(input.innerHTML); // returns last char of the current equation

		if (btnVal == "CE") { // blank out equation
			input.innerHTML="";
		}

		else if (btnVal == "=") {
			var equation = input.innerHTML;
			if (opArr.indexOf(lastchar) > -1) { //makes sure the last char isn't an operator when solving equation
				console.log("error message")
			}
			else {
				equation = equation.replace(/x/g, '*').replace(/÷/g, '/'); // regex to get usable string
				input.innerHTML = eval(equation); // solve
			}
		}

		else if (btnVal == ".") {
			if (lastchar == ".") { // can't do two .s in a row
				console.log("error message");
			}
			else if (dotTester(input.innerHTML) == true){ // returns true if you hit another . if you step backwards before you hit an operator
				console.log("error message");
			}
			else {
				input.innerHTML += btnVal;
			}
		}

		else if (btnVal == '-') { // separated - from the other operators to handle negative values
			if (lastchar == '-') {// block -- which would cause an error with eval()
				console.log("error message");
			}
			else {
				input.innerHTML += (" "+btnVal+" "); // add spacing around operators for aesthetics
			}
		}

		else if (negArr.indexOf(btnVal) > -1) {
			if (input.innerHTML == "") { // prevents operators from being the first thing on the screen
				console.log("error message");
			}

			else if (opArr.indexOf(lastchar) > -1) { // makes sure you're not doubling up operators
				console.log("error message");
			}
			else {
				input.innerHTML += (" "+btnVal+" "); // add spacing around operators for aesthetics
			}
			
		}

		else { // add anything else (numbers)
			input.innerHTML += btnVal;
		}
	};

};