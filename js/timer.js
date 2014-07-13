define(["global"], function(global){	
	// Decrease timer by 1 second. 
	var decreaseBy1Second = function() {
		global.timeRemaining--;
	};
	
	// Display current time remaining. 
	var display = function() {
		global.gameCanvas.getContext("2d").font = "16px Arial";
		global.gameCanvas.getContext("2d").textBaseline = "top";
		global.gameCanvas.getContext("2d").textAlign = "left";
		global.gameCanvas.getContext("2d").fillText("Time: " + Math.max(0,global.timeRemaining),5,45);
	};
	
	// Add time to the timer but never allow it to be topped up above it's initial value.
	var topup = function () {
		global.timeRemaining = Math.min(global.timeRemaining + global.timerTopupAmount, global.initialTimerValue);
	};
	
	return {
		display: display,
		topup: topup,
		decreaseBy1Second: decreaseBy1Second,
	};
});