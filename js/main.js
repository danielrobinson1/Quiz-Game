// Probability that a ball is created on a given tick.
var probabilityBallIsGenerated = 0.2;
// Determines max possible falling speed that balls may be assigned.
var ballSpeedLimit = 5;
// Probability that a given ball, once created, is yellow or red.
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

function handleTick() {
	randomlyGenerateBallWithRandomSpeed();
	updateScreen();
	handleCollisions();
	displayQuestionIfTargetReached();
	checkIfGameOver();
	game.tickCounter++;
}

function randomlyGenerateBallWithRandomSpeed() {
	ball.generateBall(probabilityBallIsGenerated,ballSpeedLimit);
}

function updateScreen() {
	canvas.clear();	
	drawCharacters();
	displayScoreAndTime();
}

function drawCharacters() {
	player1.draw();
	ball.obtainCurrentNumberOfBallsInPlay();
	ball.incrementYCoords();
	ball.draw();
}

function displayScoreAndTime() {
	scoring.displayScore();
	scoring.displayNoCollected();
	timer.display();
}

function handleCollisions() {
	scoring.detectCollisions();
}

function displayQuestionIfTargetReached() {
// Check whether target number has been collected and display question. 
// Note it is actually possible for the variable scoring.noCollected to go over target 
// if the final ball is collected together with another in quick succession.
	if (isTargetReached()) {
		updateScreen();		//Check - Do we just need to update the score?
		game.pause();
		question.selectAndDisplayQuestion();
	}
}

function isTargetReached() {
	return scoring.noCollected >= targetToCollect;
}

function checkIfGameOver() {
	if (isGameOver()) {
		game.pause();
		alert("Game over");
		location.reload();
	}
}

function isGameOver() {
	return scoring.noCollected < 0 || timer.timeRemaining < 0;
}