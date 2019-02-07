function startGame() {
  const canvas = document.getElementById("explosion"),
    c = canvas.getContext("2d");
  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  let currentFrame = 0,
    currentTick = 0,
    tickStart = 0;
  function explosion(x, y) {
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

    this.updateFrame = function() {
      console.log(currentTick, tickStart);

      if (currentTick - tickStart > 3) {
        console.log("tick: ", currentTick);

        tickStart = currentTick;
        currentFrame = ++currentFrame % this.cols;
        console.log(currentFrame);
      }

      this.srcX = currentFrame * this.width;
      this.lastFrame = currentFrame;
      currentTick++;
    };

    this.draw = function() {
      this.updateFrame();
      c.drawImage(
        this.img,
        this.srcX,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        200,
        200
      );
    };
  }

  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    const exp = new explosion(200, 200);
    exp.draw();
  }
  animate();
}

startGame();
