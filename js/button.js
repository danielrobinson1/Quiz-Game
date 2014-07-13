define(["global", "answer"], function(global, answer){	
	
	// Executed when button A is clicked. Check whether the answer is correct
	var clickA = function() {
		if (global.buttonOrderSequence[0]==1) {
			answer.correct();
		}
		else answer.incorrect();
	};
	
	// Executed when button B is clicked. Check whether the answer is correct.
	var clickB = function() {
		if (global.buttonOrderSequence[1]==1) {
			answer.correct();
		}
		else answer.incorrect();
	};
	
	// Executed when button C is clicked. Check whether the answer is correct.
	var clickC = function() {
		if (global.buttonOrderSequence[2]==1) {
			answer.correct();
		}
		else answer.incorrect();
	};
	
	//Executed when button D is clicked. Check whether the answer is correct.
	var clickD = function() {
		if (global.buttonOrderSequence[3]==1) {
			answer.correct();
		}
		else answer.incorrect();
	};
	
	return{
		clickA: clickA,
		clickB: clickB,
		clickC: clickC,
		clickD: clickD,
	};
});