define(["button", "global", "random"], function(button, global, random){	
	// When the game is loaded, the array 'allowed' is populated with an 'x' for each question in 'questionList'. 
	// Once a question has been asked, the corresponding 'x' is replaced with an 'o' to prevent it from being asked again.
	var allowed = [];
	
	// Format is [Question, Correct answer, Three Incorrect answers].
	// Add new questions and answers to the array. No further code modification required.
	// Trailing comma on last line of array may cause a fit to be thrown in IE < 9 but is correct code.

	
	// Displays a question, if there is an unasked one still available.
	var selectAndDisplayQuestion = function() { 
		if (unaskedQuestionsExist()) {
			select();
			setOrder();
			button.assignAnswers();
			displayQuestion();
			displayCursor();
			global.submitted = 0;
		}
		else {
			alert('No Questions Remaining.');
			location.reload();
		}
	};
	
	// Assign the four possible answers to the four buttons in a random order.
	var setOrder = function() {
		global.buttonOrderSequence = random.sequence(3);
	};
	
	// Display the selected question.
	var displayQuestion = function() {
		global.questionText.innerHTML = "Question: " + global.questionList[global.questionID*5];
		global.questionContainer.style.display="block";
	};
	
	// Make cursor visible.
	var displayCursor = function() {
		global.gameCanvas.style.cursor='auto';
	};
	
	// Returns true if there are unasked questions remaining. Otherwise returns false.
	var unaskedQuestionsExist = function() {
		var noOfQuestions = global.questionList.length / 5;
		var i=0;
		var count=0;
		
		while (i<noOfQuestions) {
			if (allowed[i]=="o") {
				count++;
			}
			i++;
		}
		
		if (count==noOfQuestions) {
			return false;
		}
		else return true;
	};
	
	// Select a question at random, (which hasn't been asked already).
	var select = function() {
		var questionHasBeenSelected = false;
		var noOfQuestions = global.questionList.length / 5;
		
		// If question number 'n ' is available (marked 'x'), set question.ID and make unavailable for future use (marked 'o').
		while (questionHasBeenSelected == false) {
			var n = random.integer(noOfQuestions-1);
			
			if (allowed[n] == "x") {
				global.questionID = n;
				allowed[n] = "o";
				questionHasBeenSelected = true;
			}
		}
	};
	
	// Make all questions available to be asked.
	var setAllAllowed = function() {
		var noOfQuestions = global.questionList.length / 5;
		var i=0;
		
		while(i < noOfQuestions) {
			allowed.push("x");
			i++;
		}
	};
	
	return {
		selectAndDisplayQuestion: selectAndDisplayQuestion,
		setAllAllowed: setAllAllowed,
	};
});