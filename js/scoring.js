define(["global", "player1", "ball"], function(global, player1, ball){	
	// Check for collisions between player1 and left side of nth ball.
	var collisionLeftHasOccurred = function(n) {
		if (global.playerOneX < global.ballXPositions[n] && global.ballXPositions[n] < global.playerOneX + global.playerOneWidth) {
			return true;
		}
		else return false;
	};
	
	// Check for collisions between player1 and right side of nth ball.
	var collisionRightHasOccurred = function(n) {		
		if (global.ballXPositions[n] < global.playerOneX && global.playerOneX < global.ballXPositions[n] + global.ballWidth) {
			return true;
		}
		else return false;
	};
	
	// Check for collisions between player1 and top side of nth ball.
	var collisionTopHasOccurred = function(n) {
		if (global.playerOneY < global.ballYPositions[n] && global.ballYPositions[n] < global.playerOneY + global.playerOneHeight) {
			return true;
		}
		else return false;
	};
	
	// Check for collisions between player1 and bottom side of nth ball.
	var collisionBottomHasOccurred = function(n) {	
		if (global.ballYPositions[n] < global.playerOneY && global.playerOneY < global.ballYPositions[n] + global.ballHeight) {
			return true;
		}
		else return false;
	};
		
	// Increase or decrease the value of scoring.global.noCollected.
	var updateNoCollected = function(n) {
		if (global.ballID[n] == "yellow") {
			global.noCollected++;
		}
		else if (global.ballID[n] == "red") {
			global.noCollected--;
		}
	};
	
	// Detect collisions, update global.noCollected and remove any balls collected.
	var detectCollisions = function() {
		var i = 0;
		var numberOfBalls = global.ballXPositions.length;
		
		while (i < numberOfBalls) {
			if (
				(collisionLeftHasOccurred(i) || collisionRightHasOccurred(i)) && 
				(collisionBottomHasOccurred(i) || collisionTopHasOccurred(i))
			) 
			
			// Move this to a new function. Have the detectCollisions function return true or false
			// if a collision is detected.
			{
				updateNoCollected(i);
				ball.remove(i);
			}
			i++;
		} 
	};
	
	// Display no: of yellow balls collected in current round, (minus any red balls collected).
	var displayNoCollected = function() {
		global.gameCanvas.getContext("2d").font = "16px Arial";
		global.gameCanvas.getContext("2d").textBaseline = "top";
		global.gameCanvas.getContext("2d").textAlign = "left";
		global.gameCanvas.getContext("2d").fillText("Collected: " + Math.max(0,global.noCollected),5,25);
	};
	
	// Display score (no: of questions correctly answered).
	var displayScore = function() {
		global.gameCanvas.getContext("2d").font = "16px Arial";
		global.gameCanvas.getContext("2d").textBaseline = "top";
		global.gameCanvas.getContext("2d").textAlign = "left";
		global.gameCanvas.getContext("2d").fillText("Score: " + global.score,5,5);
	};
	
	// Reset global.noCollected to zero ready for a new round.
	var resetNoCollected = function() {
		global.noCollected = 0;
	};
	
	return {
		detectCollisions: detectCollisions,
		displayScore: displayScore,
		displayNoCollected: displayNoCollected,
		resetNoCollected: resetNoCollected,
		
	};
});