import MergeSort from './mergesort.js';
import { Animation } from './animations.js';

// Get the HTML elements
document.addEventListener('DOMContentLoaded', function () {
    const btnNext = document.querySelector("#btnNext");
    const btnPrev = document.querySelector("#btnPrev");
    const slider = document.querySelector("#slider");
    const canvas = document.querySelector("#canvas");

    // Set canvas dimensions
    const width = 800;
    const height = 400;
    canvas.width = width;
    canvas.height = height;

    // Generate an initial dataset
    let data = generateData(50, height);

    // Initialize the MergeSort algorithm
    let algorithm = new MergeSort(data);

    // Initialize the Animation object
    let animation = new Animation(canvas, algorithm, width, height, 5);

    // Add event listeners to the buttons and slider
    btnNext.addEventListener("click", function () {
        animation.next();
    });

    btnPrev.addEventListener("click", function () {
        animation.prev();
    });

    slider.addEventListener("input", function () {
        animation.setSpeed(this.value);
    });

    // Add event listener to generate new dataset when 'R' key is pressed
    document.addEventListener("keypress", function (event) {
        if (event.key === "R" || event.key === "r") {
            data = generateData(50, height);
            algorithm = new MergeSort(data);
            animation.setAlgorithm(algorithm);
            animation.start(); // start animation again with new data
        }
    });

    // Start the animation loop
    animation.start();

    // Generate a dataset of random heights
    function generateData(numBars, maxHeight) {
        let data = new Array(numBars).fill().map(() => Math.floor(Math.random() * maxHeight) + 1);
        return data;
    }
});
