class Ball {
  hasPassed = false;
  color;
  gravity;
  bounce;
  dampening;
  friction;
  radius;
  position;
  velocity;


  constructor({
      color = 'green',
      gravity = .98,
      bounce = .5,
      dampening= .1,
      friction= .1,
      radius = 50,
      position = { x: 0, y: 0 },
      velocity = { x: 0, y: 0 }
    }) {
    this.color = color;
    this.gravity = gravity;
    this.bounce = bounce;
    this.dampening = dampening;
    this.friction = friction;
    this.radius = radius;
    this.position = position;
    this.velocity = velocity;
  }

  update(params) {
    this.calculate(params);
    this.collide(params);
    this.collideBorder(params);
    this.dampen(params);
    this.finish(params);
    this.finish(params);
  }

  calculate({delta}) {
    this.velocity.y = this.velocity.y + this.gravity / delta;
  }

  collide({objects, id}) {
    objects.map((object, index) => {
      if (object.hasPassed) { return; }
      if (index === id) { return; }

      if (hasCollision(this, object)) {
        this.velocity = reflect(360, this.velocity);
      }
    });
  }

  collideBorder({border, delta}) {
    const { width, height } = border;


    if (this.position.x + this.radius >= width || this.position.x - this.radius <= 0) {
      this.velocity.x = -(this.velocity.x * this.bounce);
    }

    if (height <= this.position.y + this.radius) {
      this.velocity.y = -(this.velocity.y * this.bounce);
      this.velocity.x =  Math.sign(this.velocity.x) * (Math.abs(this.velocity.x) - (this.friction / delta));
    }
  }

  dampen() {
    this.velocity.x = Math.abs(this.velocity.x) > this.dampening ? this.velocity.x : 0;
    this.velocity.y = Math.abs(this.velocity.y) > this.dampening ? this.velocity.y : 0;
  }

  finish({border}) {
    const {height, width} = border;
    this.position.x = Math.min(Math.max(this.position.x + this.velocity.x, 0 + this.radius), width - this.radius);
    this.position.y = Math.min(Math.max(this.position.y + this.velocity.y, 0 + this.radius), width - this.radius);
    this.hasPassed = true;
  }

  draw(ctx) {
    this.hasPassed = false;
    ctx.beginPath();
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = this.color;
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }
}
