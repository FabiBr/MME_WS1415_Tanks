Crafty.c('Grid', {
    init: function() {
        this.attr({
            w: Game.map_grid.tile.width,
            h: Game.map_grid.tile.height
        })
    },

    // Locate this entity at the given position on the grid
    at: function(x, y) {
        if (x === undefined && y === undefined) {
            return {
                x: this.x / Game.map_grid.tile.width,
                y: this.y / Game.map_grid.tile.height
            }
        } else {
            this.attr({
                x: x * Game.map_grid.tile.width,
                y: y * Game.map_grid.tile.height
            });
            return this;
        }
    }
});


Crafty.c('Ground', {
    init: function() {
        this.requires('2D, Canvas, Grid, Color, Gravity, Solid');
        this.color('rgb(20, 125, 40)');
        this.attr({
                w: Game.map_grid.tile.width,
                h: Game.map_grid.tile.height
            });
    },
});

Crafty.c('Groundbox', {
    init: function() {
        this.requires('Ground, NotQuietAsSolidAsThought,Collision');
        this.color('rgb(20, 125, 40)');
        this.attr({
                w: Game.map_grid.tile.width,
                h: Game.map_grid.tile.height
            });
    },
});

Crafty.c('Bullet_small_missile', {
    init: function() {
        this.requires('2D, Canvas, Color, Collision, Gravity, Bulletdamage')
            .destroyOnContact()
            .gravity()
        this.color('black');
    },


    destroyOnContact: function() {
        this.onHit('Solid', this.destroyBullet);
        this.onHit('Tanksolid', this.destroyBulletAndDamageTank);
        Crafty.audio.add("shoot", "res/sound/shot1.mp3");
        Crafty.audio.play("shoot");
        return this;

    },

    destroyBullet: function() {
        var explo = Crafty.e("Explosion").attr(
            { x: this.x-30, y: this.y-30, w: 60, h: 60 }
        );
        explo.bind("AnimationEnd", function () {
            explo.onHit("Tanksolid", explo.damageHitTanks());
            explo.onHit("NotQuietAsSolidAsThought", explo.destroyHitBoxes());
            explo.destroy();
        });
        this.destroy();
        Game.switchPlayer();
        Game.bulletInGame = false;
        Game.wind = (Math.random()-0.5)*1.5;
        return this;
    },
    destroyBulletAndDamageTank: function() {
        var explo = Crafty.e("Explosion").attr(
            { x: this.x-30, y: this.y-30, w: 60, h: 60 }
        );
        explo.bind("AnimationEnd", function () {
            explo.onHit("Tanksolid", explo.damageHitTanks());
            explo.onHit("NotQuietAsSolidAsThought", explo.destroyHitBoxes());
            explo.destroy();
        });
        this.destroy();
        Game.switchPlayer();
        Game.bulletInGame = false;
        Game.wind = (Math.random()-0.5)*1.5;
        return this;
    }
});

Crafty.c('Bullet_big_missile', {
    init: function() {
        this.requires('2D, Canvas, Color, Collision, Gravity, Bullet2damage')
            .destroyOnContact()
            .gravity()
            .color('red');
    },


    destroyOnContact: function() {
        this.onHit('Solid', this.destroyBullet);
        this.onHit('Tanksolid', this.destroyBulletAndDamageTank);
        Crafty.audio.add("shoot", "res/sound/shot1.mp3");
        Crafty.audio.play("shoot");
        return this;

    },

    destroyBullet: function() {
        var explo = Crafty.e("bigExplosion").attr(
            { x: this.x-45, y: this.y-45, w: 90, h: 90 }
        );
        explo.bind("AnimationEnd", function () {
            explo.onHit("Tanksolid", explo.damageHitTanks());
            explo.onHit("NotQuietAsSolidAsThought", explo.destroyHitBoxes());
            explo.destroy();
        });
        this.destroy();
        Game.switchPlayer();
        Game.bulletInGame = false;
        Game.wind = (Math.random()-0.5)*1.5;
        return this;
    },
    destroyBulletAndDamageTank: function() {
        var explo = Crafty.e("bigExplosion").attr(
            { x: this.x-45, y: this.y-45, w: 90, h: 90 }
        );
        explo.bind("AnimationEnd", function () {
            explo.onHit("Tanksolid", explo.damageHitTanks());
            explo.onHit("NotQuietAsSolidAsThought", explo.destroyHitBoxes());
            explo.destroy();
        });
        this.destroy();
        Game.switchPlayer();
        Game.bulletInGame = false;
        Game.wind = (Math.random()-0.5)*1.5;
        return this;
    }
});

