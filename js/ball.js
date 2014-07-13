define(["global"], function(global){
	var numberOf = 0;
	var speed = [];

	// Assuming all types of ball have the same dimensions. Used in scoring.collisionTopHasOccurred

	var numberOfBalls = 0;
	// Generates new ball data
	var generateBall = function(probability,speedLimit) {
		if (Math.random() < probability) {
			generateStartingCoordinates();
			generateStartingSpeed(speedLimit);
			generateType();
		}
		numberOf = global.ballXPositions.length;
	};
	
	// Generates a random starting position for a new ball
	var generateStartingCoordinates = function() {
		global.ballXPositions.push(Math.random()*global.playerOneRightBoundary);
		global.ballYPositions.push(-30);		
	};
	
	// Assigns a speed to a new ball at random
	var generateStartingSpeed = function(upperLimit) {
		speed.push(Math.random()*upperLimit);
	};
	
	// Assigns a type to a new ball, red or yellow
	var generateType = function() {
		if (Math.random() < global.probabilityBallID) {
			global.ballID.push("yellow");
		}
		else global.ballID.push("red");
	};
	
	//Set the value of ball.numberOfBalls to the number of balls in play
	var obtainCurrentNumberOfBallsInPlay = function() {
		numberOfBalls = global.ballXPositions.length;
	};
	
	//Increments the y-coordinate of each ball in play
	var incrementYCoords = function() {
		var currentBall = 0;
		
		while (currentBall < numberOfBalls) {
			global.ballYPositions[currentBall] = global.ballYPositions[currentBall] + speed[currentBall];
			currentBall++;
		}
	};
	
	// Draws each of the balls on the canvas
	var draw = function() {
		var currentBall = 0;
		
		while (currentBall < numberOfBalls) {
			if (global.ballID[currentBall] == "yellow") {
				global.gameCanvas.getContext("2d").drawImage(global.yellowBallImage, global.ballXPositions[currentBall], global.ballYPositions[currentBall]);
			}
			else if (global.ballID[currentBall] == "red") {
				global.gameCanvas.getContext("2d").drawImage(global.redBallImage, global.ballXPositions[currentBall], global.ballYPositions[currentBall]);
			}
			currentBall++;
		}
	};

	// Delete all array entries for ball with index a
	var remove = function(n) {
		global.ballXPositions.splice(n,1); 
		global.ballYPositions.splice(n,1);
		speed.splice(n,1);
		global.ballID.splice(n,1);
	};
	
	// Clears the screen of balls by clearing all the relevant arrays
	var removeAll = function() {
		global.ballXPositions = [];
		global.ballYPositions = [];
		speed = [];
		global.ballID = [];
	};
	// Assign ball images
	var setImage = function() {
		global.yellowBallImage.src = global.ballSrc[0];
		global.redBallImage.src = global.ballSrc[1];
	};
	
	return {
		obtainCurrentNumberOfBallsInPlay: obtainCurrentNumberOfBallsInPlay,
		incrementYCoords: incrementYCoords,
		draw: draw,
		setImage: setImage,
		removeAll: removeAll,
		remove: remove,
		generateBall: generateBall,
	};
});