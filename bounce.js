const border = {height: 800, width: 800}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.canvas.height = border.height;
ctx.canvas.width = border.width;

let previous = 0;

window.requestAnimationFrame(run);

const objects = Array.from(Array(20)).map((_, index) =>
    new Ball({
      color: getRandomColor(),
      position: {x: Math.random() * 300, y: 0},
    }
))

async function run(next) {
  const delta = next - previous;
  previous = next;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  await Promise.all(objects.map((item, id) => item.update({ id, delta, border, objects })));
  await Promise.all(objects.map((item) => item.draw(ctx)));

  window.requestAnimationFrame(run);
}


let posX = 0;
let velocity = 0;

function square(delta) {

  velocity += 0.95 / delta;
  posX += velocity;
  ctx.fillStyle = 'green';
  ctx.fillRect(10, posX, 150, 100);
}
