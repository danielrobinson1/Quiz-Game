define(["global"], function(global){	
	
	//Initialize shortcuts to be used instead of document.getElementById.
	//Note this can be better acheived with jquery using $().
	var setShorthands = function() {
		global.answerButtons = document.getElementById("answerButtons");
		global.answerCorrect = document.getElementById("answerCorrect");
		global.answerIncorrect = document.getElementById("answerIncorrect");
		global.buttonA = document.getElementById("buttonA");
		global.buttonB = document.getElementById("buttonB");
		global.buttonC = document.getElementById("buttonC");
		global.buttonD = document.getElementById("buttonD");
		global.container = document.getElementById("container");
		global.gameCanvas = document.getElementById("gameCanvas");
		global.instructions = document.getElementById("instructions");
		global.name = document.getElementById("name");
		global.questionContainer = document.getElementById("questionContainer");
		global.questionText = document.getElementById("questionText");
	};
	
	return {
		setShorthands: setShorthands,
	};
});