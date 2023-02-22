import p5 from 'p5';

new p5(p => {
  p.setup = function() {
    p.createCanvas(400, 400);
  };

  p.draw = function() {
    p.background(220);
    p.ellipse(p.width / 2, p.height / 2, 50, 50);
  };
});