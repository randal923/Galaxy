window.addEventListener("resize", portfolioCanvas, false);

function portfolioCanvas() {
  const portfolioCanvas = document.getElementById("portfolio-canvas");
  if (portfolioCanvas) {
    const ctx = portfolioCanvas.getContext("2d");

    const portfolioCanvasWidth = window.innerWidth;
    const portfolioCanvasHeight = window.innerHeight;
    portfolioCanvas.width = portfolioCanvasWidth;
    portfolioCanvas.height = portfolioCanvasHeight;

    function Circle(x, y, dx, dy, circleRadius) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.circleRadius = circleRadius;

      this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.circleRadius, 0, Math.PI * 2, false);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.stroke();
      };

      this.update = function() {
        if (
          this.x + this.circleRadius > portfolioCanvasWidth ||
          this.x - this.circleRadius < 0
        ) {
          this.dx = -this.dx;
        }
        if (
          this.y + this.circleRadius > portfolioCanvasHeight ||
          this.y - this.circleRadius < 0
        ) {
          this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      };
    }

    // CREATE CIRCLE
    let circleArray = [];

    for (let i = 0; i < 25; i++) {
      const circleRadius = 3;
      let x =
        Math.random() * (portfolioCanvasWidth - circleRadius * 2) +
        circleRadius;
      let y =
        Math.random() * (portfolioCanvasHeight - circleRadius * 2) +
        circleRadius;
      let dx = (Math.random() - 0.5) * 4;
      let dy = (Math.random() - 0.5) * 4;
      circleArray.push(new Circle(x, y, dx, dy, circleRadius));
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, portfolioCanvasWidth, portfolioCanvasHeight);

      for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
      }
    }
    animate();
  }
}
portfolioCanvas();
