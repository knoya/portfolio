/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports) {

	var keys = document.querySelectorAll('.calculator span'); // fetch all spans
	var opArr = ['x', '+', '-', '÷']; // compare input to pick out operator calls
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzQ1NjVmMTlmZTVlZTc3NzMxMjEiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2NhbGN1bGF0b3IvanMvc2NyaXB0LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9jYWxjdWxhdG9yL2pzL2NhbGNhcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0Esd0I7Ozs7OztBQ0FBLDBEQUF5RDtBQUN6RCxrQ0FBaUM7QUFDakM7OztBQUdBO0FBQ0E7QUFDQSxtQztBQUNBLHFDQUFvQyxRQUFRO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQW9DLFFBQVE7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBYyxpQkFBaUIsTztBQUMvQixpQ0FBZ0M7QUFDaEMsaURBQWdEO0FBQ2hELCtCQUE4QjtBQUM5QixnREFBK0M7O0FBRS9DLHdCQUF1QjtBQUN2QjtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1Q0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsK0RBQThEO0FBQzlELHNDQUFxQztBQUNyQztBQUNBOztBQUVBO0FBQ0EsMEJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSxpREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRCQUEyQjtBQUMzQiwwQkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0EseUNBQXdDO0FBQ3hDO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBK0I7QUFDL0I7QUFDQTs7QUFFQSw0Q0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0EseUNBQXdDO0FBQ3hDOztBQUVBOztBQUVBLFNBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUEsRyIsImZpbGUiOiJjYWxjdWxhdG9yRW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3NDU2NWYxOWZlNWVlNzc3MzEyMSIsInJlcXVpcmUoXCIuL2NhbGNhcHAuanNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvY2FsY3VsYXRvci9qcy9zY3JpcHQuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGtleXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FsY3VsYXRvciBzcGFuJyk7IC8vIGZldGNoIGFsbCBzcGFuc1xudmFyIG9wQXJyID0gWyd4JywgJysnLCAnLScsICfDtyddOyAvLyBjb21wYXJlIGlucHV0IHRvIHBpY2sgb3V0IG9wZXJhdG9yIGNhbGxzXG52YXIgbmVnQXJyID0gWyd4JywgJysnLCAnw7cnXTtcblxuXG4vLyB0ZXN0cyB0aGUgc2NyZWVuIHN0cmluZy4gaWYgaXQgaGl0cyBhIGRvdCBiZWZvcmUgaGl0dGluZyBhbiBvcGVyYXRvciBcbi8vKG9yIHRoZSBlbmQgb2YgdGhlIHN0cmluZyksIGl0IHJldHVybnMgdHJ1ZS4gb25jZSBpdCBoaXRzIGFuIG9wZXJhdG9yIGl0IHJldHVybnMgZmFsc2VcbmZ1bmN0aW9uIGRvdFRlc3RlcihzY3JlZW5TdHJpbmcpIHsgXG5cdGZvciAodmFyIGkgPSBzY3JlZW5TdHJpbmcubGVuZ3RoLTE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0aWYgKG9wQXJyLmluZGV4T2Yoc2NyZWVuU3RyaW5nLmNoYXJBdChpKSkgPiAtMSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHNjcmVlblN0cmluZy5jaGFyQXQoaSkgPT0gXCIuXCIpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG59XG5cbi8vIGZhY2lsaXRhdGVzIHRoZSB1c2Ugb2YgdGhlIFwibGFzdGNoYXJcIiB2YXJpYWJsZSwgd2hpY2ggaXMgdXNlZCB0byBjaGVjayBpZiBvcGVyYXRvcnMgYW5kIFxuLy8gcGVyaW9kcyBjYW4gYmUgcGxhY2VkLiBJIHB1dCBcIiBcIiBvbiBib3RoIHNpZGVzIG9mIG9wZXJhdG9ycyB3aGVuIHVwZGF0aW5nIGlubmVySFRNTCBcbi8vIHNvIEkgd2FudCB0byBvdmVybG9vayB0aGUgXCIgXCIgd2hlbiBkb2luZyB0aG9zZSBjb21wYXJpc29ucyBcbmZ1bmN0aW9uIHRydWVsYXN0Y2hhcihzY3JlZW5TdHJpbmcpIHtcblx0Zm9yICh2YXIgaSA9IHNjcmVlblN0cmluZy5sZW5ndGgtMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRpZiAoc2NyZWVuU3RyaW5nLmNoYXJBdChpKSA9PSBcIiBcIikge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXHRcdHJldHVybiBzY3JlZW5TdHJpbmcuY2hhckF0KGkpO1xuXHRcdGJyZWFrO1xuXHR9XG59XG5cbmZvcih2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7IFxuXHRrZXlzW2ldLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7IC8vIGJlZ2luIG9uY2xpY2sgZnVuY3Rpb25hbGl0eVxuXHRcdHZhciBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JlZW4nKTsgLy8gaHRtbCBpbiAuc2NyZWVuIHdpbGwgYm90aCBzdG9yZSBhbmQgZGlzcGxheSBjdXJyZW50IGVxdWF0aW9uXG5cdFx0dmFyIGJ0blZhbCA9IHRoaXMuaW5uZXJIVE1MOyAvLyB2YWwgb2YgYnV0dG9uIHlvdSBqdXN0IGNsaWNrZWRcblx0XHR2YXIgbGFzdGNoYXIgPSB0cnVlbGFzdGNoYXIoaW5wdXQuaW5uZXJIVE1MKTsgLy8gcmV0dXJucyBsYXN0IGNoYXIgb2YgdGhlIGN1cnJlbnQgZXF1YXRpb25cblxuXHRcdGlmIChidG5WYWwgPT0gXCJDRVwiKSB7IC8vIGJsYW5rIG91dCBlcXVhdGlvblxuXHRcdFx0aW5wdXQuaW5uZXJIVE1MPVwiXCI7XG5cdFx0fVxuXG5cdFx0ZWxzZSBpZiAoYnRuVmFsID09IFwiPVwiKSB7XG5cdFx0XHR2YXIgZXF1YXRpb24gPSBpbnB1dC5pbm5lckhUTUw7XG5cdFx0XHRpZiAob3BBcnIuaW5kZXhPZihsYXN0Y2hhcikgPiAtMSkgeyAvL21ha2VzIHN1cmUgdGhlIGxhc3QgY2hhciBpc24ndCBhbiBvcGVyYXRvciB3aGVuIHNvbHZpbmcgZXF1YXRpb25cblx0XHRcdFx0Y29uc29sZS5sb2coXCJlcnJvciBtZXNzYWdlXCIpXG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0ZXF1YXRpb24gPSBlcXVhdGlvbi5yZXBsYWNlKC94L2csICcqJykucmVwbGFjZSgvw7cvZywgJy8nKTsgLy8gcmVnZXggdG8gZ2V0IHVzYWJsZSBzdHJpbmdcblx0XHRcdFx0aW5wdXQuaW5uZXJIVE1MID0gZXZhbChlcXVhdGlvbik7IC8vIHNvbHZlXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZWxzZSBpZiAoYnRuVmFsID09IFwiLlwiKSB7XG5cdFx0XHRpZiAobGFzdGNoYXIgPT0gXCIuXCIpIHsgLy8gY2FuJ3QgZG8gdHdvIC5zIGluIGEgcm93XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiZXJyb3IgbWVzc2FnZVwiKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKGRvdFRlc3RlcihpbnB1dC5pbm5lckhUTUwpID09IHRydWUpeyAvLyByZXR1cm5zIHRydWUgaWYgeW91IGhpdCBhbm90aGVyIC4gaWYgeW91IHN0ZXAgYmFja3dhcmRzIGJlZm9yZSB5b3UgaGl0IGFuIG9wZXJhdG9yXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiZXJyb3IgbWVzc2FnZVwiKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpbnB1dC5pbm5lckhUTUwgKz0gYnRuVmFsO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGVsc2UgaWYgKGJ0blZhbCA9PSAnLScpIHsgLy8gc2VwYXJhdGVkIC0gZnJvbSB0aGUgb3RoZXIgb3BlcmF0b3JzIHRvIGhhbmRsZSBuZWdhdGl2ZSB2YWx1ZXNcblx0XHRcdGlmIChsYXN0Y2hhciA9PSAnLScpIHsvLyBibG9jayAtLSB3aGljaCB3b3VsZCBjYXVzZSBhbiBlcnJvciB3aXRoIGV2YWwoKVxuXHRcdFx0XHRjb25zb2xlLmxvZyhcImVycm9yIG1lc3NhZ2VcIik7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aW5wdXQuaW5uZXJIVE1MICs9IChcIiBcIitidG5WYWwrXCIgXCIpOyAvLyBhZGQgc3BhY2luZyBhcm91bmQgb3BlcmF0b3JzIGZvciBhZXN0aGV0aWNzXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZWxzZSBpZiAobmVnQXJyLmluZGV4T2YoYnRuVmFsKSA+IC0xKSB7XG5cdFx0XHRpZiAoaW5wdXQuaW5uZXJIVE1MID09IFwiXCIpIHsgLy8gcHJldmVudHMgb3BlcmF0b3JzIGZyb20gYmVpbmcgdGhlIGZpcnN0IHRoaW5nIG9uIHRoZSBzY3JlZW5cblx0XHRcdFx0Y29uc29sZS5sb2coXCJlcnJvciBtZXNzYWdlXCIpO1xuXHRcdFx0fVxuXG5cdFx0XHRlbHNlIGlmIChvcEFyci5pbmRleE9mKGxhc3RjaGFyKSA+IC0xKSB7IC8vIG1ha2VzIHN1cmUgeW91J3JlIG5vdCBkb3VibGluZyB1cCBvcGVyYXRvcnNcblx0XHRcdFx0Y29uc29sZS5sb2coXCJlcnJvciBtZXNzYWdlXCIpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlucHV0LmlubmVySFRNTCArPSAoXCIgXCIrYnRuVmFsK1wiIFwiKTsgLy8gYWRkIHNwYWNpbmcgYXJvdW5kIG9wZXJhdG9ycyBmb3IgYWVzdGhldGljc1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0fVxuXG5cdFx0ZWxzZSB7IC8vIGFkZCBhbnl0aGluZyBlbHNlIChudW1iZXJzKVxuXHRcdFx0aW5wdXQuaW5uZXJIVE1MICs9IGJ0blZhbDtcblx0XHR9XG5cdH07XG5cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9wdWJsaWMvY2FsY3VsYXRvci9qcy9jYWxjYXBwLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=