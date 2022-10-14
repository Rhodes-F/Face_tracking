/* globals Vector2D, Particle, ParticleSystem, p */

/*
 * Springs!
 */

class Edge {
  constructor(pt0, pt1, { strength = 1, easing = 0, length } = {}) {
    this.pt0 = pt0;
    this.pt1 = pt1;
    this.strength =strength;
    this.easing =easing;
    // Use the current length if there is no length specified
    this.length =
      length === undefined ? this.pt0.pos.getDistanceto(this.pt1.pos) : length;
  }
  
  ease(dt) {
    if (this.easing !== 0) {
//       Move both points closer
      // this.pt0.
    }
  }

  applyForces() {
    let offset = Vector2D.sub(this.pt1.pos, this.pt0.pos);
    let d = offset.magnitude;
    if (d > 0) {
      offset.div(d)
      this.stretch = d - length;
      let springAmt = this.stretch*this.strength
      this.pt0.springForce.addMultiple(offset, springAmt);
      this.pt1.springForce.addMultiple(offset, -springAmt);
      
      
    }
  }

  draw(p) {
    p.stroke(0);
    p.strokeWeight(4);
    p.line(...this.pt0.pos, ...this.pt1.pos);
  }
}

class SpringSystem extends ParticleSystem {
  static label = "🌀"; // Ignore the Glitch parse error
  static desc = "Spring physics"; // Ignore the Glitch parse error

  constructor() {
    // Make what particle, and how many?
    // Try different numbers of particles
    super(SpringParticle, 5);

    // We have particles, now we need to create edges
    this.edges = [];
    for (var i = 0; i < 2; i++) {
      this.particles.forEach((pt, index) => {
        let pt1 = this.particles[(i + index + 1) % this.particles.length];
        let e = new Edge(pt, pt1, {length: 100});
        this.edges.push(e);
      });
    }
  }
  
  beforeMove(p, dt) {
    // Before we move the particles, do something....
    // ... like adding a spring force!
     this.edges.forEach(e => e.applyForces())
  }

  draw(p) {
    // A little bit of trails!
    p.background(0, 0, 50, 1);

    this.edges.forEach((e) => e.draw(p));
    // The "super-class" draws the particles
    super.draw(p);
  }
}

//=========================================================================
//=========================================================================
//=========================================================================

class SpringParticle extends Particle {
  constructor(ps, index) {
    // ps: the particle system this particle belongs to
    // index: of all the particles in that system, this one's index
    super(ps, index);

    this.pos.setToRandom(0, p.width, 0, p.height);

    // We can also store other information about a particle, like its size or color
    this.hue = (index * 10) % 360;
    this.radius = 10;

    // Here's a new Vector2D we can store a force in so we can visualize it later
    this.attractionForce = new Vector2D();
    this.springForce = new Vector2D();
  }

  calculateForces(p, dt) {
    // What forces do we want to apply to this particle?
    // We can attract it to the center
    let center = new Vector2D(p.width / 2, p.height / 2);
    this.attractionForce = this.pos.getForceTowardsPoint(center, 0.5, {
      falloff: 2,
      startRadius: 200,
    });

    // // We can also make it attracted to the mouse
    // let mouse = new Vector2D(p.mouseX, p.mouseY)
    // // What happens if I change the falloff? 1 is linear, 2 is quadratic
    // this.attractionForce = this.pos.getForceTowardsPoint(mouse, 1, { falloff:1.2 } )
   

    // Whatever force we use, we won't see anything unless it is
    // added to the particle's main force, which gets added to the velocity
    this.f.add(this.attractionForce);
    this.f.add(this.springForce);
    
    // Spring forces add a lot of motion, drag can help
     this.v.mult(.96)
    this.v.constrainMagnitude(0, 500)
  }

  draw(p, drawDebug = false) {
    let t = p.millis() * 0.001;

    p.noStroke();
    p.fill(this.hue, 50, 50);
    p.circle(...this.pos, this.radius);
    p.fill(this.hue, 70, 60);
    p.circle(...this.pos, this.radius * 0.7);

    if (drawDebug) {
      this.pos.drawArrow(p, this.attractionForce, { m: 0.1 , color: [200, 100, 50]});
      this.pos.drawArrow(p, this.springForce, { m: 0.1, color: [280, 100, 50] });
    }
  }
}
