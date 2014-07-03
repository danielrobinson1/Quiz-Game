
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
			setTimeout(game.restartAfterQuestion,2000);
		}
	},
	
	// Executed if user answers question incorrectly
	incorrect: function() {
		if (answer.submitted == 0) {
			elementID.answerIncorrect.style.display="block";
			answer.submitted = 1;
			setTimeout(game.restartAfterQuestion,2000);
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
	type1Image: new Image(),
	type2Image: new Image(),
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
				elementID.gameCanvas.getContext("2d").drawImage(ball.type1Image, ball.XPositions[currentBall], ball.YPositions[currentBall]);
			}
			else if (ball.ID[currentBall] == "red") {
				elementID.gameCanvas.getContext("2d").drawImage(ball.type2Image, ball.XPositions[currentBall], ball.YPositions[currentBall]);
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
		ball.type1Image.src = ballSrc[0];
		ball.type2Image.src = ballSrc[1];
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
	initialClick: 0,	// Used to stop setInterval being called more than once via game.begin() if mouse is clicked a second time.
	width: 0,

	/*
	 NAME canvas.clear
	 DESC Clears the canvas.
	*/
	clear: function() {

		elementID.gameCanvas.width = canvas.width;
	}
};


var elementID = {	
	// HTML elements. Initialized by game.prepare() when HTML file is loaded. Used instead of document.getElementById("")
	// Look into jquery, where $() can be used for exactly this purpose.
	
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
	questionText: ''
};


var game = {
	
	//Variables used to store return values of setInterval in game.startTick().
	handleTickHold: '',		
	countdownHold: '',
	tickCounter: 0,

	/*
	 NAME game.begin
	 DESC Tasks to be performed when user first clicks the canvas to begin the game. 
	*/
	begin: function() {
		
		if (canvas.initialClick == 0) {	
		
			// Set image dimensions used for collision detection
			// Tried including this in game.prepare(); but nothing happened when the player1 collided with a ball
			// when first opening the game in the browser. However after refreshing the browser, the game then worked as normal!
			player1.height = player1.image.height;
			player1.width = player1.image.width;
			ball.height = ball.type1Image.height;		// Assuming that all different ball types have the same dimension.
			ball.width = ball.type1Image.width;
			
			elementID.gameCanvas.addEventListener('mousemove',player1.handleMouseMovement, false);	
			game.startTick();
			canvas.initialClick = 1;
		}	
	},
	/*
	 NAME game.prepare
	 DESC Tasks to be performed when the HTML file is loaded in the browser.
	*/  
	prepare: function() {
	
		//Initialize shortcuts to be used instead of document.getElementById.
		//Note this can be better acheived with jquery using $().
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
		
		elementID.instructions.innerHTML = 
		"<p>Compatible with  Chrome v28, Internet Explorer v10, Firefox v27 and Opera v15</p>" + 
		"<p><strong>Instructions:</strong> Collect " + targetToCollect + " yellow to unlock a question. " + "Avoid the red!</p>";
		
		// Get Canvas dimensions from HTML file. Subtract 2, taking 1px border into account
		canvas.height = elementID.gameCanvas.offsetHeight - 2;
		canvas.width = elementID.gameCanvas.offsetWidth - 2;
		
		// Set boundaries to prevent player1 (size 30px x 33px) going off canvas
		player1.rightBoundary = canvas.width - 30;
		player1.bottomBoundary = canvas.height - 33;
		
		// Set width of question box - Is this needed?
		//elementID.questionContainer.style.width=canvas.width*9/10;
		
		// Assign image sources.
		player1.setImage();
		ball.setImage();
		
		// Startscreen text.
		elementID.gameCanvas.getContext("2d").font = "16px Arial";
		elementID.gameCanvas.getContext("2d").textBaseline = "center";
		elementID.gameCanvas.getContext("2d").textAlign = "center";
		elementID.gameCanvas.getContext("2d").fillText("Click screen to start new game",canvas.width / 2,canvas.height / 2);
		
		// Set all questions to allowed - Any question may be chosen first time around. Once a question it will not be asked again until a new game is started.
		question.setAllAllowed();
	},
	/*
	 NAME game.pauseTick
	 DESC Pauses the game.
	*/
	pauseTick: function() {

		clearInterval(game.handleTickHold);
		clearInterval(game.countdownHold);
	},
	/*
	 NAME game.restartAfterQuestion
	 DESC After user enters answer to question
	*/
	restartAfterQuestion: function() {
		ball.removeAll();
		scoring.resetNoCollected();
		elementID.answerIncorrect.style.display="none";
		elementID.answerCorrect.style.display="none";
		elementID.questionContainer.style.display="none";
		
		canvas.clear();
		
		elementID.gameCanvas.getContext("2d").font = "16px Arial";
		elementID.gameCanvas.getContext("2d").textBaseline = "center";
		elementID.gameCanvas.getContext("2d").textAlign = "center";
		elementID.gameCanvas.getContext("2d").fillText("Get Ready!",canvas.width/2,canvas.height/2);
		
		scoring.displayScore();
		scoring.displayNoCollected();
		timer.display();
		
		setTimeout(game.startTick,2000);
	},
	/*
	 NAME game.startTick
	 DESC Start executing the function handleTick at the specified period of miliseconds.
	  Start countdown timer and change value of canvas.initialClick to prevent any further calls 
	  of the setInterval commands via the function game.begin(). Failing to change canvas.initialClick, 
	  would mean that any accidental mouse clicks increase the speed of the game.
	*/
	startTick: function() {
		
		//elementID.gameCanvas.addEventListener('mousemove',player1.handleMouseMovement, false);	
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
	
	/* 
	 NAME player1.draw
	 DESC Draw player1 at co-ordinates (player1.X, player1.Y) which are defined 
	  by the mouse coordinates in the function handleMouseMovement().
	 PARA - "state" - Same image source used each tick.
	 PARA - "flash" - Image source is alternated to create flasing effect.
	*/
	draw: function(state,speed) {
	
		// Set argument defaults in case undefined.
		if (state===undefined) {
			state="solid";
		}
		if (speed===undefined) {
			speed=5;
		}
		
		// Define options for argument "state".
		var twiceSpeed = 2*speed;
		
		if (state=="solid") {
		
			elementID.gameCanvas.getContext("2d").drawImage(player1.image, player1.X, player1.Y);
		}
		
		if (state=="flash") {
		
			// Select image source based on value of "speed".
			if(game.tickCounter % twiceSpeed < speed) {
				player1.image.src = player1Src[0];
			}
			else { 
				player1.image.src = player1Src[1];
			}
			// Draw.
			elementID.gameCanvas.getContext("2d").drawImage(player1.image, player1.X, player1.Y);
		}
	},
	/*
	 NAME player1.handleMouseMovement
	 DESC Allows player1 to be controlled by the mouse and prevents player1 going off canvas. 
	   OffsetX doesn't work in Firefox 22.0 so layerX mst be used instead.
	 PARA mouseEvent
	*/
	handleMouseMovement: function(mouseEvent) {
		
		var x = mouseEvent.offsetX==undefined?mouseEvent.layerX:mouseEvent.offsetX; 
		var y = mouseEvent.offsetY==undefined?mouseEvent.layerY:mouseEvent.offsetY;
				
		// Set avatar.X
		if (x < player1.rightBoundary) {
			player1.X = x;
		}
		else player1.X = player1.rightBoundary;
		
		// Set avatar.Y
		if (y < player1.bottomBoundary) {
			player1.Y = y;
		}
		else player1.Y = player1.bottomBoundary;
		
		
		
		// Set player1.X
		//if (mouseEvent.offsetX < player1.rightBoundary) {
		//	player1.X = mouseEvent.offsetX;
		//}
		//else player1.X = player1.rightBoundary;
		//
		// Set player1.Y
		//if (mouseEvent.offsetY < player1.bottomBoundary) {
		//	player1.Y = mouseEvent.offsetY;
		//}
		//else player1.Y = player1.bottomBoundary;
	},
	/*
	 NAME player1.setImage
	 DESC Assign player1 image.
	*/
	setImage: function() {
		player1.image.src = player1Src[0];
	}
};


var question = {
	
	allowed: [], 		// When the game is loaded in the browser, this array is populated with an 'x' for each question in the variable 'questionList'. Once a question is asked, the corresponding 'x' is replaced with an 'o' to prevent it from being asked again.
	ID: '',				// Used for selecting a question from 'questions' to ask the player.
	
	/*
	 NAME question.display
	 DESC Displays a question, if there is an unasked one still available, by revealing the previously 
	  hidden Div 'questionContainer'. If there are no questions remaining, the page is reloaded prompting 
	  a new game to be started.
	*/
	display: function() { 
		if (question.exists()) {
			question.select();
			answer.setOrder();
			elementID.questionText.innerHTML = "Question: " + questionList[question.ID*5];
			button.assignAnswers();
			elementID.questionContainer.style.display="block";
			elementID.gameCanvas.style.cursor='auto';
			answer.submitted = 0;
		}
		else {
			alert('No Questions Remaining.');
			location.reload();
		}
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

