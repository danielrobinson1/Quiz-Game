define(["game", "timer", "global"], function(game, timer, global){	
	//Executed if user answers question correctly.
	var correct = function() {
		if (global.submitted == 0) {
			global.score++;
			timer.topup();
			global.answerCorrect.style.display="block";
			global.submitted = 1;
			setTimeout(game.prepareForNextRound,2000);
		}
	};
	
	// Executed if user answers question incorrectly
	var incorrect = function() {
		if (global.submitted == 0) {
			global.answerIncorrect.style.display="block";
			global.submitted = 1;
			setTimeout(game.prepareForNextRound,2000);
		}
	};
	
	return {
		incorrect: incorrect,
		correct: correct,
	};
});