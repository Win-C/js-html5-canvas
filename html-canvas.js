"use strict";

const canvas = document.querySelector('#draw');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth; // Canvas defaults to 800x800
canvas.height = window.innerHeight;

context.strokeStyle = '#BADA55'; // color for drawing
context.lineJoin = 'round'; // what happens when line meets another line
context.lineCap = 'round'; // end of line
context.lineWidth = 100; // end of line
context.globalCompositeOperation = 'multiply';

let isDrawing = false; // flag to track mouse click for drawing
let lastX = 0; // end coord for line to stop
let lastY = 0; // end coord for line to stop
let hue = 0;
let direction = true;

/** Function called when mouse moves on canvas */
function draw(evt) {
  if (!isDrawing) return; // stop the fn from running when not moused down
  console.log(evt);
  context.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  // Seting up line below
  context.beginPath();
  // Start from
  context.moveTo(lastX, lastY);
  // Go to
  context.lineTo(evt.offsetX, evt.offsetY);

  // Start stroke
  context.stroke();

  // Update lastX and lastY
  [lastX, lastY] = [evt.offsetX, evt.offsetY];
  hue = hue > 360 ? 0 : hue+=1;

  if (context.lineWidth >= 100 || context.lineWidth <= 1){
    direction = !direction;
  }

  context.lineWidth = direction? context.lineWidth+=1: context.lineWidth-=1;
}

canvas.addEventListener('mousedown', (evt) => {
  isDrawing = true;
  [lastX, lastY] = [evt.offsetX, evt.offsetY]; // set starting point
});

// Click and drag functionality
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
