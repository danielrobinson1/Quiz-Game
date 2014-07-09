
var answer = {
	// Determines the order in which answers are assigned to the buttons
	buttonOrderSequence: [],
	// Stops user entering more than one answer. Value set to 1 after answer has been submitted
	submitted: 0,
	
	//Executed if user answers question correctly.
	correct: function() {
		if (answer.submitted == 0) {
			scoring.score++;
			timer.topup();
			elementID.answerCorrect.style.display="block";
			answer.submitted = 1;
			setTimeout(game.prepareForNextRound,2000);
		}
	},
	
	// Executed if user answers question incorrectly
	incorrect: function() {
		if (answer.submitted == 0) {
			elementID.answerIncorrect.style.display="block";
			answer.submitted = 1;
			setTimeout(game.prepareForNextRound,2000);
		}
	},
	
	// Assign the four possible answers to the four buttons in a random order.
	setOrder: function() {
		answer.buttonOrderSequence = random.sequence(3);
	}
};

var ball = {
	// Determines type of ball: "yellow" or "red"
	ID: [],
	// Assuming all types of ball have the same dimensions. Used in scoring.collisionBottom
	height: '',
	numberOf: 0,
	speed: [],
	yellowBallImage: new Image(),
	redBallImage: new Image(),
	// Assuming all types of ball have the same dimensions. Used in scoring.collisionTop
	width: '',
	XPositions: [],
	YPositions: [],
	numberOfBalls: 0,
	
	// Generates new ball data
	generateBall: function(probability,speedLimit) {
		if (Math.random() < probability) {
			ball.generateStartingCoordinates();
			ball.generateStartingSpeed(speedLimit);
			ball.generateType();
		}
		ball.numberOf = ball.XPositions.length;
	},
	
	// Generates a random starting position for a new ball
	generateStartingCoordinates: function() {
		ball.XPositions.push(Math.random()*player1.rightBoundary);
		ball.YPositions.push(-30);		
	},
	
	// Assigns a speed to a new ball at random
	generateStartingSpeed: function(upperLimit) {
		ball.speed.push(Math.random()*upperLimit);
	},
	
	// Assigns a type to a new ball, red or yellow
	generateType: function() {
		if (Math.random() < probabilityBallID) {
			ball.ID.push("yellow");
		}
		else ball.ID.push("red");
	},
	
	//Set the value of ball.numberOfBalls to the number of balls in play
	obtainCurrentNumberOfBallsInPlay: function() {
		ball.numberOfBalls = ball.XPositions.length;
	},
	
	//Increments the y-coordinate of each ball in play
	incrementYCoords: function() {
		var currentBall = 0;
		
		while (currentBall < ball.numberOfBalls) {
			ball.YPositions[currentBall] = ball.YPositions[currentBall] + ball.speed[currentBall];
			currentBall++;
		}
	},
	
	// Draws each of the balls on the canvas
	draw: function() {
		var currentBall = 0;
		
		while (currentBall < ball.numberOfBalls) {
			if (ball.ID[currentBall] == "yellow") {
				elementID.gameCanvas.getContext("2d").drawImage(ball.yellowBallImage, ball.XPositions[currentBall], ball.YPositions[currentBall]);
			}
			else if (ball.ID[currentBall] == "red") {
				elementID.gameCanvas.getContext("2d").drawImage(ball.redBallImage, ball.XPositions[currentBall], ball.YPositions[currentBall]);
			}
			currentBall++;
		}
	},

	// Delete all array entries for ball with index a
	remove: function(n) {
		ball.XPositions.splice(n,1); 
		ball.YPositions.splice(n,1);
		ball.speed.splice(n,1);
		ball.ID.splice(n,1);
	},
	
	// Clears the screen of balls by clearing all the relevant arrays
	removeAll: function() {
		ball.XPositions = [];
		ball.YPositions = [];
		ball.speed = [];
		ball.ID = [];
	},
	// Assign ball images
	setImage: function() {
		ball.yellowBallImage.src = ballSrc[0];
		ball.redBallImage.src = ballSrc[1];
	}
};

