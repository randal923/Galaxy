// START GAME
function startGame() {
  const canvas = document.getElementById("game-canvas"),
    c = canvas.getContext("2d");
  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  document.getElementById("game-canvas").style.display = "block";

  // AUDIO

  // MUSIC
  const music = new Audio();
  music.src = "./audio/racing-car.mp3";
  music.volume = 0.2;
  music.play();
  music.loop = true;
  music.controls = true;

  // GUN
  // creating channell to store many instances of the audio
  function Channel(audio_uri) {
    this.audio_uri = audio_uri;
    this.resource = new Audio(audio_uri);
  }

  Channel.prototype.play = function() {
    // Try refreshing the resource altogether
    this.resource.play();
  };

  function Switcher(audio_uri, num) {
    this.channels = [];
    this.num = num;
    this.index = 0;

    for (var i = 0; i < num; i++) {
      this.channels.push(new Channel(audio_uri));
    }
  }

  Switcher.prototype.play = function() {
    this.channels[this.index++].play();
    this.index = this.index < this.num ? this.index : 0;
  };

  const pew = new Switcher("audio/pew.mp3", 20);

  // EXPLOSION
  // creating channell to store many instances of the audio
  function Channel(audio_uri) {
    this.audio_uri = audio_uri;
    this.resource = new Audio(audio_uri);
  }

  Channel.prototype.play = function() {
    // Try refreshing the resource altogether
    this.resource.play();
  };

  function Switcher(audio_uri, num) {
    this.channels = [];
    this.num = num;
    this.index = 0;

    for (var i = 0; i < num; i++) {
      this.channels.push(new Channel(audio_uri));
    }
  }

  Switcher.prototype.play = function() {
    this.channels[this.index++].play();
    this.index = this.index < this.num ? this.index : 0;
  };

  const explosion = new Switcher("audio/explosion.mp3", 5);

  // VARIABLES
  let score = 0,
    lastTime = 0;
  paused = false;

  // KEYS EVENT LISTENERS
  addEventListener("mouseup", function() {
    if (!paused) {
      fire();
      pew.play();
      setInterval;
    }
  });

  window.addEventListener("mousemove", function(event) {
    player.x = event.clientX;
  });

  // PLAYER SETUP
  let player = {},
    player_width = 90,
    player_height = 95,
    player_img = new Image();
  player_img.src = "img/ship.svg";

  // CREATE PLAYER
  player = {
    width: player_width,
    height: player_height,
    x: innerWidth / 2 - player_width / 2,
    y: innerHeight - (player_height + 20),
    life: 5,
    draw: function() {
      if (this.x <= 0) {
        this.x = 0;
      } else if (this.x >= innerWidth - this.width) {
        this.x = innerWidth - this.width;
      }

      if (this.y <= 0) {
        this.y = 0;
      } else if (this.y >= innerHeight - this.height) {
        this.y = innerHeight - this.height;
      }

      c.drawImage(player_img, this.x, this.y, this.width, this.height);
    }
  };

  //EXPLOSION GIF

  //SETUP
  let explosionIndex = 0;

  const explosionsArray = [];

  function explosionGif(x, y) {
    this.cols = 10;
    this.srcX = 0;

    // get img
    this.img = new Image();
    this.img.src = "img/explosion-sheet.png";

    // Position where the frame will be drawn
    this.x = x;
    this.y = y;

    this.sheetWidth = 2301;
    this.sheetHeight = 300;

    this.rows = 1;

    this.width = this.sheetWidth / this.cols;
    this.height = this.sheetHeight / this.rows;

    explosionIndex++;
    explosionsArray[explosionIndex] = this;
    this.id = explosionIndex;

    (this.currentFrame = 0), (this.currentTick = 0), (this.lastTick = 3);

    this.updateFrame = function() {
      if (this.currentTick < this.lastTick) {
        this.currentTick += 1;
      } else {
        this.currentFrame = ++this.currentFrame % this.cols;
        this.srcX = this.currentFrame * this.width;
        this.currentTick = 0;
      }
      if (this.currentFrame === 9) {
        this.delete();
      }
      this.draw();
    };

    console.log(explosionsArray[this.id]);

    this.delete = function() {
      delete explosionsArray[this.id];
    };

    this.draw = function() {
      c.drawImage(
        this.img,
        this.srcX,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        80,
        80
      );
    };
  }

  function create_explosion(x, y) {
    new explosionGif(x, y);
  }

  // ENEMY SETUP
  let enemyArray = [],
    enemyIndex = 0,
    enemy_width = 50,
    enemy_height = 50,
    enemy_timer = 500,
    enemy_img = new Image();
  enemy_img.src = "img/ufo.svg";

  // CREATE ENEMY OBJECT
  function enemy(x, y, dx, dy, enemy_img, enemy_width, enemy_height, rotation) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.img = enemy_img;
    this.width = enemy_width;
    this.height = enemy_height;
    this.rotation = rotation;
    enemyIndex++;
    enemyArray[enemyIndex] = this;
    this.id = enemyIndex;

    if (this.rotation < 0.2) {
      this.dx = -this.dx;
    } else if (this.rotation > 0.7) {
      this.dx = -this.dx;
    } else {
      this.dx = 0;
      this.dy = this.dy;
    }

    this.update = function() {
      this.y += this.dy;
      this.x += this.dx;

      if (this.x + this.width >= innerWidth) {
        this.dx = -this.dx;
      } else if (this.x <= 0) {
        this.dx = Math.abs(this.dx);
      }

      if (this.y > innerHeight + this.height) {
        this.delete();
      }

      this.draw();
    };

    this.delete = function() {
      delete enemyArray[this.id];
    };

    this.draw = function() {
      //img, sx, sy, swidth, sheight, x, y, width, height
      c.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
  }

  // CREATE ENEMY FUNCTION
  function create_enemy() {
    const x = Math.random() * (innerWidth - enemy_width);
    const y = -enemy_height;
    const dx = 3;
    const dy = 3;
    const rotation = Math.random();

    new enemy(x, y, dx, dy, enemy_img, enemy_width, enemy_height, rotation);
  }

  // BULLETS SETUP
  let bulletsArray = [],
    bulletIndex = 0,
    bullet_width = 8,
    bullet_height = 10,
    speed = 15;

  //CREATE BULLET OBJECT
  function bullet(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;

    bulletIndex++;
    bulletsArray[bulletIndex] = this;
    this.id = bulletIndex;

    this.update = function() {
      this.y += -this.speed;
      if (this.y < -this.height) {
        delete this.delete();
      }
      this.draw();
    };

    this.delete = function() {
      delete bulletsArray[this.id];
    };
    this.draw = function() {
      c.beginPath();
      c.rect(this.x, this.y, this.width, this.height);
      c.fillStyle = "#fff";
      c.fill();
      c.stroke();
    };
  }

  // FIRE BULLETS
  function fire() {
    const x = player.x + player.width / 2 - bullet_width / 2;
    const y = player.y;
    new bullet(x, y, bullet_width, bullet_height, speed);
  }

  // COLLISION FUNCTION
  function collides(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  // DETECT COLLISION
  function handleCollisions() {
    bulletsArray.forEach(function(bullet) {
      enemyArray.forEach(function(enemy) {
        if (collides(bullet, enemy)) {
          create_explosion(enemy.x, enemy.y);
          bullet.delete();
          enemy.delete();
          explosion.play();
          score += 10;
        }
      });
    });

    enemyArray.forEach(function(enemy) {
      if (collides(player, enemy)) {
        player.life += -1;
        enemy.delete();
      }
    });
  }

  // ANIMATION LOOP

  function animate(currentTime) {
    const animation = requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    // SCORE
    c.font = "18px MontSerrat";
    c.fillStyle = "#fff";
    c.fillText("SCORE: " + score, 10, 22);

    // PLAYER LIFE
    c.font = "18px MontSerrat";
    c.fillStyle = "#fff";
    c.fillText("Life: " + player.life, innerWidth - 108, 22);

    // DRAW PLAYER
    player.draw();

    // CREATE NEW ENEMY EVERY X SECONDS
    if (currentTime >= lastTime + enemy_timer) {
      lastTime = currentTime;
      create_enemy();
    }

    // UPDATE ENEMY POSITIONS
    enemyArray.forEach(function(enemy) {
      enemy.update();
    });

    // UPDATE BULLETS POSITIONS
    bulletsArray.forEach(function(bullet) {
      bullet.update();
    });

    // UPDATE EXPLOSIONS
    explosionsArray.forEach(function(explosion) {
      explosion.updateFrame();
    });

    // DETECT COLLISIONS
    handleCollisions();

    if (player.life <= 0) {
      cancelAnimationFrame(animation);
      console.log("You Lose");
      music.pause();
      paused = true;
    }
  }
  animate();
}
