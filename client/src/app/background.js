window.addEventListener("resize", drawBackground, false);
function drawBackground() {
  const backgroundCanvas = document.getElementById("background-canvas");
  const ctx = backgroundCanvas.getContext("2d");

  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;
  backgroundCanvas.width = canvasWidth;
  backgroundCanvas.height = canvasHeight;

  const hmTimes = Math.round(canvasWidth + canvasHeight);

  for (let i = 0; i <= hmTimes; i++) {
    const randomX = Math.floor(Math.random() * canvasWidth + 1);
    const randomY = Math.floor(Math.random() * canvasHeight + 1);
    const randomSize = Math.floor(Math.random() * 2 + 1);
    const randomOpacityOne = Math.floor(Math.random() * 9 + 1);
    const randomOpacityTwo = Math.floor(Math.random() * 9 + 1);
    const randomHue = Math.floor(Math.random() * 360 + 1);
    if (randomSize > 1) {
      ctx.shadowBlur = Math.floor(Math.random() * 15 + 5);
      ctx.shadowColor = "white";
    }
    ctx.fillStyle =
      "hsla(" +
      randomHue +
      ", 30%, 80%, ." +
      randomOpacityOne +
      randomOpacityTwo +
      ")";
    ctx.fillRect(randomX, randomY, randomSize, randomSize);
  }
}
drawBackground();

/*

  // STAR ARRAY
  let starArray = [];

  function Star(x, y, dx, dy, radius, lightness, opacity, randomHue) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.lightness = lightness;
    this.opacity = opacity;
    this.randomHue = randomHue;
    this.isDimming = false;

    this.draw = function() {
      ctx.fillStyle =
        "hsla(" +
        this.randomHue +
        ", 30%, 80%, ." +
        this.lightness +
        this.opacity +
        ")";
      ctx.fillRect(this.x, this.y, this.radius, this.radius);
    };

    this.update = function() {
      // ADD SHADOW BLUR TO STARS WITH RADIUS BIGGER THAN 1
      if (this.radius > 1) {
        ctx.shadowBlur = Math.floor(Math.random() * 15 + 5);
        ctx.shadowColor = "white";
      }

      this.draw();
    };
  }

  // CREATE NEW INSTANCE OF STAR
  for (let i = 0; i < 500; i++) {
    // RANDOM VERIABLES FOR EACH STAR
    let radius = Math.floor(Math.random() * 2 + 1);
    let x = Math.floor(Math.random() * canvasWidth + 1);
    let y = Math.floor(Math.random() * canvasHeight + 1);
    let dx = (Math.random() - 0.5) * 3;
    let dy = (Math.random() - 0.5) * 3;
    let lightness = Math.floor(Math.random() * 9 + 1);
    let opacity = Math.floor(Math.random() * 9 + 1);
    let randomHue = Math.floor(Math.random() * 360 + 1);

    // PUSH TO ARRAY
    starArray.push(
      new Star(x, y, dx, dy, radius, lightness, opacity, randomHue)
    );
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // DRAW STARS
    starArray.forEach(function(star) {
      star.update();
    });
  }

  animate();

  
    // BOUNCE BACK FROM MAXIMUM WIDTH
      if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }

      // BOUNCE BACK FROM MAXIMUM HEIGHT
      if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }
       this.x += this.dx;
      this.y += this.dy;

      if (this.opacity < 1 && this.isDimming === false) {
        this.opacity += 0.01;
      }
      if (this.opacity >= 1) {
        this.isDimming = true;
      }
      if (this.isDimming === true) {
        this.opacity -= 0.01;
      }
      if (this.opacity <= 0.7) {
        this.isDimming = false;
      }




      function drawing() {
	var c = document.getElementById('sky');
	var ctx = c.getContext('2d');
	var xMax = c.width = window.screen.availWidth;
	var yMax = c.height = window.screen.availHeight;

	var hmTimes = Math.round(xMax + yMax);	
	
	for(var i=0; i<=hmTimes; i++) {
	  var randomX = Math.floor((Math.random()*xMax)+1);
	  var randomY = Math.floor((Math.random()*yMax)+1);
	  var randomSize = Math.floor((Math.random()*2)+1);
	  var randomOpacityOne = Math.floor((Math.random()*9)+1);
	  var randomOpacityTwo = Math.floor((Math.random()*9)+1);
	  var randomHue = Math.floor((Math.random()*360)+1);
    if(randomSize>1) {
      ctx.shadowBlur = Math.floor((Math.random()*15)+5);
      ctx.shadowColor = "white";
	  }
    ctx.fillStyle = "hsla("+randomHue+", 30%, 80%, ."+randomOpacityOne+randomOpacityTwo+")";
	  ctx.fillRect(randomX, randomY, randomSize, randomSize);
	}
  
}
drawing();

*/
