var questionList = [
// [Question, Correct answer, Three Incorrect answers].
// Add new questions and answers to the array. No further code modification required.
	/*0*/ "What is 2+2?", "4","0","1","2", 
	/*1*/ "What is the capital of England?", "London","Leeds","Manchester","E",
	/*2*/ "What is the biggest planet in the solar system?", "Jupiter","Pluto","Earth","Goofy",
	/*3*/ "What is the highest mountain in the world?", "Mt Everest", "Kilimanjaro", "Ben Nevis", "Mont Blanc",
	/*4*/ "How many seconds are there in one day?", "86400", "72600", "64800", "48200",
	/*5*/ "What is the German for goodbye?", "Auf wiedersehen", "Bonjour", "Danke", "Fromage",
	/*6*/ "Who is the president of the U.S.A?", "Barrack Obama", "B.A. Baracus", "Bacchus", "Buck Rogers",
	/*7*/ "Who was the first man on the moon?", "Neil Armstrong", "Lance Armstrong", "Louis Armstrong", "Stretch Armstrong",
	/*8*/ "Spell 'Morse' in Morse code.", "-- / --- / .-. / ... / .", ".-.. / . / .-- / .. / ...", "..-. / .-. / --- / ... / -", "--. / .- / -.. / --. / . / -", 
	/*9*/ "What is the name of the robot in the film Short Circuit?", "Johnny 5", "Alpha 5", "Babylon 5", "Abz from 5ive",
	
	/*10*/ "Who wrote 'The Odyssey'?", "Homer", "Bart", "Lisa", "Maggie",
	
	];

	//trailing comma on last line of array may cause a fit to be thrown 
	//in IE < 9 but is correct code.
	
	//Branch refactoring

	
	
var probabilityBallCreated = 0.2;    	// Probability that an ball is created on a given tick.
var ballSpeedFactor = 5;			   	// Determines max possible speed that enemies may be assigned.
var probabilityBallID = 0.5;			// Probability that a given ball, once created, is yellow or red.
var initialTimerValue = 60;				// Number of seconds to appear on timer when the game begins.
var timerTopupAmount = 10;				// Number of seconds to add to timer when a question is answered correctly.
var targetToCollect = 20;				// No of enemies to collect before a question is asked.

// Image source.
var player1Src = ["img/blue.png", "img/white.png"];		// Multiple images used when player1.draw argument is set to "flash".
var ballSrc = ["img/yellow.png","img/red.png"];

/*
 NAME handleTick
 DESC Called periodically using setInterval. 
*/
function handleTick() {
	
	canvas.clear();	
	
	//Draw characters
	player1.draw("solid");
	ball.create(probabilityBallCreated,ballSpeedFactor);
	ball.draw();
	
	//Display scores and time
	scoring.displayScore();
	scoring.displayNoCollected();
	timer.display();
	
	//Handle Collisions
	scoring.detectCollisions();
	
	// Check whether target number has been collected and display question. 
	// Note it is actually possible for the variable scoring.noCollected to go over target 
	// if the final ball is collected together with another in quick succession.
	if (scoring.noCollected >= targetToCollect) {
	
		canvas.clear();	
	
		//Draw characters
		player1.draw();
		ball.draw();
		
		//Display scores and time
		scoring.displayScore();
		scoring.displayNoCollected();
		timer.display();
		
		//Display question
		game.pauseTick();
		question.display();
	}
	
	// Check game over conditions
	if (scoring.noCollected < 0 || timer.time < 0) {
		game.pauseTick();
		alert("Game over");
		location.reload();
	}
	
	game.tickCounter++;
}