Crafty.c("Explosion", {
    init: function () {
        this.requires("2D, Canvas, explo_sprite, SpriteAnimation, Collision");
        this.reel("Explosion", 1000, 0, 0, 3);
        this.animate("Explosion", 1);
        this.collision(new Crafty.circle(this.x + 30, this.y + 30, 30));
        Crafty.audio.add("boom", "res/sound/explosion1.mp3");
        Crafty.audio.play("boom");
    },
    
    damageHitTanks: function() {
        var hitTanks = this.hit("Tanksolid");
        if(hitTanks != false) {
            for(var i = 0; i< hitTanks.length; i++) {
                hitTanks[i].obj._health -= 3;
                Game.redraw();
                if(hitTanks[i].obj._health <= 0){
                    Crafty.enterScene("end");
                }
            }
        }
    },

    destroyHitBoxes: function() {
        var hitBoxes = this.hit("NotQuietAsSolidAsThought");
        if(hitBoxes != false) {
            hitBoxes.forEach(function(entry){
                entry.obj.destroy();
            });
        }
    },
});

Crafty.c("bigExplosion", {
    init: function () {
        this.requires("2D, Canvas, explo_sprite, SpriteAnimation, Collision");
        this.reel("Explosion", 1000, 0, 0, 3);
        this.animate("Explosion", 1);
        this.collision(new Crafty.circle(this.x + 45, this.y + 45, 45));
        Crafty.audio.add("boom", "res/sound/explosion1.mp3");
        Crafty.audio.play("boom");
    },
    
    damageHitTanks: function() {
        var hitTanks = this.hit("Tanksolid");
        if(hitTanks != false) {
            for(var i = 0; i< hitTanks.length; i++) {
                hitTanks[i].obj._health -= 6;
                Game.redraw();
                if(hitTanks[i].obj._health <= 0){
                    Crafty.enterScene("end");
                }
            }
        }
    },

    destroyHitBoxes: function() {
        var hitBoxes = this.hit("NotQuietAsSolidAsThought");
        if(hitBoxes != false) {
            hitBoxes.forEach(function(entry){
                entry.obj.destroy();
            });
        }
    },
});

Crafty.c('Tank', {
    _bigMissiles: 4,
    _health: 30,
    _fuel: 100,
    _power: 20,
    _angle:0,
    _missile:0,
    init: function() {
        this.requires('2D, Canvas, spr_red, Multiway, Gravity, Collision, Grid, Tanksolid')
            .multiway(2,{RIGHT_ARROW:0,LEFT_ARROW:180})
            .stopOnSolids()
            .getHit()
            .gravity("Ground")
            .attr({
                w: 40,
                h: 40
            })
            .movement();
    },

    handleMovement: function(){
        if(this._fuel<=0){
            this.stopTank();
        }
        else{
            this._fuel -= 0.5;
            document.getElementById("fuel").innerHTML= "Strecke: " +this._fuel*2;
        }
    },

    stopTank: function(){
        this.disableControl();
    },

    movement: function(){
        this.bind('Moved', this.handleMovement);
    },

    getHit: function() {
        this.onHit('Bulletdamage', this.hitBySmallBullet);
        this.onHit('Bullet2damage', this.hitByBigBullet);
        return this;
    },
    

    hitBySmallBullet: function() {
        this._health = this._health - 3;
        Game.redraw();
        if(this._health <= 0){
            /*
            if(this == tank1){
                canon1.destroy();
                health1.destroy();
                damage1.destroy();
            }
            else{
                canon2.destroy();
                health2.destroy();
                damage2.destroy();
            }
            this.destroy();
            */
            Crafty.enterScene("end");
        }

        return this;
    },

    hitByBigBullet: function() {
        this._health = this._health - 6;
        Game.redraw();
        if(this._health <= 0){
            /*
            if(this == tank1){
                canon1.destroy();
                health1.destroy();
                damage1.destroy();
            }
            else{
                canon2.destroy();
                health2.destroy();
                damage2.destroy();
            }
            this.destroy();
            */
            Crafty.enterScene("end");
        }
        return this;
    },


    // Registers a stop-movement function to be called when
    // this entity hits an entity with the "Solid" component
    stopOnSolids: function() {
        this.onHit('Solid', this.stopMovement);
        return this;
    },

    // Stops the movement
    stopMovement: function() {
        //this._speed = 0;
        if (this._movement) {
            this.move("n", Game.map_grid.tile.height/2.5);
            this.x -= this._movement.x;
            this.y -= this._movement.y;
        }
    }
});