var button = {
	
	// Assign the answers to the buttons
	assignAnswers: function() {
		elementID.buttonA.innerHTML = questionList[question.ID*5 + answer.buttonOrderSequence[0]];
		elementID.buttonB.innerHTML = questionList[question.ID*5 + answer.buttonOrderSequence[1]];
		elementID.buttonC.innerHTML = questionList[question.ID*5 + answer.buttonOrderSequence[2]];
		elementID.buttonD.innerHTML = questionList[question.ID*5 + answer.buttonOrderSequence[3]];
	},
	
	// Executed when button A is clicked. Check whether the answer is correct
	clickA: function() {
		if (answer.buttonOrderSequence[0]==1) {
			answer.correct();
		}
		else answer.incorrect();
	},
	
	// Executed when button B is clicked. Check whether the answer is correct.
	clickB: function() {
		if (answer.buttonOrderSequence[1]==1) {
			answer.correct();
		}
		else answer.incorrect();
	},
	
	// Executed when button C is clicked. Check whether the answer is correct.
	clickC: function() {
		if (answer.buttonOrderSequence[2]==1) {
			answer.correct();
		}
		else answer.incorrect();
	},
	
	//Executed when button D is clicked. Check whether the answer is correct.
	clickD: function() {
		if (answer.buttonOrderSequence[3]==1) {
			answer.correct();
		}
		else answer.incorrect();
	}
};

var canvas = {
	
	height: 0,
	width: 0,

	// Clears the canvas
	clear: function() {
		elementID.gameCanvas.width = canvas.width;
	},
	
	// Set dimensions of the canvas. Need to subtract 2, taking 1px border into account.
	setDimensions: function() {
		canvas.height = elementID.gameCanvas.offsetHeight - 2;
		canvas.width = elementID.gameCanvas.offsetWidth - 2;
	},
	
	// Set boundaries to prevent player1 (image size 30px x 33px) going off canvas
	setPlayer1Boundaries: function() {
		player1.rightBoundary = canvas.width - 30;
		player1.bottomBoundary = canvas.height - 33;
	},
};

var elementID = {	

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
	
	//Initialize shortcuts to be used instead of document.getElementById.
	//Note this can be better acheived with jquery using $().
	setShorthands: function() {
		elementID.answerButtons = document.getElementById("answerButtons");
		elementID.answerCorrect = document.getElementById("answerCorrect");
		elementID.answerIncorrect = document.getElementById("answerIncorrect");
		elementID.buttonA = document.getElementById("buttonA");
		elementID.buttonB = document.getElementById("buttonB");
		elementID.buttonC = document.getElementById("buttonC");
		elementID.buttonD = document.getElementById("buttonD");
		elementID.container = document.getElementById("container");
		elementID.gameCanvas = document.getElementById("gameCanvas");
		elementID.instructions = document.getElementById("instructions");
		elementID.name = document.getElementById("name");
		elementID.questionContainer = document.getElementById("questionContainer");
		elementID.questionText = document.getElementById("questionText");
	},
};


