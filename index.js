// const { loop } = require('./loop');

const canvas = document.getElementById('mycanvas')
const ctx = canvas.getContext('2d')
const width = window.innerWidth
const height = window.innerHeight
ctx.canvas.width = width
ctx.canvas.height = height
ctx.fillStyle = 'green'

let size = 30
let offset = 5
let delta = 1

const diameter = 100
const radius = diameter / 2

const w = width / diameter
const h = height / diameter

for (let i = 0; i < w; i++) {
  for (let j = 0; j < h; j++) {
    ctx.strokeStyle = COLOR_LINE_MEAN
    ctx.beginPath()
    ctx.arc(radius * (2 * i + 1), radius * (2 * j + 1), radius, 0, 2 * Math.PI)
    ctx.stroke()
  }
}

// setInterval(() => {
//   ctx.clearRect(0, 0, width, height);
//   ctx.fillRect(offset, offset, size, size);
//   offset += delta;
//
//   if (offset > width) offset = 0;
// }, 2);

// const step = () => {
//   ctx.clearRect(0, 0, width, height);
//   ctx.fillRect(
//     offset + 10 * Math.random(),
//     offset + 10 * Math.random(),
//     size + 10 * Math.random(),
//     size + 10 * Math.random()
//   );
//   offset += delta;
//
//   if (offset > width) offset = 0;
//   window.requestAnimationFrame(step);
// };
//
// window.requestAnimationFrame(step);