Crafty.c('Canon', {
    init: function() {
        this.requires('2D, Canvas, canon, Grid')
            .attr({
                w: 50,
                h: 50
            });

    },
});

Crafty.c('Cloud', {
    init: function(){
        this.requires('2D, spr_cloud, Canvas, Grid')
        .attr({
            w: 140,
            h: 60
        });
    }
});

Crafty.c('Tree', {
    init: function(){
      this.requires('2D, spr_tree, Gravity, Canvas, Grid')
      .gravity("Ground")
      .attr({
        w: 40,
        h: 70
      });
    }
});

Crafty.c('Bush', {
    init: function(){
      this.requires('2D, spr_bush, Gravity, Canvas, Grid')
      .gravity("Ground")
      .attr({
        w: 60,
        h: 30
      });
    }
});

Crafty.c('Life', {
    init: function() {
        this.requires('2D, Canvas, Color')
        this.color('green');
    }
});
Crafty.c('Damage', {
    init: function() {
        this.requires('2D, Canvas, Color')
        this.color('red');
    }
});

Crafty.defineScene("help", function(){
    Crafty.background('url(../img/menubackground.jpg) no-repeat center center');
    Crafty.e("Title").text("Hilfe:").textFont({family: 'Comic Sans MS', size: '50px', weight: 'bold'});
    Crafty.e("Title").text("Sie steuern mit den Pfeiltasten die Fahrtrichtung und können den Winkel damit verändern").attr({y:100}).textFont({family: 'Comic Sans MS', size: '35px'});
    Crafty.e("Title").text("Mit den Tasten A und D können Sie das Projektil verändern").attr({y:210}).textFont({family: 'Comic Sans MS', size: '35px'});
    Crafty.e("Title").text("Mit den Tasten W und S können Sie die Schussstärke variieren").attr({y:320}).textFont({family: 'Comic Sans MS', size: '35px'});
    Crafty.e("Title").text("Zum Schießen einfach die Leertaste drücken").attr({y:430}).textFont({family: 'Comic Sans MS', size: '35px'});;
});

Crafty.defineScene("end", function(){
    Crafty.background('url(../img/menubackground.jpg) no-repeat center center');
    Crafty.e("Title").text("Spiel ist vorbei. Wählen Sie eine der Möglichkeiten unten aus!").textFont({family: 'Comic Sans MS', size: '50px', weight: 'bold'});
});

Crafty.c("Button", {
    init: function(){
        this.requires('DOM, 2D, Mouse, Hoverable')
            .css({"border": "solid thin black"})
            .attr({h: 20, w: 60});
    }
});

Crafty.c("Title", {
    init: function(){
        this.requires('DOM, 2D, Text')
            .text("Title")
            .css({"textAlign":"center"})
            .attr({h: 100, w: window.innerWidth/4*3});
    }
});