var game = {
	
	//Variables used to store return values of setInterval in game.startTick().
	handleTickHold: '',		
	countdownHold: '',
	tickCounter: 0,
	initialClick: 0,

	// Tasks to be performed when user first clicks the canvas to begin the game. 
	begin: function() {
		if (game.hasNotBegun) {
			game.ignoreFurtherMouseClicks();
			game.setPlayer1Dimensions();
			game.setBallDimensions();
			game.addEventListenerForMouseMovement();			
			game.startTick();
		}
	},
	
	// Returns true if player has not yet clicked the screen to begin the game, false otherwise.
	hasNotBegun: function() {
		if (game.initialClick == 0) {
			return true;
		}
		else if (game.initialClick == 1) {
			return false;
		}
	},
	
	// Prevent further calls of game.begin() via clicking of the canvas.
	ignoreFurtherMouseClicks: function() {
		game.initialClick = 1;
	},
	
	// Obtain the dimensions of the player1 image to be used for collision detection.
	setPlayer1Dimensions: function() {
		player1.height = player1.image.height;
		player1.width = player1.image.width;		
	},
	
	// Obtain the dimensions of the player1 image to be used in collision detection.
	setBallDimensions: function() {
		ball.height = ball.yellowBallImage.height;		
		ball.width = ball.yellowBallImage.width;	
	},
	
	// Add event listener to deal with movement of player1 by mouse.
	addEventListenerForMouseMovement: function() {
		elementID.gameCanvas.addEventListener('mousemove',player1.setCoordinates, false);
	},
	
	// Tasks to be performed when the page is loaded in the browser.  
	prepare: function() {
		elementID.setShorthands();
		game.setTextForInstructionsElement();
		canvas.setDimensions();
		canvas.setPlayer1Boundaries();
		player1.setImage();
		ball.setImage();
		game.displayStartScreenText();
		question.setAllAllowed();
	},

	// Set the text to be displayed in the 'instructions' div element.
	setTextForInstructionsElement: function() {
		elementID.instructions.innerHTML = 
		"<p>Compatible with  Chrome v28, Internet Explorer v10, Firefox v27 and Opera v15</p>" + 
		"<p><strong>Instructions:</strong> Collect " + 
		targetToCollect + 
		" yellow to unlock a question. " + "Avoid the red!</p>";
	},
	
	// Display start screen text on the canvas.
	displayStartScreenText: function() {
		elementID.gameCanvas.getContext("2d").font = "16px Arial";
		elementID.gameCanvas.getContext("2d").textBaseline = "center";
		elementID.gameCanvas.getContext("2d").textAlign = "center";
		elementID.gameCanvas.getContext("2d").fillText("Click screen to start new game",canvas.width / 2,canvas.height / 2);
	},
	
	//Pauses the game.
	pause: function() {
		clearInterval(game.handleTickHold);
		clearInterval(game.countdownHold);
	},
	
	// Tasks to perform after player enters an answer to a question.
	prepareForNextRound: function() {
		ball.removeAll();
		scoring.resetNoCollected();
		elementID.answerIncorrect.style.display="none";
		elementID.answerCorrect.style.display="none";
		elementID.questionContainer.style.display="none";
		canvas.clear();
		game.displayGetReadyScreen();
		scoring.displayScore();
		scoring.displayNoCollected();
		timer.display();
		setTimeout(game.startTick,2000);
	},
	
	// Display text 'Get Ready'.
	displayGetReadyScreen: function() {
		elementID.gameCanvas.getContext("2d").font = "16px Arial";
		elementID.gameCanvas.getContext("2d").textBaseline = "center";
		elementID.gameCanvas.getContext("2d").textAlign = "center";
		elementID.gameCanvas.getContext("2d").fillText("Get Ready!",canvas.width/2,canvas.height/2);
	},
	
	// Start executing the function handleTick at the specified period of miliseconds. Start countdown timer.
	startTick: function() {
		elementID.gameCanvas.style.cursor='none';
		game.handleTickHold = setInterval(handleTick,25);
		game.countdownHold = setInterval(timer.countdown,1000);
	}
};


