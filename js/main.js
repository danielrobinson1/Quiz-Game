
// Tasks to be performed on each tick.
function handleTick() {
	randomlyGenerateBallWithRandomSpeed();
	updateScreen();
	handleCollisions();
	displayQuestionIfTargetReached();
	checkIfGameOver();
	game.tickCounter++;
}

// Create a ball with random speed (upto the value of settings.ballSpeedLimit, 
// on a given tick with probability specified by probabiiltyBallIsGenerated.
function randomlyGenerateBallWithRandomSpeed() {
	ball.generateBall(settings.probabilityBallIsGenerated,settings.ballSpeedLimit);
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
	return scoring.noCollected >= settings.targetToCollect;
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