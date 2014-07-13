define(["global"], function(global){
	var imageFlash = 0;
	
	// Draw player1 at co-ordinates (player1.global.playerOneX, player1.global.playerOneY) which are defined by the mouse coordinates in the function setCoordinates().
	// PARA - "state" - Same image source used each tick.
	// PARA - "flash" - Image source is alternated to create flasing effect.
	var draw = function(state,speed) {
	
		// Set argument defaults in case undefined.
		if (state===undefined) {
			state="solid";
		}
		if (speed===undefined) {
			speed=5;
		}
		// Options for argument "state".	
		if (state=="solid") {
			global.gameCanvas.getContext("2d").drawImage(global.playerOneImage, global.playerOneX, global.playerOneY);
		}
		
		if (state=="flash") {
			if(global.tickCounter % 2*speed < speed) {
				image.src = global.player1Src[0];
			}
			else { 
				image.src = global.player1Src[1];
			}
			global.gameCanvas.getContext("2d").drawImage(image, global.playerOneX, global.playerOneY);
		}
	};
	

	// Pairs player1 co-ordinates with the mouse co-ordinates. 
	var setCoordinates = function(mouseEvent) {
		// OffsetX doesn't work in Firefox 22.0 so layerX mst be used instead.
		var mouseX = mouseEvent.offsetX==undefined?mouseEvent.layerX:mouseEvent.offsetX; 
		var mouseY = mouseEvent.offsetY==undefined?mouseEvent.layerY:mouseEvent.offsetY;

		if (mouseX < global.playerOneRightBoundary) {
			global.playerOneX = mouseX;
		}
		else global.playerOneX = global.playerOneRightBoundary;

		if (mouseY < global.playerOneBottomBoundary) {
			global.playerOneY = mouseY;
		}
		else global.playerOneY = global.playerOneBottomBoundary;
	};

	// Assign player1 image.
	var setImage = function() {
		global.playerOneImage.src = global.player1Src[0];
	};
	
	return {
		draw: draw,
		setImage: setImage,
		setCoordinates: setCoordinates,
	};
});