

export class RectangleF {
    constructor(p, min, max) {
        this.p = p;
        this.min = min;
        this.max = max;
    }

    get left() {
        return this.min.x;
    }
    get right() {
        return this.max.x;
    }
    get top() {
        return this.max.y;
    }
    get bottom() {
        return this.min.y;
    }

    get width() {
        return this.max.x - this.min.x;
    }
    get height() {
        return this.max.y - this.min.y;
    }

    static empty(p) {
        return new RectangleF(p, p.createVector(), p.createVector());
    }

    /*
        public RectangleF(float x, float y, float width, float height)
        {
            Min.X = x;
            Min.Y = y;
            Max.X = x + width;
            Max.Y = y + height;
        }
    */
    static box(p, x, y, w, h) {
        return new RectangleF(p, p.createVector(x, y), p.createVector(x + w, x + h));
    }

    static minMax(p) {
        return new RectangleF(p, p.createVector(-Infinity, -Infinity), p.createVector(Infinity, Infinity));
    }

    get center() {
        return p5.Vector.add(this.min, this.max).div(2);
    }

    get position() {
        return this.min;
    }

    get isZero() {
        return this.min.x === 0 && this.min.y === 0 && this.max.x === 0 && this.max.y === 0;
    }

    contains(x, y) {
        return this.min.x<= x && this.min.y <= y && this.max.x >= x && this.max.y>= y;
    }

    containsVector(vector) {
        return this.min.x<= vector.x && this.min.y <= vector.y && this.max.x >= vector.x && this.max.y>= vector.y;
    }

    containsRef(vector, result) {
        result[0] = this.min.x<= vector.x && this.min.y <= vector.y && this.max.x >= vector.x && this.max.y>= vector.y;
    }

    containsRect(rect) {
        return this.min.x<= rect.min.x && this.min.y <= rect.min.y && this.max.x >= rect.max.x && this.max.y>= rect.max.y;
    }

    containsRectRef(rect, result) {
        result[0] = this.min.x<= rect.min.x && this.min.y <= rect.min.y && this.max.x >= rect.max.x && this.max.y>= rect.max.y;
    }

    intersects(rect) {
        return this.min.x<rect.max.x && this.min.y < rect.max.y && this.max.x > rect.min.x && this.max.y> rect.min.y;
    }

    intersectsRef(rect, result) {
        result[0] = this.min.x<rect.max.x && this.min.y < rect.max.y && this.max.x > rect.min.x && this.max.y> rect.min.y;
    }
    static Intersect(p, rect1, rect2) {
        let num8 = rect1.Max.x;
        let num7 = rect2.Max.x;
        let num6 = rect1.Max.y;
        let num5 = rect2.Max.y;
        let num2 = rect1.Min.x > rect2.Min.x ? rect1.Min.x : rect2.Min.x;
        let num = rect1.Min.y > rect2.Min.y ? rect1.Min.y : rect2.Min.y;
        let num4 = num8 < num7 ? num8 : num7;
        let num3 = num6 < num5 ? num6 : num5;

        if (num4 > num2 && num3 > num) {
            return new RectangleF(this.p, p.createVector(num2, num), p.createVector(num4, num3));
        }

        return RectangleF.Empty;
    }
    static IntersectRef(p, rect1, rect2, result) {
        let num8 = rect1.Max.x;
        let num7 = rect2.Max.x;
        let num6 = rect1.Max.y;
        let num5 = rect2.Max.y;
        let num2 = rect1.Min.x > rect2.Min.x ? rect1.Min.x : rect2.Min.x;
        let num = rect1.Min.y > rect2.Min.y ? rect1.Min.y : rect2.Min.y;
        let num4 = num8 < num7 ? num8 : num7;
        let num3 = num6 < num5 ? num6 : num5;

        if (num4 > num2 && num3 > num) {
            result._p = this.p;
            result._min = p.createVector(num2, num);
            result._max = p.createVector(num4, num3);
        } else {
            result._p = p.createVector(0, 0);
            result._min = p.createVector(0, 0);
            result._max = p.createVector(0, 0);
        }
    }
    static Union(p, rect1, rect2) {
        let result = new RectangleF();

        let num6 = rect1.Max.X;
        let num5 = rect2.Max.X;
        let num4 = rect1.Max.Y;
        let num3 = rect2.Max.Y;
        let num2 = (rect1.Min.X<rect2.Min.X) ? rect1.Min.X : rect2.Min.X;
    let num = (rect1.Min.Y < rect2.Min.Y) ? rect1.Min.Y : rect2.Min.Y;
    let num8 = (num6 > num5) ? num6 : num5;
    let num7 = (num4>num3) ? num4 : num3;

        result.Min = p.createVector(num2, num);
        result.Max = p.createVector(num8, num7);

        return result;
    }

    static UnionRef(p, rect1, rect2, result) {
        let num6 = rect1.Max.X;
        let num5 = rect2.Max.X;
        let num4 = rect1.Max.Y;
        let num3 = rect2.Max.Y;
        let num2 = (rect1.Min.X<rect2.Min.X) ? rect1.Min.X : rect2.Min.X;
    let num = (rect1.Min.Y < rect2.Min.Y) ? rect1.Min.Y : rect2.Min.Y;
    let num8 = (num6 > num5) ? num6 : num5;
    let num7 = (num4>num3) ? num4 : num3;

        result.Min = p.createVector(num2, num);
        result.Max = p.createVector(num8, num7);
    }

    equals(other) {
        return(this.Min.X === other.Min.X && this.Min.Y === other.Min.Y && this.Max.X === other.Max.X && this.Max.Y === other.Max.Y);
    }

    hashCode() {
        return this.Min.hashCode() + this.Max.hashCode();
    }

    static operatorEquals(a, b) {
        return(a.Min.X === b.Min.X && a.Min.Y === b.Min.Y && a.Max.X === b.Max.X && a.Max.Y === b.Max.Y);
    }

    static operatorNotEquals(a, b) {
        return(a.Min.X !== b.Min.X || a.Min.Y !== b.Min.Y || a.Max.X !== b.Max.X || a.Max.Y !== b.Max.Y);
    }

    static operatorPlus(rect, v) {
        return new RectangleF(rect.Min.add(v), rect.Max.add(v));
    }

    equalsObj(obj) {
        if (obj instanceof RectangleF) {
            return RectangleF.operatorEquals(this, obj);
        }

        return false;
    }
}
