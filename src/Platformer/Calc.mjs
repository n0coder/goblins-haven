export class Calc {
     static closestPointOnLine(p, lineA, lineB, closestTo) {
        const v = p5.Vector.sub(lineB, lineA);
        const w = p5.Vector.sub(closestTo, lineA);
        let t = p5.Vector.dot(w, v) / p5.Vector.dot(v, v);
        t = p.constrain(t, 0, 1);
      
        return p5.Vector.add(lineA, p5.Vector.mult(v, t));
      }
      
       static crossProduct(A, B) {
        return A.x * B.y - B.x * A.y;
      }
      
}