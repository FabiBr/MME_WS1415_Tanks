OptionsMenu = (function() {
    var that = {},
        init = function(test){
            document.getElementById("startgame").onclick = function () {
                popup = document.getElementById("Popup");
                player1 = (document.getElementById("nameOne").value);
                player2 = (document.getElementById("nameTwo").value);
                color1 = (document.getElementById("colorOne").value);
                color2 = (document.getElementById("colorTwo").value);
                localStorage.setItem(1,player1);
                localStorage.setItem(2,player2);
                localStorage.setItem(3,color1);
                localStorage.setItem(4,color2);
                
                //Ab ins Game
                var colorcheck = (color1==color2),
                    namecheck = (player1.length < 1 || player2.length < 1);
                if(namecheck){
                    console.log(popup);
                    popup.style.visibility = "visible"; 
                    popup.innerHTML = "Bitte alle Eingabefelder ausfüllen!!!";
                }
                if(colorcheck){
                    console.log("color");
                    popup.style.visibility = "visible";
                    popup.innerHTML = "Bitte zwei verschiedene Farben verwenden!!!";
                }
                if(!colorcheck && !namecheck){
                location.href = "game.html";
                }
            }
        };
    that.init = init;
    return that;
})();