var player1 = {

	bottomBoundary: 0,
	height: '',
	image: new Image(),
	imageFlash: 0,
	rightBoundary: 0,
	width: '',
	X: 0,
	Y: 0,
	
	// Draw player1 at co-ordinates (player1.X, player1.Y) which are defined by the mouse coordinates in the function setCoordinates().
	// PARA - "state" - Same image source used each tick.
	// PARA - "flash" - Image source is alternated to create flasing effect.
	draw: function(state,speed) {
	
		// Set argument defaults in case undefined.
		if (state===undefined) {
			state="solid";
		}
		if (speed===undefined) {
			speed=5;
		}
		
		// Options for argument "state".	
		if (state=="solid") {
			elementID.gameCanvas.getContext("2d").drawImage(player1.image, player1.X, player1.Y);
		}
		
		if (state=="flash") {
			if(game.tickCounter % 2*speed < speed) {
				player1.image.src = player1Src[0];
			}
			else { 
				player1.image.src = player1Src[1];
			}
			elementID.gameCanvas.getContext("2d").drawImage(player1.image, player1.X, player1.Y);
		}
	},

	
	// Pairs player1 co-ordinates with the mouse co-ordinates. 
	setCoordinates: function(mouseEvent) {
		// OffsetX doesn't work in Firefox 22.0 so layerX mst be used instead.
		var mouseX = mouseEvent.offsetX==undefined?mouseEvent.layerX:mouseEvent.offsetX; 
		var mouseY = mouseEvent.offsetY==undefined?mouseEvent.layerY:mouseEvent.offsetY;
				
		if (mouseX < player1.rightBoundary) {
			player1.X = mouseX;
		}
		else player1.X = player1.rightBoundary;
		
		if (mouseY < player1.bottomBoundary) {
			player1.Y = mouseY;
		}
		else player1.Y = player1.bottomBoundary;
	},
	
	// Assign player1 image.
	setImage: function() {
		player1.image.src = player1Src[0];
	}
};


var question = {
	
	// When the game is loaded, the array 'allowed' is populated with an 'x' for each question in 'questionList'. 
	// Once a question has been asked, the corresponding 'x' is replaced with an 'o' to prevent it from being asked again.
	allowed: [],
	// Used for selecting a question from 'questions' to ask the player.
	ID: '',
	
	// Displays a question, if there is an unasked one still available.
	selectAndDisplayQuestion: function() { 
		if (question.exists()) {
			question.select();
			answer.setOrder();
			button.assignAnswers();
			question.displayQuestion();
			question.displayCursor();
			answer.submitted = 0;
		}
		else {
			alert('No Questions Remaining.');
			location.reload();
		}
	},
	
	// Display the selected question.
	displayQuestion: function() {
		elementID.questionText.innerHTML = "Question: " + questionList[question.ID*5];
		elementID.questionContainer.style.display="block";
	},
	
	// Make cursor visible.
	displayCursor: function() {
		elementID.gameCanvas.style.cursor='auto';
	},
	
	/*
	 NAME question.exists
	 DESC Returns true if there are unasked questions remaining. Otherwise returns false.
	*/
	exists: function() {
		var noOfQuestions = questionList.length / 5;
		var i=0;
		var count=0;
		
		// Count number of questions already asked.
		while (i<noOfQuestions) {
			if (question.allowed[i]=="o") {
				count++;
			}
			i++;
		}
		
		if (count==noOfQuestions) {
			return false;
		}
		else return true;
	},
	/*
	 NAME question.select
	 DESC Select a question at random, which hasn't been asked already.
	*/
	select: function() {
		var setQuestionCompleted = 0;
		var noOfQuestions = questionList.length / 5;
		
		// If question number n is available (marked x) set question.ID and make unavailable for future use (marked o).
		while (setQuestionCompleted == 0) {
			var n = random.integer(noOfQuestions-1);
			
			if (question.allowed[n] == "x") {
				question.ID = n;
				question.allowed[n] = "o";
				setQuestionCompleted = 1;
			}
		}
	},
	/*
	 NAME question.setAllAllowed
	 DESC Populates entries of array question.allowed with an 'x' for each question.
	  The 'x' wil become an 'o' once that question has been asked to prevent it being asked again.
	*/
	setAllAllowed: function() {
		var noOfQuestions = questionList.length / 5;
		var i=0;
		
		while(i < noOfQuestions) {
			question.allowed.push("x");
			i++;
		}
	}
};


var random = {

	/*
	 NAME random.integer
	 DESC Pick a random integer between 0 and x.
	 PARA x - Max integer that will be returned.
	 RETN The randomly chosen integer.
	*/
	integer: function(x) {
		var y = x+1;
		
		return Math.floor((Math.random()*y)); 
	},
	/*
	 NAME random.sequence
	 DESC Randomly orders the integers from 0 to x.
	 PARA x - The highest integer in the sequence.
	 RETN Array with the randomly ordered integers. 
	*/
	sequence: function(x) {
		var i=x;
		var oneToFour = [1,2,3,4];
		var result=[];
		
		while (i > -1) {
			var y = random.integer(i);
			result.push(oneToFour[y]);
			oneToFour.splice(y,1);
			i --;
		}
		
		return result;
	}
};


