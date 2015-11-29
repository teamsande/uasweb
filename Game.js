var game = new Phaser.Game(1100, 600, Phaser.AUTO, 'game');
var count = 0;

      //  The core game loop

   var PhaserGame = function () {

       this.background = null;
       this.foreground = null;

       this.player = null;
        this.boss = null;
       this.cursors = null;
       this.speed = 300;

       this.weapons = [];
       this.patterns = [];
       this.currentWeapon = 0;
       this.currentPattern = 0;
       this.weaponName = null;

   };

   PhaserGame.prototype = {

       init: function () {

           this.game.renderer.renderSession.roundPixels = true;

           this.physics.startSystem(Phaser.Physics.ARCADE);

       },


   preload: function () {

              this.load.image('player', 'assets/ship.png');
              this.load.image('boss', 'assets/ship.png');

              this.load.image('bullet5', 'assets/bullet5.png');

          },

          create: function () {

                      this.weapons.push(new Weapon.ScatterShot(this.game));
                      this.patterns.push(new BossWeapon.ScatterShot(this.game));
                      this.patterns.push(new BossWeapon.RingShot(this.game));
                      this.patterns.push(new BossWeapon.SweepingShot(this.game));

                      this.currentWeapon = 0;
                      this.currentPattern = 0;


                      this.player = this.add.sprite(64, 200, 'player');
                      this.boss = this.add.sprite(550, 0, 'boss');
                      this.player.anchor.setTo(0.5,0.5);
                      this.player.angle += 270;

                      this.physics.arcade.enable(this.player);
                      this.physics.arcade.enable(this.boss);

                      this.player.body.collideWorldBounds = true;


                      this.cursors = this.input.keyboard.createCursorKeys();

                      this.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

                  },

          update: function () {
            count++;

           this.player.body.velocity.set(0);

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

           if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
           {
               this.weapons[0].fire(this.player);
           }

           if(count > 200){
             count =  0;
             this.currentPattern = this.game.rnd.between(0,this.patterns.length-1);
           }

           this.patterns[this.currentPattern].fire(this.boss);
           for(var i = 0; i < this.patterns.length; i++){
           if(this.physics.arcade.overlap(this.player, this.patterns[i].bullets, null, null, this)){
             this.player.kill();
           }
         }

       }

   };

   game.state.add('Game', PhaserGame, true);
