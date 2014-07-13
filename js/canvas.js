define(["global"], function(global){
	// Clears the canvas
	var clear = function() {
		global.gameCanvas.width = global.canvasWidth;
	};
	
	// Set dimensions of the canvas. Need to subtract 2, taking 1px border into account.
	var setDimensions = function() {
		global.canvasHeight = global.gameCanvas.offsetHeight - 2;
		global.canvasWidth = global.gameCanvas.offsetWidth - 2;
	};
	
	// Set boundaries to prevent player1 (image size 30px x 33px) going off canvas
	var setPlayer1Boundaries = function() {
		global.playerOneRightBoundary = global.canvasWidth - 30;
		global.playerOneBottomBoundary = global.canvasHeight - 33;
	};
	
	return {
		clear: clear,
		setDimensions: setDimensions,
		setPlayer1Boundaries: setPlayer1Boundaries,		
	};
});