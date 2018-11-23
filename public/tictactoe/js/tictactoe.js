//var $ = require('jquery');

$(document).ready(function() {

	var howManyPlayers = 1;
	var player1Score = 0; 
	var player2Score = 0;
	var playerSym = "";
	var computerSym = "";
	var player1Sym = "";
	var player2Sym = "";
	var whosTurn = 1;
	var blocked = false; // prevents squares and reset button from being clicked while squares are being cleared
	var squares = ['.sq1', '.sq2', '.sq3', '.sq4', '.sq5', '.sq6', '.sq7', '.sq8', '.sq9'];
	var winArr = [['.sq1', '.sq2', '.sq3'], ['.sq4', '.sq5', '.sq6'], ['.sq7', '.sq8', '.sq9'], ['.sq1', '.sq4', '.sq7'], ['.sq2', '.sq5', '.sq8'], ['.sq3', '.sq6', '.sq9'], ['.sq1', '.sq5', '.sq9'], ['.sq3', '.sq5', '.sq7']];
	var cDone = false;

	//game setup
	$(".player1score").html("Player 1: " + player1Score);
	$(".player2score").html("Player 2: " + player2Score);


	//click handlers
	$('.oneplayer').on('click', function(e) {
		$('.gameselectscreen').stop().fadeOut(1000).delay(1000);
		$('.playerselectscreen').stop().delay(1000).fadeIn(1000);
		howManyPlayers = howManyPlayers;
		//somehow set the game to function for one player with AI
	})

	$('.twoplayer').on('click', function(e) {
		$('.gameselectscreen').stop().fadeOut(1000).delay(1000);
		$('.player1selectscreen').stop().delay(1000).fadeIn(1000);
		howManyPlayers = 2;
	})

	$('.playerselectx').on('click', function(e) {
		$('.playerselectscreen').stop().fadeOut(1000).delay(1000);
		$('.gameinprogress').stop().delay(1000).fadeIn(1000);
		$('.infopanel').stop().delay(1000).fadeIn(1000);
		$('.messagepanel').stop().delay(1000).fadeIn(1000);
		playerSym = "x";
		computerSym = "o";
		setTimeout(playerTurnBanner, 1000);
	})

	$('.playerselecto').on('click', function(e) {
		$('.playerselectscreen').stop().fadeOut(1000).delay(1000);
		$('.gameinprogress').stop().delay(1000).fadeIn(1000);
		$('.infopanel').stop().delay(1000).fadeIn(1000);
		$('.messagepanel').stop().delay(1000).fadeIn(1000);
		playerSym = "o";
		computerSym = "x";
		setTimeout(playerTurnBanner, 1000);
	})

	$('.player1selectx').on('click', function(e) {
		$('.player1selectscreen').stop().fadeOut(1000).delay(1000);
		$('.gameinprogress').stop().delay(1000).fadeIn(1000);
		$('.infopanel').stop().delay(1000).fadeIn(1000);
		$('.messagepanel').stop().delay(1000).fadeIn(1000);
		player1Sym = "x";
		computerSym = "x";
		player2Sym = "o";
		setTimeout(playerTurnBanner, 1000);
	})

	$('.player1selecto').on('click', function(e) {
		$('.player1selectscreen').stop().fadeOut(1000).delay(1000);
		$('.gameinprogress').stop().delay(1000).fadeIn(1000);
		$('.infopanel').stop().delay(1000).fadeIn(1000);
		$('.messagepanel').stop().delay(1000).fadeIn(1000);
		player1Sym = "o";
		player2Sym = "x";
		setTimeout(playerTurnBanner, 1000);
	})

	$('.back1').on('click', function(e) {
		$('.playerselectscreen').stop().fadeOut(1000).delay(1000);
		$('.gameselectscreen').stop().delay(1000).fadeIn(1000);
	})

	$('.back2').on('click', function(e) {
		$('.player1selectscreen').stop().fadeOut(1000).delay(1000);
		$('.gameselectscreen').stop().delay(1000).fadeIn(1000);
	})

	$('.resetbutton').on('click', function(e) {
		if (blocked == false) {
			resetButton();
		}
	})

	$('.square').on('click', function(e) {

		var clickedSquare = $(this);
		if (blocked == false) {
			if(clickedSquare.hasClass('ex') || clickedSquare.hasClass('oh')) {
				alert('This square is occupied, please select another');
			}
			else {
				if (whosTurn == 1 && howManyPlayers == 2) {
					if (player1Sym == "x") {
						clickedSquare.addClass('ex fa fa-times');
						if (checkWinner('ex')) {
							$('.winner').html("Player 1 wins!");
							$('.player1turn').stop().fadeOut(1000);
							$('.player2turn').stop().fadeOut(1000);
							$('.winner').stop().fadeIn(1000);
							$('.winner').delay(500).fadeOut(1000);
							whosTurn = 2;
							clearSquares();
							$('.gameinprogress').fadeIn(1000);
							setTimeout(playerTurnBanner, 3000);
							player1Score++;
							$(".player1score").html("Player 1: " + player1Score);
						}
						else if (drawDetector()) {
							$('.winner').html("It's a Draw!");
							$('.player1turn').stop().fadeOut(1000);
							$('.player2turn').stop().fadeOut(1000);
							$('.winner').stop().fadeIn(1000);
							$('.winner').delay(500).fadeOut(1000);
							whosTurn = 2;
							clearSquares();
							$('.gameinprogress').fadeIn(1000);
							setTimeout(playerTurnBanner, 3000);
						} 
						else {
							whosTurn = 2;
							playerTurnBanner();
						}
					}
					else if (player1Sym == "o") {
						clickedSquare.addClass('oh fa fa-circle-o');
						if (checkWinner('oh')) {
							$('.winner').html("Player 1 wins!");
							$('.player1turn').stop().fadeOut(1000);
							$('.player2turn').stop().fadeOut(1000);
							$('.winner').stop().fadeIn(1000);
							$('.winner').delay(500).fadeOut(1000);
							whosTurn = 2;
							clearSquares();
							$('.gameinprogress').fadeIn(1000);
							setTimeout(playerTurnBanner, 3000);
							player1Score++;
							$(".player1score").html("Player 1: " + player1Score);
						}
						else if (drawDetector()) {
							$('.winner').html("It's a Draw!");
							$('.player1turn').stop().fadeOut(1000);
							$('.player2turn').stop().fadeOut(1000);
							$('.winner').stop().fadeIn(1000);
							$('.winner').delay(500).fadeOut(1000);
							whosTurn = 2;
							clearSquares();
							$('.gameinprogress').fadeIn(1000);
							setTimeout(playerTurnBanner, 3000);
						} 
						else {
							whosTurn = 2;
							playerTurnBanner();
						}
					}
				}
				else if (whosTurn == 1 && howManyPlayers == 1) {
					if (playerSym == "x") {
						clickedSquare.addClass('ex fa fa-times');
						if (checkWinner('ex')) {
							$('.winner').html("Player 1 wins!");
							$('.player1turn').stop().fadeOut(1000);
							$('.player2turn').stop().fadeOut(1000);
							$('.winner').stop().fadeIn(1000);
							$('.winner').delay(500).fadeOut(1000);
							whosTurn = 3;
							clearSquares();
							$('.gameinprogress').fadeIn(1000);
							setTimeout(playerTurnBanner, 3000);
							player1Score++;
							$(".player1score").html("Player 1: " + player1Score);
						}
						else if (drawDetector()) {
							$('.winner').html("It's a Draw!");
							$('.player1turn').stop().fadeOut(1000);
							$('.player2turn').stop().fadeOut(1000);
							$('.winner').stop().fadeIn(1000);
							$('.winner').delay(500).fadeOut(1000);
							whosTurn = 3;
							clearSquares();
							$('.gameinprogress').fadeIn(1000);
							setTimeout(playerTurnBanner, 3000);
						} 
						else {
							whosTurn = 3;
							playerTurnBanner();
						}
					}
					else if (playerSym == "o") {
						clickedSquare.addClass('oh fa fa-circle-o');
						if (checkWinner('oh')) {
							$('.winner').html("Player 1 wins!");
							$('.player1turn').stop().fadeOut(1000);
							$('.player2turn').stop().fadeOut(1000);
							$('.winner').stop().fadeIn(1000);
							$('.winner').delay(500).fadeOut(1000);
							whosTurn = 3;
							clearSquares();
							$('.gameinprogress').fadeIn(1000);
							setTimeout(playerTurnBanner, 3000);
							player1Score++;
							$(".player1score").html("Player 1: " + player1Score);
						}
						else if (drawDetector()) {
							$('.winner').html("It's a Draw!");
							$('.player1turn').stop().fadeOut(1000);
							$('.player2turn').stop().fadeOut(1000);
							$('.winner').stop().fadeIn(1000);
							$('.winner').delay(500).fadeOut(1000);
							whosTurn = 3;
							clearSquares();
							$('.gameinprogress').fadeIn(1000);
							setTimeout(playerTurnBanner, 3000);
						} 
						else {
							whosTurn = 3;
							playerTurnBanner();
						}
					}
				}
				else if (whosTurn == 2) {
					if (player2Sym == "x") {
						clickedSquare.addClass('ex fa fa-times');
						if (checkWinner('ex')) {
							$('.winner').html("Player 2 wins!");
							$('.player1turn').stop().fadeOut(1000);
							$('.player2turn').stop().fadeOut(1000);
							$('.winner').stop().fadeIn(1000);
							$('.winner').delay(500).fadeOut(1000);
							whosTurn = 1;
							clearSquares();
							$('.gameinprogress').fadeIn(1000);
							setTimeout(playerTurnBanner, 3000);
							player2Score++;
							$(".player2score").html("Player 2: " + player2Score);
						}
						else if (drawDetector()) {
							$('.winner').html("It's a Draw!");
							$('.player1turn').stop().fadeOut(1000);
							$('.player2turn').stop().fadeOut(1000);
							$('.winner').stop().fadeIn(1000);
							$('.winner').delay(500).fadeOut(1000);
							whosTurn = 1;
							clearSquares();
							$('.gameinprogress').fadeIn(1000);
							setTimeout(playerTurnBanner, 3000);
						} 
						else {
							whosTurn = 1;
							playerTurnBanner();
						}
					}
					else if (player2Sym == "o") {
						clickedSquare.addClass('oh fa fa-circle-o');
						if (checkWinner('oh')) {
							$('.winner').html("Player 2 wins!");
							$('.player1turn').stop().fadeOut(1000);
							$('.player2turn').stop().fadeOut(1000);
							$('.winner').stop().fadeIn(1000);
							$('.winner').delay(500).fadeOut(1000);
							whosTurn = 1;
							clearSquares();
							$('.gameinprogress').fadeIn(1000);
							setTimeout(playerTurnBanner, 3000);
							player2Score++;
							$(".player2score").html("Player 2: " + player2Score);
						}
						else if (drawDetector()) {
							$('.winner').html("It's a Draw!");
							$('.player1turn').stop().fadeOut(1000);
							$('.player2turn').stop().fadeOut(1000);
							$('.winner').stop().fadeIn(1000);
							$('.winner').delay(500).fadeOut(1000);
							whosTurn = 1;
							clearSquares();
							$('.gameinprogress').fadeIn(1000);
							setTimeout(playerTurnBanner, 3000);
						} 
						else {
							whosTurn = 1;
							playerTurnBanner();
						}
					}
				}
			}
		}
	})


//functions

	function checkWinner(player) {
		if ($('.sq1').hasClass(player) && $('.sq2').hasClass(player) && $('.sq3').hasClass(player)) {
			$('.sq1').addClass('winsq');
			$('.sq2').addClass('winsq');
			$('.sq3').addClass('winsq');
			return true;
		}
		else if ($('.sq4').hasClass(player) && $('.sq5').hasClass(player) && $('.sq6').hasClass(player)) {
			$('.sq4').addClass('winsq');
			$('.sq5').addClass('winsq');
			$('.sq6').addClass('winsq');
			return true;
		}
		else if ($('.sq7').hasClass(player) && $('.sq8').hasClass(player) && $('.sq9').hasClass(player)) {
			$('.sq7').addClass('winsq');
			$('.sq8').addClass('winsq');
			$('.sq9').addClass('winsq');
			return true;
		}
		else if ($('.sq1').hasClass(player) && $('.sq4').hasClass(player) && $('.sq7').hasClass(player)) {
			$('.sq1').addClass('winsq');
			$('.sq4').addClass('winsq');
			$('.sq7').addClass('winsq');
			return true;
		}
		else if ($('.sq2').hasClass(player) && $('.sq5').hasClass(player) && $('.sq8').hasClass(player)) {
			$('.sq2').addClass('winsq');
			$('.sq5').addClass('winsq');
			$('.sq8').addClass('winsq');
			return true;
		}
		else if ($('.sq3').hasClass(player) && $('.sq6').hasClass(player) && $('.sq9').hasClass(player)) {
			$('.sq3').addClass('winsq');
			$('.sq6').addClass('winsq');
			$('.sq9').addClass('winsq');
			return true;
		}
		else if ($('.sq1').hasClass(player) && $('.sq5').hasClass(player) && $('.sq9').hasClass(player)) {
			$('.sq1').addClass('winsq');
			$('.sq5').addClass('winsq');
			$('.sq9').addClass('winsq');
			return true;
		}
		else if ($('.sq3').hasClass(player) && $('.sq5').hasClass(player) && $('.sq7').hasClass(player)) {
			$('.sq3').addClass('winsq');
			$('.sq5').addClass('winsq');
			$('.sq7').addClass('winsq');
			return true;
		}
		else {
			return false;
		}
	}

	function clearSquares() {
		blocked = true;
		$('.gameinprogress').stop().delay(1500).fadeOut(1000, function() {
			for (i=0; i<squares.length; i++) {
				if ($(squares[i]).hasClass('ex') || $(squares[i]).hasClass('oh')) {
					$(squares[i]).removeClass('ex oh fa fa-times fa-circle-o winsq');
				}
			}
			blocked = false;
		});
	}

	function resetButton() {
		$('.gameinprogress').finish().fadeOut(1000);
		$('.infopanel').finish().fadeOut(1000);
		$('.messagepanel').finish().fadeOut(1000, function() {
			clearSquares();
			howManyPlayers = 1;
			player1Score = 0; 
			player2Score = 0;
			playerSym = "";
			player1Sym = "";
			player2Sym = "";
			whosTurn = 1;
			$(".player1score").html("Player 1: " + player1Score);
			$(".player2score").html("Player 2: " + player2Score);
			$(".player1turn").html("");
			$(".player2turn").html("");
		});
		$('.gameselectscreen').stop().delay(1000).fadeIn(1000);
	}

	function playerTurnBanner() {
		if (whosTurn == 1 && howManyPlayers == 2) {
			$('.player2turn').stop().fadeOut(250).delay(250);
			$(".player1turn").html("Go Player 1!");
			$('.player1turn').stop().delay(250).fadeIn(250);
		}

		else if (whosTurn == 1 && howManyPlayers == 1) {
			$('.player2turn').stop().fadeOut(250).delay(250);
			$(".player1turn").html("Go Player 1!");
			$('.player1turn').stop().delay(250).fadeIn(250);
		}

		else if (whosTurn == 2) {
			$('.player1turn').stop().fadeOut(250).delay(250);
			$(".player2turn").html("Go Player 2!");
			$('.player2turn').stop().delay(250).fadeIn(250);
		}

		else if (whosTurn == 3) {
			$('.player1turn').stop().fadeOut(250).delay(250);
			$(".player2turn").html("Computer's Turn");
			$('.player2turn').stop().delay(250).fadeIn(250);
			computerTurn();
		}
	}

	function drawDetector() {
		var count = 0;
		for (i=0; i<squares.length; i++) {
			if ($(squares[i]).hasClass('ex') || $(squares[i]).hasClass('oh')) {
				count++;
			}
		}
		if (count == 9) {
			return true;
		}
		else {
			return false;
		}
	}

	function computerTurn() {
		cDone = false;
		var oArr = [];
		var xArr = [];
		var emptyArr = [];
		//see what squares are occupied and by who
		for (i=0; i<squares.length; i++) {
			if ($(squares[i]).hasClass('ex')) {
				xArr.push(squares[i]);
			}
			else if ($(squares[i]).hasClass('oh')) {
				oArr.push(squares[i]);
			}
			else {
				emptyArr.push(squares[i]);
			}
		}

		if (computerSym == 'x') {
		//eliminate the arrays that have 'o' from contention
			var reducedMovesArr = eliminateUnusables(oArr);
			//console.log("reducedMovesArr: " + reducedMovesArr);
		//if there is a winning move available, put symbol on necessary square
			if (cDone == false) {
				winningMove(reducedMovesArr, xArr);
			}
			
		//eliminate the arrays that have 'x' from contention
			var reducedBlockArr = eliminateUnusables(xArr);
			//console.log("reducedBlockArr: " + reducedBlockArr);
		//if the other player has a winning move available, place symbol on blocking square
			if (cDone == false) {
				blockingMove(reducedBlockArr, oArr);
			}

			
		//if there are no winning moves available, put symbol on a random unoccupied square
			var availMoves = availableMoves();
			//console.log("Available computer moves: " + availMoves);
			if (cDone == false) {
				randomMove(availMoves);
			}
		}

		else if (computerSym == 'o') {
		//eliminate the arrays that have 'x' from contention
			var reducedMovesArr = eliminateUnusables(xArr);
			//console.log("reducedMovesArr: " + reducedMovesArr);
		//if there is a winning move available, put symbol on necessary square
			if (cDone == false) {
				winningMove(reducedMovesArr, oArr);
			}
			
		//eliminate the arrays that have 'o' from contention
			var reducedBlockArr = eliminateUnusables(oArr);
			//console.log("reducedBlockArr: " + reducedBlockArr);
		//if the other player has a winning move available, place symbol on blocking square
			if (cDone == false) {
				blockingMove(reducedBlockArr, xArr);
			}

			
		//if there are no winning moves available, put symbol on a random unoccupied square
			var availMoves = availableMoves();
			//console.log("Available computer moves: " + availMoves);
			if (cDone == false) {
				randomMove(availMoves);
			}
		}
	}

	function eliminateUnusables(arr) {
		var compareArr = winArr.slice();
		for (j=0; j<arr.length; j++) {
			var playerMove = arr[j];
			for (i=0; i<compareArr.length; i++) {
				var testArr = compareArr[i];
				var index = testArr.indexOf(playerMove);
				if (index > -1) {
					compareArr.splice(i, 1);
					i--;
				}
			}
		}
		return compareArr;
	}

	function availableMoves() {
		var availSquares = squares.slice();
		for (i=0; i<availSquares.length; i++) {
			if ($(availSquares[i]).hasClass("ex") || $(availSquares[i]).hasClass("oh")) {
				availSquares.splice(i, 1);
				i--;
			}
		}
		return availSquares;
	}

	function winningMove(arr, moveArr) {
		for (i=0; i<arr.length; i++) {
			var compareArr = arr[i];
			var noMatchArr = [];
			for (j=0; j<compareArr.length; j++) {
				if (moveArr.indexOf(compareArr[j]) == -1) {
					noMatchArr.push(compareArr[j]);
				}
			}
			if (cDone == true) {
				break;
			}

			else if (noMatchArr.length == 1) {
				var compMove = noMatchArr[0];
				console.log("computer move places symbol on " + compMove);
				cDone = true;
				if (computerSym == "x") {
					setTimeout(function() {
						$(compMove).addClass("ex fa fa-times");
						console.log("adding win ex fa fa-times class to " + compMove);
						checkWinner('ex');
						$('.winner').html("Computer wins!");
						$('.player1turn').stop().fadeOut(1000);
						$('.player2turn').stop().fadeOut(1000);
						$('.winner').stop().fadeIn(1000);
						$('.winner').delay(500).fadeOut(1000);
						whosTurn = 1;
						clearSquares();
						$('.gameinprogress').fadeIn(1000);
						setTimeout(playerTurnBanner, 3000);
						player2Score++;
						$(".player2score").html("Player 2: " + player2Score);
						cDone = true;
					}, 1000);
				}
				else if (computerSym == "o") {
					setTimeout(function() {
						$(compMove).addClass("oh fa fa-circle-o");
						console.log("adding win oh fa fa-circle-o class to " + compMove);
						checkWinner('oh');
						$('.winner').html("Computer wins!");
						$('.player1turn').stop().fadeOut(1000);
						$('.player2turn').stop().fadeOut(1000);
						$('.winner').stop().fadeIn(1000);
						$('.winner').delay(500).fadeOut(1000);
						whosTurn = 1;
						clearSquares();
						$('.gameinprogress').fadeIn(1000);
						setTimeout(playerTurnBanner, 3000);
						player2Score++;
						$(".player2score").html("Player 2: " + player2Score);
						cDone = true;
					}, 1000);
				}
			}
		}
	}

	function blockingMove(arr, moveArr) {
		for (i=0; i<arr.length; i++) {
			var compareArr = arr[i];
			var noMatchArr = [];
			for (j=0; j<compareArr.length; j++) {
				if (moveArr.indexOf(compareArr[j]) == -1) {
					noMatchArr.push(compareArr[j]);
				}
			}
			if (cDone == true) {
				break;
			}

			else if (noMatchArr.length == 1) {
				var compMove = noMatchArr[0];
				console.log("computer move places block symbol on " + compMove);
				cDone = true;
				if (computerSym == "x") {
					setTimeout(function() {
						$(compMove).addClass("ex fa fa-times");
						console.log("adding block ex fa fa-times class to " + compMove);
						if (drawDetector()) {
							$('.winner').html("It's a Draw!");
							$('.player1turn').stop().fadeOut(1000);
							$('.player2turn').stop().fadeOut(1000);
							$('.winner').stop().fadeIn(1000);
							$('.winner').delay(500).fadeOut(1000);
							whosTurn = 1;
							clearSquares();
							$('.gameinprogress').fadeIn(1000);
							setTimeout(playerTurnBanner, 3000);
						} 
						else {
							whosTurn = 1;
							playerTurnBanner();
						}
					}, 1000);
					
				}
				else if (computerSym == "o") {
					setTimeout(function() {
						$(compMove).addClass("oh fa fa-circle-o");
						console.log("adding block oh fa fa-circle-o class to " + compMove);
						if (drawDetector()) {
							$('.winner').html("It's a Draw!");
							$('.player1turn').stop().fadeOut(1000);
							$('.player2turn').stop().fadeOut(1000);
							$('.winner').stop().fadeIn(1000);
							$('.winner').delay(500).fadeOut(1000);
							whosTurn = 1;
							clearSquares();
							$('.gameinprogress').fadeIn(1000);
							setTimeout(playerTurnBanner, 3000);
						} 
						else {
							whosTurn = 1;
							playerTurnBanner();
						}
					}, 1000);
				}	
			}
		}
	}	

	function randomMove(arr) {
		var compMove = arr[Math.floor(Math.random()*arr.length)];
		console.log("computer move places symbol on " + compMove);
		cDone = true;
		if (computerSym == "x") {
			setTimeout(function() {
				$(compMove).addClass("ex fa fa-times");
				console.log("adding random ex fa fa-times class to " + compMove);
				if (drawDetector()) {
					$('.winner').html("It's a Draw!");
					$('.player1turn').stop().fadeOut(1000);
					$('.player2turn').stop().fadeOut(1000);
					$('.winner').stop().fadeIn(1000);
					$('.winner').delay(500).fadeOut(1000);
					whosTurn = 1;
					clearSquares();
					$('.gameinprogress').fadeIn(1000);
					setTimeout(playerTurnBanner, 3000);
				} 
				else {
					whosTurn = 1;
					playerTurnBanner();
				}
			}, 1000);
		}
		else if (computerSym == "o") {
			setTimeout(function() {
				$(compMove).addClass("oh fa fa-circle-o");
				console.log("adding random oh fa fa-circle-o class to " + compMove);
				if (drawDetector()) {
					$('.winner').html("It's a Draw!");
					$('.player1turn').stop().fadeOut(1000);
					$('.player2turn').stop().fadeOut(1000);
					$('.winner').stop().fadeIn(1000);
					$('.winner').delay(500).fadeOut(1000);
					whosTurn = 1;
					clearSquares();
					$('.gameinprogress').fadeIn(1000);
					setTimeout(playerTurnBanner, 3000);
				} 
				else {
					whosTurn = 1;
					playerTurnBanner();
				}
			}, 1000);
		}
	}
})