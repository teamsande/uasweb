var game = new Phaser.Game(1100, 600, Phaser.AUTO, 'game');

      //  The core game loop

   var PhaserGame = function () {

       this.background = null;
       this.foreground = null;

       this.player = null;
       this.cursors = null;
       this.speed = 300;

       this.weapons = [];
       this.currentWeapon = 0;
       this.weaponName = null;

   };

   PhaserGame.prototype = {

       init: function () {

           this.game.renderer.renderSession.roundPixels = true;

           this.physics.startSystem(Phaser.Physics.ARCADE);

       },


   preload: function () {

              this.load.image('player', 'assets/ship.png');

              this.load.image('bullet5', 'assets/bullet5.png');

          },

          create: function () {

                      this.weapons.push(new Weapon.ScatterShot(this.game));

                      this.currentWeapon = 0;

                      for (var i = 1; i < this.weapons.length; i++)
                      {
                          this.weapons[i].visible = false;
                      }

                      this.player = this.add.sprite(64, 200, 'player');
                      this.player.anchor.setTo(0.5,0.5);
                      this.player.angle += 270;

                      this.physics.arcade.enable(this.player);

                      this.player.body.collideWorldBounds = true;

                      this.foreground = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'foreground');
                      this.foreground.autoScroll(-60, 0);


                      this.cursors = this.input.keyboard.createCursorKeys();

                      this.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

                  },

          update: function () {

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
               this.weapons[this.currentWeapon].fire(this.player);
           }

       }

   };

   game.state.add('Game', PhaserGame, true);
