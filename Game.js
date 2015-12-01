var game = new Phaser.Game(1100, 600, Phaser.AUTO, 'game');

var score = 0;
var damage = 1;
var dealt = 0;
var count = 0;
var timer = 0;
var iamalive = 0;
var opaque = 0;
var timetodeath = 0;
var t;
var HPTime;
var stringt;


      //  The core game loop

    function collisionHandler (boss, ammo) {
        dealt = Math.round(Math.random()*5*damage)+1;
        score += dealt;
        ammo.kill();

    };

   var PhaserGame = function () {

       this.player = null;
        this.boss = null;
        this.bossmove = 30;
       this.cursors = null;
       this.speed = 300;

       this.weapons = [];
       this.patterns = [];
       this.currentWeapon = 0;
       this.currentPattern = 0;
       this.weaponName = null;
       this.pointer = 0;
       this.temptext = [100];
       this.acum = 0;

   };

   PhaserGame.prototype = {

       init: function () {

           this.game.renderer.renderSession.roundPixels = true;

           this.physics.startSystem(Phaser.Physics.ARCADE);

       },


   preload: function () {


              this.load.image('player', 'assets/player.png');
              //this.load.image('boss', 'assets/boss.png');

              this.load.image('bullet', 'assets/bullet.png');
              this.load.bitmapFont('gem', 'assets/gem.png', 'assets/gem.xml');
              this.load.spritesheet('boss', 'assets/boss.png', 50, 50, 16);


          },

          create: function () {
                      timetodeath = 60000;
	              
                      this.HPTime = this.add.text(this.world.centerX+450, this.world.centerY-270, timetodeath, {
                        font: "32px Arial",
                        fill: "#ff0044",
                        align: "center"
                      });
                      this.scoreText = this.add.bitmapText(30, 35, 'gem', score, 32);


                      this.stage.backgroundColor = 0x020b33;

                      this.weapons.push(new Weapon.ScatterShot(this.game));
                      this.patterns.push(new BossWeapon.ScatterShot(this.game));
                      this.patterns.push(new BossWeapon.RingShot(this.game));
                      this.patterns.push(new BossWeapon.SweepingShot(this.game));
                      this.patterns.push(new BossWeapon.StraightShot(this.game));


                      this.currentWeapon = 0;
                      this.currentPattern = 0;


                      this.player = this.add.sprite(64, 200, 'player');
                      this.player.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                      this.player.scale.set(0.3);
                      this.boss = this.add.sprite(550, 100, 'boss');
                      this.boss.animations.add('idle');
                      this.boss.animations.play('idle', 10, true);
                      this.boss.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                      this.boss.scale.set(3);
                      this.player.anchor.setTo(0.5,0.5);
                      this.boss.anchor.setTo(0.5,0.5);

                      this.physics.arcade.enable(this.player);
                      this.physics.arcade.enable(this.boss);

                      this.player.body.collideWorldBounds = true;
                        this.boss.body.collideWorldBounds = true;


                      this.cursors = this.input.keyboard.createCursorKeys();
                      for(var i = 0; i < 100; i++){
                      this.temptext[i] = this.add.bitmapText( 0, 0, 'gem', dealt, 24);
                      this.temptext[i].tint = 0xffff00;
                      this.physics.arcade.enable(this.temptext[i]);
                      this.temptext[i].body.velocity.y = -50;
                    }



                  },

          update: function () {

            this.scoreText.text = score;
            timetodeath--;
            if(timetodeath>=0) {
            this.HPTime.text = timetodeath;
            console.log(this.time.elapsed);
            count++;
            this.acum += this.time.elapsed;
            if(this.acum > timer + 10000){
              damage++;
              timer += 10000;
            }

           this.player.body.velocity.set(0);

           this.boss.body.acceleration.x = this.bossmove;
           if((this.boss.x > 650 && this.bossmove > 0) || (this.boss.x < 450 && this.bossmove < 0)){
             this.bossmove = this.bossmove * -1;
           }

           if (this.cursors.left.isDown)
           {
               this.player.body.velocity.x = -this.speed;
           }
           else if (this.cursors.right.isDown)
           {
               this.player.body.velocity.x = this.speed;
           }

           if (this.cursors.up.isDown)
           {
               this.player.body.velocity.y = -this.speed;
           }
           else if (this.cursors.down.isDown)
           {
               this.player.body.velocity.y = this.speed;
           }
           if(this.player.alive == true){
               this.weapons[0].fire(this.player);
             }

           if(count > 200){
             count =  0;
             this.currentPattern = this.game.rnd.between(0,this.patterns.length-1);
           }

           this.patterns[this.currentPattern].fire(this.boss);
           for(var i = 0; i < this.patterns.length; i++){
           if(this.physics.arcade.overlap(this.player, this.patterns[i].bullets, null, null, this) && this.player.alive == true){
             damage = 1;
             this.player.alive = false;
             timer = this.time.acum;
           }
         }

         if(this.physics.arcade.overlap(this.player, this.boss, null, null, this) && this.player.alive == true){
           damage = 1;
           this.player.alive = false;
           timer = this.time.elapsed;
         }


           if(this.player.alive == false){
             iamalive++;
             if(iamalive % 30 == 0 && opaque == 0){
               opaque = 1;
             }
             else if(iamalive % 30 == 0 && opaque == 1){
               opaque = 0;
             }
             this.player.alpha = opaque;
             if (iamalive > 100) {
               this.player.alpha = 1;
               this.player.alive = true;
               iamalive = 0;

             }

           }

           if(this.physics.arcade.overlap(this.boss, this.weapons[0].bullets, collisionHandler, null, this)){
             this.temptext[this.pointer].x = this.boss.x;
             this.temptext[this.pointer].y = this.boss.y;
             this.temptext[this.pointer].exists = true;
             this.temptext[this.pointer].lifespan = 1000;
             this.temptext[this.pointer].text = dealt;
             this.pointer++;
             if(this.pointer >= 100){
               this.pointer = 0;
             }

           }

       }
     }
   };

   game.state.add('Game', PhaserGame, true);
