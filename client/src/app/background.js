window.addEventListener("resize", drawBackground, false);

function drawBackground() {
    const backgroundCanvas = document.getElementById("background-canvas");

    if (backgroundCanvas) {
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
}
drawBackground();