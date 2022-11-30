/* globals allMasks  Vector2D, drawRibbon, drawContour, drawPoints */

allMasks["white walker"] = {
  title: "a white walker from game of thrones",
  description: "a white walker from game of thrones",
  setup() {
    // p.clear()
  },

  draw(p, face) {
    p.clear();
    
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

      
      side.eye.forEach((contour, i) => {
        p.fill(200, 100, 100 - i * 17);
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
    face.mouth.forEach((contour, i) => {
      p.fill(200,100, 100 - i * 35,1);
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
