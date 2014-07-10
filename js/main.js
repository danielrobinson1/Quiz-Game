// Probability that a ball is created on a given tick.
var probabilityBallIsGenerated = 0.2;
// Determines max possible falling speed that balls may be assigned.
var ballSpeedLimit = 5;
// Probability that a given ball, once created, is yellow.
var probabilityBallID = 0.5;
// Number of seconds to appear on timer when the game begins.
var initialTimerValue = 60;
// Number of seconds to add to timer when a question is answered correctly.
var timerTopupAmount = 10;
// No of balls to collect before a question is asked.
var targetToCollect = 20;
// Image source for player 1. Multiple images used when player1.draw argument is set to "flash".
var player1Src = ["img/blue.png", "img/white.png"];
// Image source for balls.
var ballSrc = ["img/yellow.png","img/red.png"];

// Tasks to be performed on each tick.
function handleTick() {
	randomlyGenerateBallWithRandomSpeed();
	updateScreen();
	handleCollisions();
	displayQuestionIfTargetReached();
	checkIfGameOver();
	game.tickCounter++;
}

// Create a ball with random speed (upto the value of ballSpeedLimit, 
// on a given tick with probability specified by probabiiltyBallIsGenerated.
function randomlyGenerateBallWithRandomSpeed() {
	ball.generateBall(probabilityBallIsGenerated,ballSpeedLimit);
}

// Draw characters in new positions and refresh score and time.
function updateScreen() {
	canvas.clear();	
	drawCharacters();
	displayScoreAndTime();
}

// Draw characters.
function drawCharacters() {
	player1.draw();
	ball.obtainCurrentNumberOfBallsInPlay();
	ball.incrementYCoords();
	ball.draw();
}

// Display score and time.
function displayScoreAndTime() {
	scoring.displayScore();
	scoring.displayNoCollected();
	timer.display();
}

// Detect collisions, update noOfCollected and remove balls from play that have been collected.
function handleCollisions() {
	scoring.detectCollisions();
}

// Check whether target number has been collected and display question. 
// Note it is actually possible for the variable scoring.noCollected to go over target 
// if the final ball is collected together with another in quick succession.
function displayQuestionIfTargetReached() {
	if (isTargetReached()) {
		// Check: Do we just need to update the score here?
		updateScreen();		
		game.pause();
		question.selectAndDisplayQuestion();
	}
}

// Check if target number of balls has been collected.
function isTargetReached() {
	return scoring.noCollected >= targetToCollect;
}

// End the game if game over conditions are met.
function checkIfGameOver() {
	if (isGameOver()) {
		game.pause();
		alert("Game over");
		location.reload();
	}
}

// Check game over conditions.
function isGameOver() {
	return scoring.noCollected < 0 || timer.timeRemaining < 0;
}