require.config({ 
    paths: { 
        'jQuery': 'vendor/jquery-1.10.2'
    }, 
    shim: { 
        'jQuery': { 
            exports: '$'
        }
    } 
}); 

require(["app","jQuery"],
	function (app, $){
		app.initialize();
});