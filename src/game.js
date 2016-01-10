Game = {


    bulletInGame: false,
    tank1: "",
    tank2: "",
    current_tank: "",
    current_canon:"",
    canon1: "",
    canon2: "",
    health1: "",
    health2: "",
    damage1: "",
    damage2: "",
    wind: (Math.random()-0.5)*1.5,

    // Segments the Gamescreen into tiles
    map_grid: {

        width: Math.floor((window.innerWidth-25)/5),
        height: Math.floor((window.innerWidth-25)/16*9/5),
        tile: {
            width: 5,
            height: 5
        }
    },

    //Getter Methods to access the players from other classes
    tank1: function() {
        return this.tank1;
    },

    tank2: function() {
        return this.tank2;
    },

    canon1:function(){
        return this.canon1;
    },

    canon:function(){
        return this.canon2;
    },

    width: function() {
        return this.map_grid.width * this.map_grid.tile.width;
    },
    height: function() {
        return this.map_grid.height * this.map_grid.tile.height;
    },

    // Initialises the Map
    initMap: function() {
        var previousBox = Game.map_grid.height/3*2,
            max_height = Game.map_grid.height/4*3,
            min_height = Game.map_grid.height/3;

        Crafty.audio.add("scratch", "res/sound/drawing1.mp3");
        Crafty.audio.play("scratch");
        for (var x = 0; x <= Game.map_grid.width; x++) {
            var max_diff = 8,
                difference = Math.floor(Math.random()*max_diff),
                random = Math.floor(Math.random()*3)-1;

            if(difference == 0 || difference == 2){
                var y = previousBox - Math.abs(random);
                previousBox = y;
                Crafty.e('Groundbox').at(x--, Math.abs(y));
            } else if(difference == 1 || difference == 3) {
                var y = previousBox + Math.abs(random);
                previousBox = y;
                Crafty.e('Groundbox').at(x--, Math.abs(y));
            } else {
                var y = previousBox + random;
                if(y < min_height || y > max_height)y-=(random*2);//Höhenbegrenzung
                previousBox = y;
                Crafty.e('Groundbox').at(x, y);
                for(var i = y;i < 150;i++) {
                    Crafty.e('Groundbox').at(x, i);
                }
            }
        }

        Crafty.e('Ground').at(0,150).attr({
            w: window.innerWidth-427,
            h: 110
            }
        );

        //Wolken zeichnen
        Game.initClouds();

        //weltsperre links/rechts
        var leftBorder = Crafty.e('Ground').at(-7,-10);
        leftBorder.w += 30;
        leftBorder.h += window.innerWidth/2;

        var widthHere = Game.map_grid.width;
        var rightBorder = Crafty.e('Ground').at(299,-10);
        rightBorder.w += 30;
        rightBorder.h += window.innerWidth/2;

        //Weltsperre oben
        var topBorder = Crafty.e('Ground').at(-10,-7);
        topBorder.w = Game.width();
        topBorder.h += 30;

        //Vegetation zeichnen
        Game.initPlants();
    },


    // Sets the Tank of Player1 to the desired Color
    setTankOne: function(local3) {
        document.getElementById("playerOneName").style.borderColor = local3;
        switch(local3){
           case "#DD0000": Crafty.sprite("res/img/tank_red.gif",        {spr_red:[0,0,1181,721]});
           /*red*/         Crafty.sprite("res/img/canon_red.gif",       {canon:[0,0,1181,721]});break;
           case "#0044CC": Crafty.sprite("res/img/tank_blue.gif",       {spr_red:[0,0,1181,721]});
           /*blue*/        Crafty.sprite("res/img/canon_blue.gif",      {canon:[0,0,1181,721]});break;
           case "#FFD700": Crafty.sprite("res/img/tank_yellow.gif",     {spr_red:[0,0,1181,721]});
           /*yellow*/      Crafty.sprite("res/img/canon_yellow.gif",    {canon:[0,0,1181,721]});break;
           default:        Crafty.sprite("res/img/tank_green.gif",      {spr_red:[0,0,1181,721]});
           /*green*/       Crafty.sprite("res/img/canon_green.gif",     {canon:[0,0,1181,721]});break;
        }
    },

    // Sets the Tank of Player2 to the desired Color
    setTankTwo: function(local4) {
        document.getElementById("playerTwoName").style.borderColor = local4;
        switch(local4){
           case "#00DD00":  Crafty.sprite("res/img/tank_green.gif",     {spr_red:[0,0,1181,721]});
            /*green*/       Crafty.sprite("res/img/canon_green.gif",    {canon:[0,0,1181,721]});break;
           case "#0044CC":  Crafty.sprite("res/img/tank_blue.gif",      {spr_red:[0,0,1181,721]});
           /*bluen*/        Crafty.sprite("res/img/canon_blue.gif",     {canon:[0,0,1181,721]});break;
           case "#FFD700":  Crafty.sprite("res/img/tank_yellow.gif",    {spr_red:[0,0,1181,721]});
           /*yellow*/       Crafty.sprite("res/img/canon_yellow.gif",   {canon:[0,0,1181,721]});break;
           default:         Crafty.sprite("res/img/tank_red.gif",       {spr_red:[0,0,1181,721]});
           /*red*/          Crafty.sprite("res/img/canon_red.gif",      {canon:[0,0,1181,721]});break;
        }
    },


    // Initialises Clouds and Wind
    initClouds: function(){
        Crafty.sprite("res/img/cloud.gif", {spr_cloud:[0,0,1082,517]});
        var cloud1 = Crafty.e('Cloud'),
            cloud2 = Crafty.e('Cloud'),
            cloud3 = Crafty.e('Cloud');
        cloud1.attr({
            x: 130,
            y: 120
        });
        cloud2.attr({
            x: window.innerWidth-90,
            y: 80
        });
        cloud3.attr({
            x: window.innerWidth/2,
            y: 50
        });

        wind_dir = "e";
        setInterval(function(x){
            wind = Game.wind;
            if(cloud1.x >= window.innerWidth){
                cloud1.x = -cloud1.w;
            }else if(cloud1.x + cloud1.w <= 0){
                cloud1.x = window.innerWidth;
            }
            if(cloud2.x >= window.innerWidth){
                cloud2.x = -cloud2.w;
            }else if(cloud2.x + cloud2.w <= 0){
                cloud2.x = window.innerWidth;
            }
            if(cloud3.x >= window.innerWidth){
                cloud3.x = -cloud3.w;
            }else if(cloud3.x + cloud3.w <= 0){
                cloud3.x = window.innerWidth;
            }
            cloud1.move("e", wind);
            cloud2.move("e", wind);
            cloud3.move("e", wind);
        }, 1);
    },

    initPlants: function(){
      Crafty.sprite("res/img/tree.svg", {spr_tree:[0,0,800,1280]});
      Crafty.sprite("res/img/bush.svg", {spr_bush:[0,0,1280,800]});
      var bush1 = Crafty.e('Bush'),
          bush2 = Crafty.e('Bush'),
          tree1 = Crafty.e('Tree'),
          tree2 = Crafty.e('Tree'),
          tree3 = Crafty.e('Tree'),
          tree4 = Crafty.e('Tree');
      bush1.attr({
        x: Game.map_grid.width*2.5,
        y: 0
      });
      bush2.attr({
        x: Game.map_grid.width*1.5,
        y: 0
      });
      tree1.attr({
        x: Game.map_grid.width/2,
        y: 0
      });
      tree2.attr({
        x: Game.map_grid.width,
        y: 0
      });
      tree3.attr({
        x: Game.map_grid.width*2,
        y: 0
      });
      tree4.attr({
        x: Game.map_grid.width*3,
        y: 0
      });
    },

    // Initialises Players and Keyboard Controls
    initPlayers: function() {
        var playerOneEntity = document.getElementById("playerOneName"),
            playerTwoEntity = document.getElementById("playerTwoName");

        var first_picture,
            second_picture,
            local3 = localStorage.getItem(3),
            local4 = localStorage.getItem(4);

        Game.setTankOne(local3);
        canon1 = Crafty.e("Canon").at(20,20);
        canon1.origin(25,0);
        canon1.rotation = 180;
        tank1 = Crafty.e("Tank").at(20,20);

        Game.setTankTwo(local4);
        canon2 = Crafty.e("Canon").at((20+window.innerWidth/12),20);
        canon2.origin(25,0);
        canon2.rotation = 20;
        tank2 = Crafty.e("Tank").at((20+window.innerWidth/12),20);
        tank2.disableControl();
        tank2._angle = 160;

        Crafty.sprite(200, 200, "res/img/explosion.gif", {
        explo_sprite: [0,0]
        });




        damage1 = Crafty.e('Damage');
        damage1.attr({
            x: 120,
            y: 200,
            w: 30,
            h: 10
        });

        health1 = Crafty.e("Life");
        health1.attr({
            x: 120,
            y: 200,
            w: 30,
            h: 10
        });

        damage2 = Crafty.e('Damage');
            damage2.attr({
            x: 120,
            y: 200,
            w: 30,
            h: 10
        });

        health2 = Crafty.e("Life");
        health2.attr({
            x: 120,
            y: 200,
            w: 30,
            h: 10
        });



        setInterval(function(){
            health1.x = tank1.x;
            health1.y = tank1.y - 40;
            damage1.x = tank1.x;
            damage1.y = tank1.y - 40;
            health2.x = tank2.x;
            health2.y = tank2.y - 40;
            damage2.x = tank2.x;
            damage2.y = tank2.y - 40;
            canon1.x = tank1.x - 5;
            canon1.y = tank1.y + 5;
            canon2.x = tank2.x -5;
            canon2.y = tank2.y+5;
        }, 1);

        $(document).ready(function(){
            playerOneEntity.innerHTML = localStorage.getItem(1);
            playerTwoEntity.innerHTML = localStorage.getItem(2);
        });
    },

    //Updates the Healthbars by redrawing them
    redraw: function(){
        health1.destroy();
        health1 = Crafty.e("Life");
        health1.attr({
            x: tank1.x,
            y: tank1.y - 40,
            w: tank1._health,
            h: 10
        });
        health2.destroy();
        health2 = Crafty.e("Life");
        health2.attr({
            x: tank2.x,
            y: tank2.y - 40,
            w: tank2._health,
            h: 10
        });
    },

    // Switches the active Player when the Round ends (when bullets hits Terrain or Tank)
    switchPlayer: function(){
            if(current_tank==tank1){
                document.getElementById("playerTwoName").className="activePlayer";
                document.getElementById("playerOneName").className="pausedPlayer";
                current_tank=tank2;
                current_canon=canon2;
                tank1.disableControl();
                tank2.enableControl();
            }
            else{
                document.getElementById("playerTwoName").className="pausedPlayer";
                document.getElementById("playerOneName").className="activePlayer";
                current_tank=tank1;
                current_canon=canon1;
                tank1.enableControl();
                tank2.disableControl();
            }
            current_tank._fuel = 100;
            document.getElementById("fuel").innerHTML= "Strecke: " +200;
            power.innerHTML = "Stärke: "+current_tank._power;
            angle.innerHTML = "Winkel: "+current_tank._angle;
            gun.innerHTML   = bulletDisplay();
    },

    // Initialize and start our game
    start: function() {
        var  width = window.innerWidth-25;
        Crafty.init(width, width/16*9, "stage");
        Game.initMap();
        Game.initPlayers();
        current_tank = tank1;
        current_canon = canon1;

        var menuebutton   = document.getElementById("menuebutton"),
            newbutton     = document.getElementById("newbutton"),
            helpbutton     = document.getElementById("helpbutton"),
            gun           = document.getElementById("gun"),
            angle         = document.getElementById("angle"),
            power         = document.getElementById("power");


        //Clicklistener
        menuebutton.onclick = function(e){
            location.href = "index.html";
        }
        newbutton.onclick = function(e){
            location.reload();
        }
        helpbutton.onclick = function(e){
            Crafty.enterScene("help");
        }

        //Hover
        menuebutton.onmouseover = function(e){
            menuebutton.style.color = "#DD0000";
        }
        newbutton.onmouseover = function(e){
            newbutton.style.color = "#DD0000";
        }
        helpbutton.onmouseover = function(e){
            helpbutton.style.color = "#DD0000";
        }
        menuebutton.onmouseout = function(e){
            menuebutton.style.color = "#000000";
        }
        newbutton.onmouseout = function(e){
            newbutton.style.color = "#000000";
        }
        helpbutton.onmouseout = function(e){
            helpbutton.style.color = "#000000";
        }

        //Tastaturbefehle
        window.onkeyup = function(e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key == 32) {//Leertaste
                if(!Game.bulletInGame) {
                    shoot();
                    Game.bulletInGame = true;
                    tank1.disableControl();
                    tank2.disableControl();
                }
                //switchPlayer();
            }
            if(key == 65){//a
                if(current_tank._missile>0) current_tank._missile--;
                gun.innerHTML = bulletDisplay();
            }
            if(key == 68){//d
                if(current_tank._missile<1)current_tank._missile++;
                gun.innerHTML = bulletDisplay();
            }

        },

        bulletDisplay = function(){//Anzeige des Geschosstypus
            var display;
            if(current_tank._missile==0)display = "Normales Projektil";
            if(current_tank._missile==1)display = "Starkes Projektil x " + current_tank._bigMissiles ;
            return display;
        },

        //Tastaturbefehle
         window.onkeydown = function(e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if(key == 87){//w
                if(current_tank._power <30)
                current_tank._power ++;
                power.innerHTML = "Stärke: " + Math.round(current_tank._power);
            }
            if(key == 83) {//s;
                if(current_tank._power >5)
                current_tank._power --;
                power.innerHTML = "Stärke: " + Math.round(current_tank._power);

            }
            if(key == 40){//down arrow
                if(current_tank._angle>0)
                current_tank._angle --;
                angle.innerHTML = "Winkel: " + current_tank._angle;
                changeCanon();
            }
            if(key == 38){//up arrow
                if(current_tank._angle<180)
                current_tank._angle ++;
                angle.innerHTML = "Winkel: " + current_tank._angle;
                changeCanon();
            }


        },


        calculateShot = function() {
            var vector = current_tank._power/10,
                angular = current_tank._angle * (Math.PI / 180);

            vectorX = Math.cos(angular) * vector;
            vectorY = Math.sin(angular) * vector;
        },


        //Schuss
        shoot = function(){
            var vectorX,vectorY,bullet;

           //Wind ändern
            dir = dirchoose();
            bullet = bulletchoose(current_tank, dir);
            var myPower = current_tank._power,
                current_wind = Game.wind;

            var vector = current_tank._power/6,
                angular = current_tank._angle * (Math.PI / 180);
            vectorX = Math.cos(angular) * vector;
            vectorY = Math.sin(angular) * vector;

            setInterval(function(){
                bullet.x += vectorX;
                bullet.y -= vectorY;
                //bullet.move("e", vectorX);
                //bullet.move("n", vectorY);
                bullet.x = bullet.x+current_wind/5;
            }, 1);
        },

        //Kanone ausrichten
        changeCanon = function(){
            current_canon.rotation =  -current_tank._angle+180;//Rotiere diese Kanone
        },


        //Auswahl eines Geschosses
        bulletchoose = function(current_tank, dir){
            var bullet,
                corrX=-1,
                corrY=-1;

            switch(dir){
                    case "e":   corrX=+40;  corrY=0;    break;
                    case "ne":  corrX=+40;  corrY=0;    break;
                    case "n":   corrX=+20;  corrY=-10;  break;
                    case "nw":  corrX=-10;  corrY=0;    break;
                    case "w":   corrX=-10;  corrY=0;    break;
                    default: break;
            }

            if(current_tank._missile == 0) {//Wenn null -> kleines Geschoss
                bullet = Crafty.e('Bullet_small_missile');
                bullet.attr({
                    x: current_tank._x+corrX,
                    y: current_tank._y+corrY,
                    w: 5,
                    h: 5
                });
            }

            if(current_tank._missile ==1){//Wenn eins -> großes Geschoss
                current_tank._bigMissiles -= 1;
                if(current_tank._bigMissiles >= 0) {
                    bullet = Crafty.e('Bullet_big_missile');
                    bullet.attr({
                        x: current_tank._x+corrX,
                        y: current_tank._y+corrY,
                        w: 8,
                        h: 8
                    });
                } else {
                    bullet = Crafty.e('Bullet_small_missile');
                    bullet.attr({
                        x: current_tank._x+corrX,
                        y: current_tank._y+corrY,
                        w: 5,
                        h: 5
                    });
                }
            }
            return bullet;
        },

        //Richtung
        dirchoose = function(){//Je nach Intervall Himmelsrichtung
            var dir = "e",
                angleInt = current_tank._angle;
            if(angleInt<30){dir="e";}
            else if(angleInt<80){dir="ne";}
            else if(angleInt<100){dir="n";}
            else if(angleInt<150){dir="nw";}
            else if(angleInt<181){dir="w";}
            else {};
            return dir;
        };
    }
}
