define({
	tickCounter: 0,
	
	//SETTINGS
	// Probability that a ball is created on a given tick.
	probabilityBallIsGenerated: 0.2,
	// Determines max possible falling speed that balls may be assigned.
	ballSpeedLimit: 5,
	// Probability that a given ball, once created, is yellow.
	probabilityBallID: 0.5,
	// Number of seconds to appear on the timer when the game begins.
	initialTimerValue: 60,
	// Number of seconds to add to timer when a question is answered correctly.
	timerTopupAmount: 10,
	// No of balls to collect before a question is asked.
	targetToCollect: 20,
	// Image source for player 1. Multiple images used when player1.draw argument is set to "flash".
	player1Src: ["img/blue.png", "img/white.png"],
	// Image source for balls.
	ballSrc: ["img/yellow.png","img/red.png"],
	
	//BALL
	ballWidth: '',
	ballXPositions: [],
	ballYPositions: [],
	// Determines type of ball: "yellow" or "red"
	ballID: [],
	// Assuming all types of ball have the same dimensions. Used in scoring.collisionBottomHasOccurred
	ballheight: '',
	yellowBallImage: new Image(),
	redBallImage: new Image(),
	
	//ANSWER
	// Determines the order in which answers are assigned to the buttons
	buttonOrderSequence: [],
	// Stops user entering more than one answer. Value set to 1 after answer has been submitted
	submitted: 0,
	
	//QUESTION
	// Used for selecting a question from 'questions' to ask the player.
	questionID: '',
	questionList: [
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
	                	],
	
	//CANVAS
	canvasHeight: 0,
	canvasWidth: 0,
	
	
	//ELEMENTID
	answerButtons: '',
	answerCorrect: '',
	answerIncorrect: '',
	buttonA: '',
	buttonB: '',
	buttonC: '',
	buttonD: '',
	container: '',
	gameCanvas: '',
	instructions: '',
	name: '',
	questionContainer: '',
	questionText: '',
	
	
	//player1
	playerOneBottomBoundary: 0,
	playerOneHeight: '',
	playerOneRightBoundary: 0,
	playerOneWidth: '',
	playerOneX: 0,
	playerOneY: 0,
	playerOneImage: new Image(),
	
	//SCORE
	score: 0,
	noCollected: 0,
	
	//TIMING
	timeRemaining: 60,
	               	
});