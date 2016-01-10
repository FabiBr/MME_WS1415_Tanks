Tanks.MainMenu = (function() {
	var that = {},
	    init = function() {
    		console.log("Main init");
    		document.getElementById("start").onclick = function () {
        		location.href = "menu.html";
        	}
    	};
	that.init = init;
	return that;
})();