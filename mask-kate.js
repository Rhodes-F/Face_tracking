/* globals allMasks  Vector2D, drawContour */

allMasks["clown mask"] = {
  title: "a bad pennywise",
  description: "A bunch of techniques",
  setup(p) {
    p.clear()
    
  },

  draw(p, face) {
    p.clear()
    p.background(0, 0, 0, .01);
    let t = p.millis() * 0.001;

  
    face.sides.forEach((side, sideIndex) => {
      p.fill(100)
      p.stroke(100)
      drawContour(p, side.face[0], {
        close: true, 
        curve: false
      })
      
      p.fill(0);
      p.stroke(0)
      p.circle(...side.eyeCenter, 10);
      // p.circle(...side.eyeInner, 3);
      // p.circle(...side.eyeOuter, 3);
      
      
      p.fill(360,100,50,1)
      p.circle(...side.eyeTop, 3);
      p.circle(...side.eyeBottom, 3);

      
      p.stroke(0);
      
       
      
      drawRibbon(p, side.eye[0].slice(0, 10), side.eye[1].slice(0, 10), {
        curve: true,
        close: true,
        
        side0: {
          lerpToPoint: side.eyeCenter,
          lerpPct: (index, pct) => {
            return -1*p.noise(pct*100 + t)*pct
          }
        },
        side1: {
          lerpToPoint: side.eyeCenter,
          lerpPct: -1,
        }
      });
    });
    
    
    
    p.circle(...face.bottom, 20);
    p.circle(...face.nose, 20);
    
    drawContour(p, face.mouth[0], {
        close: true,
        lerpToPoint: face.bottom,
        lerpPct: p.noise(3*t, 0)
      })
    
    p.fill(0)
    drawContour(p, face.mouth[1], {
        close: true,
        lerpToPoint: face.bottom,
        lerpPct: p.noise(3*t, 0)
      })
     
  },
};
