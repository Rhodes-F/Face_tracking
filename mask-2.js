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
      

      p.fill(200,100,50 - 50*Math.cos(t))
      p.stroke(100);
      
       
      
      drawRibbon(p, side.eye[0].slice(0, 10), side.eye[4].slice(0, 10), {
        curve: true,
        close: true,
        
        side0: {
          lerpToPoint: side.eyeCenter,
          lerpPct: (index, pct) => {
            return -7*p.noise(pct*100 + t)*pct
          }
        },
        side1: {
          // lerpToPoint: side.eyeCenter,
          // lerpPct: -1,
        }
      });


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
