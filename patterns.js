var BossWeapon = {};

BossWeapon.ScatterShot = function (game) {

       Phaser.Group.call(this, game, game.world, 'boss scatter Shot', false, true, Phaser.Physics.ARCADE);

       this.nextFire = 0;
       this.bulletSpeed = 300;
       this.fireRate = 20;
       this.bullets = game.add.physicsGroup();
       this.currentBullet = 0;
       this.maxBullet = 100;

       for (var i = 0; i < this.maxBullet; i++)
       {
           this.bullets.add(new BossBullet(game, 'bullet'), true);
       }

       return this;

   };

   BossWeapon.ScatterShot.prototype = Object.create(Phaser.Group.prototype);
   BossWeapon.ScatterShot.prototype.constructor = BossWeapon.ScatterShot;

   BossWeapon.ScatterShot.prototype.fire = function (source) {

       if (this.game.time.time < this.nextFire) { return; }

       var y = source.y + 16;
       var x = source.x + 5;
       //var x = (source.x + source.width / 2) + this.game.rnd.between(-7, 7) - 20;
       var ang = this.game.rnd.between(170,10);

       this.bullets.children[this.currentBullet].fire(x, y, ang, this.bulletSpeed, 0, 0);
       this.currentBullet ++;
       if (this.currentBullet >= this.maxBullet){
         this.currentBullet = 0;
       }

       this.nextFire = this.game.time.time + this.fireRate;

   };

   BossWeapon.RingShot = function (game) {

          Phaser.Group.call(this, game, game.world, 'boss ring shot', false, true, Phaser.Physics.ARCADE);

          this.nextFire = 0;
          this.bulletSpeed = 300;
          this.fireRate = 700;

          this.bullets = game.add.physicsGroup();
          this.currentBullet = 0;
          this.maxBullet = 250;

          for (var i = 0; i < this.maxBullet; i++)
          {
              this.bullets.add(new BossBullet(game, 'bullet'), true);
          }

          return this;

      };

      BossWeapon.RingShot.prototype = Object.create(Phaser.Group.prototype);
      BossWeapon.RingShot.prototype.constructor = BossWeapon.RingShot;

      BossWeapon.RingShot.prototype.fire = function (source) {

          if (this.game.time.time < this.nextFire) { return; }

          var y = source.y + 16;
          var x = source.x + 5;
          var ang = this.game.rnd.between(30,10);

          for (var n = 0; n < 14; n ++)
          {
            this.bullets.children[this.currentBullet].fire(x, y, ang, this.bulletSpeed, 0, 0);
            this.currentBullet ++;
            if (this.currentBullet >= this.maxBullet){
              this.currentBullet = 0;
            }
            ang += 10;
          }

          this.nextFire = this.game.time.time + this.fireRate;

      };

      BossWeapon.SweepingShot = function (game) {

             Phaser.Group.call(this, game, game.world, 'boss sweeping Shot', false, true, Phaser.Physics.ARCADE);

             this.nextFire = 0;
             this.bulletSpeed = 300;
             this.fireRate = 10;

             this.ang = 170;
             this.diff = -2;
             this.count = 0;
             this.shoot = true;

             this.bullets = game.add.physicsGroup();
             this.currentBullet = 0;
             this.maxBullet = 200;

             for (var i = 0; i < this.maxBullet; i++)
             {
                 this.bullets.add(new BossBullet(game, 'bullet'), true);
             }


             return this;

         };

         BossWeapon.SweepingShot.prototype = Object.create(Phaser.Group.prototype);
         BossWeapon.SweepingShot.prototype.constructor = BossWeapon.SweepingShot;

         BossWeapon.SweepingShot.prototype.fire = function (source) {
           this.count ++;

             if (this.game.time.time < this.nextFire) { return; }

             var y = source.y + 16;
             var x = source.x + 5;

            if(this.shoot == true){
              this.bullets.children[this.currentBullet].fire(x, y, this.ang, this.bulletSpeed, 0, 0);
              this.currentBullet ++;
              if (this.currentBullet >= this.maxBullet){
                this.currentBullet = 0;
              }
            }
             this.ang += this.diff;
             if(this.ang > 170 || this.ang < 10){
               this.diff = this.diff * -1;
             }
             if(this.count > this.game.rnd.between(47,70)&& this.shoot == true){
               this.shoot = false;
               this.count = 0;
             }

             if(this.count > 10 && this.shoot == false){
               this.shoot = true;
               this.count = 0;
             }



             this.nextFire = this.game.time.time + this.fireRate;

         };


         BossWeapon.StraightShot = function (game) {

                Phaser.Group.call(this, game, game.world, 'boss straight Shot', false, true, Phaser.Physics.ARCADE);

                this.nextFire = 0;
                this.bulletSpeed = 300;
                this.fireRate = 100;
                this.bullets = game.add.physicsGroup();
                this.currentBullet = 0;
                this.maxBullet = 400;

                for (var i = 0; i < this.maxBullet; i++)
                {
                    this.bullets.add(new BossBullet(game, 'bullet'), true);
                }


                return this;

            };

            BossWeapon.StraightShot.prototype = Object.create(Phaser.Group.prototype);
            BossWeapon.StraightShot.prototype.constructor = BossWeapon.StraightShot;

            BossWeapon.StraightShot.prototype.fire = function (source) {

                if (this.game.time.time < this.nextFire) { return; }

                var y = source.y + 16;
                var x = source.x + 5;
                var ang = 90;

                this.bullets.children[this.currentBullet].fire(x, y, ang, this.bulletSpeed, 0, 0);
                this.currentBullet ++;
                if (this.currentBullet >= this.maxBullet){
                  this.currentBullet = 0;
                }
                this.bullets.children[this.currentBullet].fire(x, y, ang+30, this.bulletSpeed, 0, 0);
                this.currentBullet ++;
                if (this.currentBullet >= this.maxBullet){
                  this.currentBullet = 0;
                }
                this.bullets.children[this.currentBullet].fire(x, y, ang-30, this.bulletSpeed, 0, 0);
                this.currentBullet ++;
                if (this.currentBullet >= this.maxBullet){
                  this.currentBullet = 0;
                }
                this.bullets.children[this.currentBullet].fire(x, y, ang+60, this.bulletSpeed, 0, 0);
                this.currentBullet ++;
                if (this.currentBullet >= this.maxBullet){
                  this.currentBullet = 0;
                }
                this.bullets.children[this.currentBullet].fire(x, y, ang-60, this.bulletSpeed, 0, 0);
                this.currentBullet ++;
                if (this.currentBullet >= this.maxBullet){
                  this.currentBullet = 0;
                }
                this.bullets.children[this.currentBullet].fire(x, y, ang+80, this.bulletSpeed, 0, 0);
                this.currentBullet ++;
                if (this.currentBullet >= this.maxBullet){
                  this.currentBullet = 0;
                }
                this.bullets.children[this.currentBullet].fire(x, y, ang-80, this.bulletSpeed, 0, 0);
                this.currentBullet ++;
                if (this.currentBullet >= this.maxBullet){
                  this.currentBullet = 0;
                }

                this.nextFire = this.game.time.time + this.fireRate;

            };
