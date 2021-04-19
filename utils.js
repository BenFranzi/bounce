function hasCollision(a, b) {
  const dx = a.position.x - b.position.x;
  const dy = a.position.y - b.position.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance < a.radius + b.radius;
}

function getRandomColor() {
  var r = Math.floor(Math.random() * 256);
  var g =Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function dot(a, b) {
  return a.x * b.x + a.y * b.y
}

function reflect(angle, velocity) {
  const normal = { x: Math.sin(angle), y: -Math.cos(angle) };
  const d = 2 * dot(normal, velocity);
  const x = velocity.x - d * normal.x;
  const y = velocity.y - d * normal.y;
  return {x, y};
}
