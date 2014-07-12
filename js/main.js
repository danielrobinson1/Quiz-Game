
function handleTick() {

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
	game.tickCounter++;
}

function refreshDisplay() {
	canvas.clear();
	ball.draw();
	player1.draw();
	scoring.displayScore();
	scoring.displayNoCollected();
	timer.display();
}

// Check whether target number has been collected and display question. 
// Note it is actually possible for the variable scoring.noCollected to go over target 
// if the final ball is collected together with another in quick succession.
function displayQuestionIfTargetReached() {
	if (isTargetReached()) {
		// Check: Do we just need to update the noCollected and redisplay balls here?
		// Do we need game.pause()?
		game.pause();
		question.selectAndDisplayQuestion();
	}
}

// Create a ball with random speed (upto the value of settings.ballSpeedLimit, 
// on a given tick with probability specified by probabiiltyBallIsGenerated.
function randomlyGenerateBallWithRandomSpeed() {
	
	var probability = settings.probabilityBallIsGenerated;
	var speedLimit = settings.ballSpeedLimit;
	
	ball.generateBall(probability,speedLimit);
}

// Check game over conditions.
function isGameOver() {
	return scoring.noCollected < 0 || timer.timeRemaining < 0;
}

function endTheGame() {
	refreshDisplay();
	game.pause();
	alert("Game Over");
	location.reload();
}

// Check if target number of balls has been collected.
function isTargetReached() {
	return scoring.noCollected >= settings.targetToCollect;
}