var scoring = {
	
	score: 0,
	noCollected: 0,
	
	collisionLeft: function(n) {
	// Check if player1 hits left side of ball.
	
		if (player1.X < ball.XPositions[n] && ball.XPositions[n] < player1.X + player1.width) {
		
			return true;
		}
		else return false;
	},
	
	collisionRight: function(n) {
	// Check if player1 hits right side of ball.
		
		if (ball.XPositions[n] < player1.X && player1.X < ball.XPositions[n] + ball.width) {
		
			return true;
		}
		else return false;
	},
	
	collisionTop: function(n) {
	// Check if player1 hits top side of ball.
	
		if (player1.Y < ball.YPositions[n] && ball.YPositions[n] < player1.Y + player1.height) {
		
			return true;
		}
		else return false;
	},
	
	collisionBottom: function(n) {
	// Check if player1 hits bottom side of ball.
	
		if (ball.YPositions[n] < player1.Y && player1.Y < ball.YPositions[n] + ball.height) {
		
			return true;
		}
		else return false;
	},
		
	updateNoCollected: function(n) {
		if (ball.ID[n] == "yellow") {
			scoring.noCollected++;
		}
		else if (ball.ID[n] == "red") {
			scoring.noCollected--;
		}
	},
	/*
	 NAME scoring.detectCollisions
	 DESC Loop through each ball in turn and check whether the player1 overlaps it.
	  If so check which type of ball has been hit and increase/ decrease noCollected as necessary.
	*/
	detectCollisions: function() {

		var i = 0;
		var numberOfBalls = ball.XPositions.length;
	
		while (i < numberOfBalls) {
			if ( 
				( scoring.collisionLeft(i) || scoring.collisionRight(i) ) 
				&& 
				( scoring.collisionBottom(i) || scoring.collisionTop(i) ) 
			) {
				scoring.updateNoCollected(i);
				ball.remove(i);
			}
			i++;
		} 
	},	
	/*
	 NAME scoring.displayNoCollected 
	 DESC Display no: of yellow balls collected. 
	*/
	displayNoCollected: function() {
		elementID.gameCanvas.getContext("2d").font = "16px Arial";
		elementID.gameCanvas.getContext("2d").textBaseline = "top";
		elementID.gameCanvas.getContext("2d").textAlign = "left";
		elementID.gameCanvas.getContext("2d").fillText("Collected: " + scoring.noCollected,5,25);
	},
	/*
	 NAME scoring.displayScore
	 DESC Display score (no of questions correctly answered). 
	*/
	displayScore: function() {
		elementID.gameCanvas.getContext("2d").font = "16px Arial";
		elementID.gameCanvas.getContext("2d").textBaseline = "top";
		elementID.gameCanvas.getContext("2d").textAlign = "left";
		elementID.gameCanvas.getContext("2d").fillText("Score: " + scoring.score,5,5);
	},
	/*
	 NAME scoring.resetNoCollected
	 DESC Reset noCollected to zero.
	*/
	resetNoCollected: function() {
		scoring.noCollected = 0;
	}
};


var timer = {
	
	time: initialTimerValue,
	
	/*
	 NAME timer.countdown
	 DESC Decrease timer by 1 second. 
	*/
	countdown: function() {
		timer.time--;
	},
	/*
	 NAME timer.display
	 DESC Display current time remaining. 
	*/
	display: function() {
	
		elementID.gameCanvas.getContext("2d").font = "16px Arial";
		elementID.gameCanvas.getContext("2d").textBaseline = "top";
		elementID.gameCanvas.getContext("2d").textAlign = "left";
		elementID.gameCanvas.getContext("2d").fillText("Time: " + Math.max(0,timer.time),5,45);		//Prevent timer displaying "-1";
	},
	topup: function () {
		
		timer.time = Math.min(timer.time + timerTopupAmount, initialTimerValue);
	}
};

