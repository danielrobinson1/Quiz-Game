define(["elementID", "player1", "canvas", "question", "global", "timer", "scoring", "ball"], function(elementID, player1, canvas, question, global, timer, scoring, ball){	
	//Variables used to store return values of setInterval in game.startTick().
	var handleTickHold = '';		
	var countdownHold = '';
	var initialClick = 0;

	// Tasks to be performed when user first clicks the canvas to begin the game. 
	var begin = function() {
		if (hasNotBegun()) {
			ignoreFurtherMouseClicks();
			setPlayer1Dimensions();
			setBallDimensions();
			addEventListenerForMouseMovement();			
			startTick();
		}
	};
	
	// Returns true if player has not yet clicked the screen to begin the game, false otherwise.
	var hasNotBegun = function() {
		if (initialClick == 0) {
			return true;
		}
		else if (initialClick == 1) {
			return false;
		}
	};
	
	// Prevent further calls of game.begin() via clicking of the canvas.
	var ignoreFurtherMouseClicks = function() {
		initialClick = 1;
	};
	
	// Obtain the dimensions of the player1 image to be used for collision detection.
	var setPlayer1Dimensions = function() {
		global.playerOneHeight = global.playerOneImage.height;
		global.playerOneWidth = global.playerOneImage.width;		
	};
	
	// Obtain the dimensions of the player1 image to be used in collision detection.
	var setBallDimensions = function() {
		global.ballHeight = global.yellowBallImage.height;		
		global.ballWidth = global.yellowBallImage.width;	
	};
	
	// Add event listener to deal with movement of player1 by mouse.
	var addEventListenerForMouseMovement = function() {
		global.gameCanvas.addEventListener('mousemove',player1.setCoordinates, false);
	};
	
	// Tasks to be performed when the page is loaded in the browser.  
	var prepare = function() {
		elementID.setShorthands();
		setTextForInstructionsElement();
		canvas.setDimensions();
		canvas.setPlayer1Boundaries();
		player1.setImage();
		ball.setImage();
		displayStartScreenText();
		question.setAllAllowed();
	};

	// Set the text to be displayed in the 'instructions' div element.
	var setTextForInstructionsElement = function() {
		global.instructions.innerHTML = 
		"<p>Compatible with  Chrome v28, Internet Explorer v10, Firefox v27 and Opera v15</p>" + 
		"<p><strong>Instructions:</strong> Collect " + 
		global.targetToCollect + 
		" yellow to unlock a question. " + "Avoid the red!</p>";
	};
	
	// Display start screen text on the canvas.
	var displayStartScreenText = function() {
		global.gameCanvas.getContext("2d").font = "16px Arial";
		global.gameCanvas.getContext("2d").textBaseline = "center";
		global.gameCanvas.getContext("2d").textAlign = "center";
		global.gameCanvas.getContext("2d").fillText("Click screen to start new game",global.canvasWidth / 2,global.canvasHeight / 2);
	};
	
	//Pauses the game.
	var pause = function() {
		clearInterval(handleTickHold);
		clearInterval(countdownHold);
	};
	
	// Tasks to perform after player enters an answer to a question.
	var prepareForNextRound = function() {
		ball.removeAll();
		scoring.resetNoCollected();
		global.answerIncorrect.style.display="none";
		global.answerCorrect.style.display="none";
		global.questionContainer.style.display="none";
		canvas.clear();
		displayGetReadyScreen();
		scoring.displayScore();
		scoring.displayNoCollected();
		timer.display();
		setTimeout(startTick,2000);
	};
	
	// Display text 'Get Ready'.
	var displayGetReadyScreen = function() {
		global.gameCanvas.getContext("2d").font = "16px Arial";
		global.gameCanvas.getContext("2d").textBaseline = "center";
		global.gameCanvas.getContext("2d").textAlign = "center";
		global.gameCanvas.getContext("2d").fillText("Get Ready!",global.canvasWidth/2,global.canvasHeight/2);
	};
	
	// Start executing the function handleTick at the specified period of miliseconds. Start decreaseBy1Second timer.
	var startTick = function() {
		global.gameCanvas.style.cursor='none';
		handleTickHold = setInterval(handleTick,50);
		countdownHold = setInterval(timer.decreaseBy1Second,1000);
	};
	
	var handleTick = function () {
		
		// Increment ball position data.
		ball.obtainCurrentNumberOfBallsInPlay();
		ball.incrementYCoords();
		
		// Create new ball data.
		randomlyGenerateBallWithRandomSpeed();
		
		// Redraw graphics
		refreshDisplay();
		
		// Check for collsions.
		// Update noCollected.
		// Remove ball data.
		scoring.detectCollisions();
		
		// Check Game Over conditions.
		if (isGameOver()) 
		{
			endTheGame();
		}
		
		// Check if target number reached.
		if (isTargetReached()) 
		{
			refreshDisplay();		
	
			// Display question and update score.
			displayQuestionIfTargetReached();
		}
		
		// Used only when player1.draw takes the argument 'flash' in the first parameter.
		global.tickCounter++;
	};
	
	var refreshDisplay = function() {
		canvas.clear();
		ball.draw();
		player1.draw();
		scoring.displayScore();
		scoring.displayNoCollected();
		timer.display();
	};
	
	// Check whether target number has been collected and display question. 
	// Note it is actually possible for the variable scoring.noCollected to go over target 
	// if the final ball is collected together with another in quick succession.
	var displayQuestionIfTargetReached = function() {
		if (isTargetReached()) {
			// Check: Do we just need to update the noCollected and redisplay balls here?
			// Do we need game.pause()?
			pause();
			question.selectAndDisplayQuestion();
		}
	};
	
	// Create a ball with random speed (upto the value of global.ballSpeedLimit, 
	// on a given tick with probability specified by probabiiltyBallIsGenerated.
	var randomlyGenerateBallWithRandomSpeed = function() {
		
		var probability = global.probabilityBallIsGenerated;
		var speedLimit = global.ballSpeedLimit;
		
		ball.generateBall(probability,speedLimit);
	};
	
	// Check game over conditions.
	var isGameOver = function() {
		return global.noCollected < 0 || global.timeRemaining < 0;
	};
	
	var endTheGame = function() {
		refreshDisplay();
		pause();
		alert("Game Over");
		location.reload();
	};
	
	// Check if target number of balls has been collected.
	var isTargetReached = function() {
		return global.noCollected >= global.targetToCollect;
	};
	
	return {
		prepare: prepare,
		pause: pause,
		prepareForNextRound: prepareForNextRound,
		begin: begin,
	};
});