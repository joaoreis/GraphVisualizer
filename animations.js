export class Animation {
    constructor(canvas, algorithm, width, height, delay) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.algorithm = algorithm;
        this.width = width;
        this.height = height;
        this.delay = delay;
        this.isAnimating = false;
        this.color = "blue"; // color of unsorted bars
        this.sortedColor = "green"; // color of sorted bars
        this.swappedIndexes = [];

        // Bind methods
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.setSpeed = this.setSpeed.bind(this);
        this.setAlgorithm = this.setAlgorithm.bind(this);
        this.animateSwap = this.animateSwap.bind(this);
        this.animateFinish = this.animateFinish.bind(this);
    }

    animate() {
        if (this.isAnimating) {
            if (this.algorithm.next()) {
                this.animateSwap();
                setTimeout(() => {
                    this.animate();
                }, this.delay);
            } else {
                this.animateFinish();
                if (this.algorithm.isSorted()) { // check if array is sorted
                    this.stop(); // stop animation if array is sorted
                }
            }
        }
    }



    start() {
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.animate();
        }
    }

    stop() {
        this.isAnimating = false;
    }

    next() {
        if (!this.isAnimating) {
            const isSorted = this.algorithm.getIsSorted();
            if (!isSorted) {
                if (this.algorithm.next()) {
                    this.animateSwap();
                } else {
                    this.animateFinish();
                    this.stop(); // stop animation loop when array is sorted
                }
            }
        }
    }


    prev() {
        if (!this.isAnimating) {
            this.algorithm.prev();
            this.draw();
        }
    }

    setSpeed(delay) {
        this.delay = delay;
    }

    setAlgorithm(algorithm) {
        this.algorithm = algorithm;
        this.swappedIndexes = [];
    }

    drawBars(data) {
        let numBars = data.length;
        let width = this.width / numBars;
        let heightScale = this.height / Math.max(...data);
        for (let i = 0; i < numBars; i++) {
            let height = data[i] * heightScale;
            let x = i * width;
            let y = this.height - height;
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(x, y, width, height);
        }
    }

    animateSwap() {
        let i = this.algorithm.getI();
        let j = this.algorithm.getJ();
        let data = this.algorithm.getData();

        // Save swapped indexes for later use in animateFinish
        this.swappedIndexes = [j, j + 1];

        // Animate the swap
        let x1 = j * (this.width / data.length);
        let y1 = this.height - data[j];
        let x2 = (j + 1) * (this.width / data.length);
        let y2 = this.height - data[j + 1];
        let frames = 10;
        let dx = (x2 - x1) / frames;
        let dy = (y2 - y1) / frames;
        let count = 0;
        let interval = setInterval(() => {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.drawBars(data);
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(x1, y1, this.width / data.length, data[j]);
            this.ctx.fillRect(x2, y2, this.width / data.length, data[j + 1]);
            x1 += dx;
            y1 += dy;
            x2 -= dx;
            y2 -= dy;
            count++;
            if (count >= frames) {
                clearInterval(interval);
                this.algorithm.incrementJ();
                this.draw();
            }
        }, this.delay);
    }

    animateFinish() {
        let data = this.algorithm.getData();

        // Animate the sorted array
        let numBars = data.length;
        let width = this.width / numBars;
        let colorIndex = 0;
        let interval = setInterval(() => {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.drawBars(data);
            for (let i = 0; i < numBars; i++) {
                if (i >= this.algorithm.left && i <= this.algorithm.right) {
                    this.ctx.fillStyle = this.sortedColor;
                } else {
                    this.ctx.fillStyle = this.color;
                }
                if (this.swappedIndexes.includes(i)) {
                    this.ctx.fillStyle = "red";
                }
                this.ctx.fillRect(i * width, this.height - data[i], width, data[i]);
            }
            colorIndex++;

            if (this.algorithm.isSorted()) {
                clearInterval(interval);
                this.stop();
            }
        }, this.delay);
    }
}

// Helper function to generate random array
function generateArray(size, max) {
    let arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * max) + 1);
    }
    return arr;
}