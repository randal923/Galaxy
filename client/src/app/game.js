const gameButton = document.querySelector(".typing-effect__game-button");
if (gameButton) {
  gameButton.addEventListener("click", gameTimeOut);
}

const playAgainButton = document.querySelector(".popup__play-again");
if (playAgainButton) {
  playAgainButton.addEventListener("click", playAgain);
}

function gameTimeOut() {
  let gameTimer = 3;
  const gameButton = document.querySelector(".typing-effect__game-button");
  gameButton.disabled = true;

  // COUNT DOWN
  function countDown() {
    if (gameTimer > 0) {
      gameButton.innerHTML = "game will begin in " + gameTimer;
      gameTimer--;
    } else if (gameTimer === 0) {
      return (gameButton.innerHTML = "game will begin in " + 0);
    }

    setTimeout(countDown, 1000);
  }

  countDown();

  //START GAME IN X SECONDS
  setTimeout(function() {
    startGame();
  }, 4000);
}

// PLAY AGAIN
function playAgain() {
  let gameTimer = 3;
  const gameButton = document.querySelector(".popup__play-again");
  const popUp = document.querySelector(".popup");
  const popupContent = document.querySelector(".popup__container--content");
  const points = document.querySelector(".popup__container--points");
  gameButton.disabled = true;

  // COUNT DOWN
  function countDown() {
    if (gameTimer > 0) {
      gameButton.innerHTML = "game will begin in " + gameTimer;
      gameTimer--;
    } else if (gameTimer === 0) {
      return (gameButton.innerHTML = "game will begin in " + 0);
    }

    setTimeout(countDown, 1000);
  }

  countDown();

  //START GAME IN X SECONDS
  setTimeout(function() {
    gameButton.innerHTML = "PLAY AGAIN";
    gameButton.disabled = false;
    gameButton.style.display = "none";
    popUp.style.display = "none";
    popupContent.style.display = "none";
    points.style.display = "none";
    startGame();
  }, 4000);
}

