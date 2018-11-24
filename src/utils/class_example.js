export class example {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(x, y) {
        return x+y;
    }
}
export class calc extends example {
    constructor(x,y) {
        super(x,y)
        this.z = x+y;
    }
    mul(x,y) {
        return x*y
    }
    static div(a, b) {
        return a / b;
    }
}
