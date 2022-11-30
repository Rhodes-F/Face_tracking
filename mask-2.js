/* globals allMasks  Vector2D, drawRibbon, drawContour, drawPoints */

allMasks["sad guy"] = {
  title: "a guy with watery eyes",
  description: "idk",
  setup() {
    // p.clear()
  },

  draw(p, face) {
    p.clear();
    p.background(40, 100, 47, 0.5);
    let t = p.millis() * 0.001;

    face.sides.forEach((side, sideIndex) => {
      if (sideIndex == 0) {
        this.color = [144, 47, 28];
      } else {
        this.color = [348, 100, 37];
      }

      //background
      p.fill(100);
      p.stroke(100);
      p.beginShape();
      drawPoints(p, side.face[0].slice(0, 18));
      p.vertex(...face.bottom);
      p.endShape(p.CLOSE);

      //sides of the flag
      p.noStroke();
      p.fill(...this.color);
      side.face.forEach((contour, cIndex) => {
        drawContour(p, contour, {
          curve: true,
          close: true,
          lerpToPoint: face.bottom,
          // lerpPct: Math.sin(t),
          lerpPct(index, pct, pt) {
            return 0.2 * Math.sin(pct * 45 + 10 * t) - 1.2;
          },
        });
      });
      side.eye.forEach((contour, cIndex) => {
        p.fill(200, 100, 100 - cIndex * 17);
        drawContour(p, contour, {
          close: true,
          curve: true,
          lerpToPoint: side.eyeCenter,
          lerpPct(index, pct, pt) {
            return 0.075 * Math.sin(pct * 45 + 10 * t);
          },
        });
      });
      
    });
    face.mouth.forEach((contour, cIndex) => {
      p.fill(200, 0, 100 - cIndex * 17);
      drawContour(p, contour, {
        close: true,
        curve: true,
        lerpToPoint: face.nose,
        lerpPct(index, pct, pt) {
          return 0.075 * Math.sin(pct * 45 + 10 * t);
        },
      });
    });
  },
};