// START GAME
function startGame() {
  const canvas = document.querySelector("#game-canvas"),
    c = canvas.getContext("2d");

  // CANVAS STYLING
  canvas.style.cursor = "none";
  canvas.draggable = false;
  document.querySelector(".typing-effect__game-button").style.display = "none";
  document.querySelector(".home-section").style.display = "none";
  document.querySelector("#game-canvas").style.display = "block";

  // CANVAS DIMENSIONS
  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  // AUDIO

  // GAME OVER
  const gameOver = new Audio();
  gameOver.src =
    "https://firebasestorage.googleapis.com/v0/b/galaxy-d7f5a.appspot.com/o/game-over.mp3?alt=media&token=e060b508-f5ea-4fdf-8d1f-c31edbe78953";
  gameOver.volume = 0.7;

  // MUSIC
  const music = new Audio();
  music.src =
    "https://firebasestorage.googleapis.com/v0/b/galaxy-d7f5a.appspot.com/o/racing-car.mp3?alt=media&token=19a83c23-cfbf-4ffc-ba50-4a2768d24e65";
  music.volume = 0.5;
  music.play();
  music.loop = true;

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

    for (let i = 0; i < num; i++) {
      this.channels.push(new Channel(audio_uri));
    }
  }

  Switcher.prototype.play = function() {
    this.channels[this.index++].play();
    this.index = this.index < this.num ? this.index : 0;
  };

  const pew = new Switcher(
    "https://firebasestorage.googleapis.com/v0/b/galaxy-d7f5a.appspot.com/o/pew.mp3?alt=media&token=fc04cab6-b675-4973-a308-3de4d5a723b9",
    20
  );

  pew.channels.forEach(function(pew) {
    pew.resource.volume = 0.5;
  });
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

    for (let i = 0; i < num; i++) {
      this.channels.push(new Channel(audio_uri));
    }
  }

  Switcher.prototype.play = function() {
    this.channels[this.index++].play();
    this.index = this.index < this.num ? this.index : 0;
  };

  const explosion = new Switcher(
    "https://firebasestorage.googleapis.com/v0/b/galaxy-d7f5a.appspot.com/o/explosion.mp3?alt=media&token=a0c6859b-8dcc-427b-8632-6c8c256a3680",
    5
  );

  explosion.channels.forEach(function(explosion) {
    explosion.resource.volume = 0.5;
  });

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

  // VARIABLES
  let score = 0,
    lastTime = 0;
  paused = false;

  // PLAYER SETUP
  let player_width = 90,
    player_height = 95,
    player_img = new Image();
  player_img.src =
    "https://firebasestorage.googleapis.com/v0/b/galaxy-d7f5a.appspot.com/o/ship.svg?alt=media&token=502a2fac-ac19-4d31-b40f-1dc9a98d0a3c";

  // CREATE PLAYER
  let player = {
    width: player_width,
    height: player_height,
    x: innerWidth - player_width,
    y: innerHeight - (player_height + 20),
    life: 200,
    xAdjust: this.width * 0.5,
    yAdjust: this.height * 0.5,
    update: function() {
      const maxMove = innerHeight / 4;
      if (this.y < maxMove) this.y += 1;
    },
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
      this.update();
    }
  };

  //EXPLOSION GIF

  //SETUP
  let explosionIndex = 0;

  let explosionsArray = [];

  function explosionGif(x, y) {
    this.cols = 10;
    this.srcX = 0;

    // get img
    this.img = new Image();
    this.img.src =
      "https://firebasestorage.googleapis.com/v0/b/galaxy-d7f5a.appspot.com/o/explosion-sheet.png?alt=media&token=71430327-f279-4351-bef9-4dbf663e9267";

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
  enemy_img.src =
    "https://firebasestorage.googleapis.com/v0/b/galaxy-d7f5a.appspot.com/o/ufo.svg?alt=media&token=0430660e-21ab-4d0c-b0e8-b7166ba5602a";

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
        score -= 50;
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
    bullet_width = 3,
    bullet_height = 13,
    speed = 10,
    shotsFired = 0;

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
      c.fillStyle = "yellow";
      c.fill();
    };
  }

  // FIRE BULLETS
  function fire() {
    const x = player.x + player.width / 2 - bullet_width / 2;
    const y = player.y;
    new bullet(x, y, bullet_width, bullet_height, speed);
    shotsFired++;
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
  let hitNumber = 0;
  function handleCollisions() {
    bulletsArray.forEach(function(bullet) {
      enemyArray.forEach(function(enemy) {
        if (collides(bullet, enemy)) {
          create_explosion(enemy.x, enemy.y);
          bullet.delete();
          enemy.delete();
          explosion.play();
          score += 10;
          hitNumber++;
        }
      });
    });

    // DECREASE PLAYER LIFE AND DELETE ENEMY IF IT COLIDES WITH PLAYER
    enemyArray.forEach(function(enemy) {
      if (collides(player, enemy)) {
        player.life += -20;
        enemy.delete();
      }
    });
  }

  // DELAY FOR HEALTH TO BECOME 0 AND BE DRAWN ON CANVAS (NEED BETTER SOLUTION)
  let delay = 0;
  let maxDelay = 2;

  // POP UP FOR END GAME AND CONTROLS
  const mainContainer = document.querySelector(".main-container");
  const popUp = document.querySelector(".popup");
  const playAgain = document.querySelector(".popup__play-again");

  // POP UP CONTENT
  const popupContent = document.querySelectorAll('*[key="popup-content"]');

  const popupPoints = document.querySelector(".popup__container--points");

  // TIME
  const timeText = document.querySelector(".time");
  const timeNumber = document.querySelector(".time-number");

  // SHOTS
  const shotsText = document.querySelector(".shots");
  const shotsNumber = document.querySelector(".shots-number");

  // ACCURACY
  const accuracyText = document.querySelector(".accuracy");
  const accuracyNumber = document.querySelector(".accuracy-number");

  // POP UP CLOCK
  let minutes = 0;
  let seconds = 0;
  setInterval(function() {
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    } else if (seconds < 60 && paused === false) {
      seconds++;
    }
  }, 1000);

  // ANIMATION LOOP
  function animate(currentTime) {
    const animation = requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    // SCORE
    c.font = "14px MontSerrat";
    c.fillStyle = "#fff";
    c.fillText(score + " POINTS", 10, 22);

    popupPoints.innerHTML = score + " points";

    timeText.innerHTML = "Time";
    timeNumber.innerHTML = minutes + "m" + " : " + seconds + "s";

    shotsText.innerHTML = "Shots";
    shotsNumber.innerHTML = shotsFired;

    let accuracy = Math.round((hitNumber / shotsFired) * 100) || 0;

    accuracyText.innerHTML = "Accuracy";
    accuracyNumber.innerHTML = accuracy + " %";

    // PLAYER LIFE
    // RED REC
    c.beginPath();
    c.rect(20, 20, 150, 30);
    c.fillStyle = "red";
    c.fillRect(10, 30, 200, 20);
    // YELLOW REC
    c.beginPath();
    c.rect(20, 20, 150, 30);
    c.fillStyle = "yellow";
    c.fillRect(10, 30, player.life, 20);

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

    // END GAME (NEED BETTER SOLUTION FOR DELAY)
    if (player.life === 0) {
      delay++;
    }
    if (delay === maxDelay) {
      music.pause();
      gameOver.play();
      paused = true;
      cancelAnimationFrame(animation);
      explosionsArray = [];
      enemyArray = [];
      bulletsArray = [];
      player = {};
      pew.channels = [];
      popUp.style.display = "flex";
      playAgain.style.display = "none";
      canvas.style.cursor = "default";
      setTimeout(function() {
        popupContent.forEach(function(element) {
          element.style.display = "block";
        });
        playAgain.style.display = "block";
      }, 1000);
    }
  }
  animate();
}
