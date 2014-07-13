define (["game", "button"], function (game, button){
	var initialize = function(){
		bindEvents();
	};
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	var bindEvents = function(){
		//document.addEventListener('DOMContentLoaded', onDeviceReady, false);
		window.addEventListener( "load", onDeviceReady, false );
	};
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicity call 'app.receivedEvent(...);'
	var onDeviceReady = function() {
		game.prepare();
		var canvas = document.getElementById("gameCanvas");
		canvas.addEventListener('click', game.begin, false);
		
		var buttonA = document.getElementById("buttonA");
		buttonA.addEventListener('click', button.clickA, false);
		var buttonB = document.getElementById("buttonB");
		buttonB.addEventListener('click', button.clickB, false);
		var buttonC = document.getElementById("buttonC");
		buttonC.addEventListener('click', button.clickC, false);
		var buttonD = document.getElementById("buttonD");
		buttonD.addEventListener('click', button.clickD, false);
	};
	return {
		initialize:initialize,
	};
});
