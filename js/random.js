define([], function(){	
		// Pick a random integer between 0 and and the parameter n.
		var integer = function(n) {
			var m = n+1;
			
			return Math.floor((Math.random()*m)); 
		};
		
		// Randomly orders the integers from 0 to the parameter n.
		var sequence = function(n) {
			var i=n;
			var oneToFour = [1,2,3,4];
			var result=[];
			
			while (i > -1) {
				var r = integer(i);
				result.push(oneToFour[r]);
				oneToFour.splice(r,1);
				i --;
			}
			
			return result;
		};
		
		return {
			sequence: sequence,
			integer: integer,
		};
});