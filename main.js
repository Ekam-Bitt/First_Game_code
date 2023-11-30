(() => {
  var Bn = Object.defineProperty,
    n = (r, t) => Bn(r, "name", { value: t, configurable: !0 }),
    Fn = (() => {
      for (var r = new Uint8Array(128), t = 0; t < 64; t++)
        r[t < 26 ? t + 65 : t < 52 ? t + 71 : t < 62 ? t - 4 : t * 4 - 205] = t;
      return (h) => {
        for (
          var c = h.length,
            f = new Uint8Array(
              (((c - (h[c - 1] == "=") - (h[c - 2] == "=")) * 3) / 4) | 0
            ),
            v = 0,
            T = 0;
          v < c;

        ) {
          var C = r[h.charCodeAt(v++)],
            Y = r[h.charCodeAt(v++)],
            A = r[h.charCodeAt(v++)],
            te = r[h.charCodeAt(v++)];
          (f[T++] = (C << 2) | (Y >> 4)),
            (f[T++] = (Y << 4) | (A >> 2)),
            (f[T++] = (A << 6) | te);
        }
        return f;
      };
    })();
  function Ne(r) {
    return (r * Math.PI) / 180;
  }
  n(Ne, "deg2rad");
  function Et(r) {
    return (r * 180) / Math.PI;
  }
  n(Et, "rad2deg");
  function He(r, t, h) {
    return t > h ? He(r, h, t) : Math.min(Math.max(r, t), h);
  }
  n(He, "clamp");
  function Ye(r, t, h) {
    if (typeof r == "number" && typeof t == "number") return r + (t - r) * h;
    if (
      (r instanceof E && t instanceof E) ||
      (r instanceof $ && t instanceof $)
    )
      return r.lerp(t, h);
    throw new Error(
      `Bad value for lerp(): ${r}, ${t}. Only number, Vec2 and Color is supported.`
    );
  }
  n(Ye, "lerp");
  function We(r, t, h, c, f) {
    return c + ((r - t) / (h - t)) * (f - c);
  }
  n(We, "map");
  function Ds(r, t, h, c, f) {
    return He(We(r, t, h, c, f), c, f);
  }
  n(Ds, "mapc");
  var E = class ye {
    static {
      n(this, "Vec2");
    }
    x = 0;
    y = 0;
    constructor(t = 0, h = t) {
      (this.x = t), (this.y = h);
    }
    static fromAngle(t) {
      let h = Ne(t);
      return new ye(Math.cos(h), Math.sin(h));
    }
    static LEFT = new ye(-1, 0);
    static RIGHT = new ye(1, 0);
    static UP = new ye(0, -1);
    static DOWN = new ye(0, 1);
    clone() {
      return new ye(this.x, this.y);
    }
    add(...t) {
      let h = M(...t);
      return new ye(this.x + h.x, this.y + h.y);
    }
    sub(...t) {
      let h = M(...t);
      return new ye(this.x - h.x, this.y - h.y);
    }
    scale(...t) {
      let h = M(...t);
      return new ye(this.x * h.x, this.y * h.y);
    }
    dist(...t) {
      let h = M(...t);
      return this.sub(h).len();
    }
    sdist(...t) {
      let h = M(...t);
      return this.sub(h).slen();
    }
    len() {
      return Math.sqrt(this.dot(this));
    }
    slen() {
      return this.dot(this);
    }
    unit() {
      let t = this.len();
      return t === 0 ? new ye(0) : this.scale(1 / t);
    }
    normal() {
      return new ye(this.y, -this.x);
    }
    reflect(t) {
      return this.sub(t.scale(2 * this.dot(t)));
    }
    project(t) {
      return t.scale(t.dot(this) / t.len());
    }
    reject(t) {
      return this.sub(this.project(t));
    }
    dot(t) {
      return this.x * t.x + this.y * t.y;
    }
    cross(t) {
      return this.x * t.y - this.y * t.x;
    }
    angle(...t) {
      let h = M(...t);
      return Et(Math.atan2(this.y - h.y, this.x - h.x));
    }
    angleBetween(...t) {
      let h = M(...t);
      return Et(Math.atan2(this.cross(h), this.dot(h)));
    }
    lerp(t, h) {
      return new ye(Ye(this.x, t.x, h), Ye(this.y, t.y, h));
    }
    slerp(t, h) {
      let c = this.dot(t),
        f = this.cross(t),
        v = Math.atan2(f, c);
      return this.scale(Math.sin((1 - h) * v))
        .add(t.scale(Math.sin(h * v)))
        .scale(1 / f);
    }
    isZero() {
      return this.x === 0 && this.y === 0;
    }
    toFixed(t) {
      return new ye(Number(this.x.toFixed(t)), Number(this.y.toFixed(t)));
    }
    transform(t) {
      return t.multVec2(this);
    }
    eq(t) {
      return this.x === t.x && this.y === t.y;
    }
    bbox() {
      return new Ve(this, 0, 0);
    }
    toString() {
      return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }
  };
  function M(...r) {
    if (r.length === 1) {
      if (r[0] instanceof E) return new E(r[0].x, r[0].y);
      if (Array.isArray(r[0]) && r[0].length === 2) return new E(...r[0]);
    }
    return new E(...r);
  }
  n(M, "vec2");
  var $ = class he {
    static {
      n(this, "Color");
    }
    r = 255;
    g = 255;
    b = 255;
    constructor(t, h, c) {
      (this.r = He(t, 0, 255)),
        (this.g = He(h, 0, 255)),
        (this.b = He(c, 0, 255));
    }
    static fromArray(t) {
      return new he(t[0], t[1], t[2]);
    }
    static fromHex(t) {
      if (typeof t == "number")
        return new he((t >> 16) & 255, (t >> 8) & 255, (t >> 0) & 255);
      if (typeof t == "string") {
        let h = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
        return new he(
          parseInt(h[1], 16),
          parseInt(h[2], 16),
          parseInt(h[3], 16)
        );
      } else throw new Error("Invalid hex color format");
    }
    static fromHSL(t, h, c) {
      if (h == 0) return new he(255 * c, 255 * c, 255 * c);
      let f = n(
          (te, b, K) => (
            K < 0 && (K += 1),
            K > 1 && (K -= 1),
            K < 1 / 6
              ? te + (b - te) * 6 * K
              : K < 1 / 2
              ? b
              : K < 2 / 3
              ? te + (b - te) * (2 / 3 - K) * 6
              : te
          ),
          "hue2rgb"
        ),
        v = c < 0.5 ? c * (1 + h) : c + h - c * h,
        T = 2 * c - v,
        C = f(T, v, t + 1 / 3),
        Y = f(T, v, t),
        A = f(T, v, t - 1 / 3);
      return new he(
        Math.round(C * 255),
        Math.round(Y * 255),
        Math.round(A * 255)
      );
    }
    static RED = new he(255, 0, 0);
    static GREEN = new he(0, 255, 0);
    static BLUE = new he(0, 0, 255);
    static YELLOW = new he(255, 255, 0);
    static MAGENTA = new he(255, 0, 255);
    static CYAN = new he(0, 255, 255);
    static WHITE = new he(255, 255, 255);
    static BLACK = new he(0, 0, 0);
    clone() {
      return new he(this.r, this.g, this.b);
    }
    lighten(t) {
      return new he(this.r + t, this.g + t, this.b + t);
    }
    darken(t) {
      return this.lighten(-t);
    }
    invert() {
      return new he(255 - this.r, 255 - this.g, 255 - this.b);
    }
    mult(t) {
      return new he(
        (this.r * t.r) / 255,
        (this.g * t.g) / 255,
        (this.b * t.b) / 255
      );
    }
    lerp(t, h) {
      return new he(Ye(this.r, t.r, h), Ye(this.g, t.g, h), Ye(this.b, t.b, h));
    }
    toHSL() {
      let t = this.r / 255,
        h = this.g / 255,
        c = this.b / 255,
        f = Math.max(t, h, c),
        v = Math.min(t, h, c),
        T = (f + v) / 2,
        C = T,
        Y = T;
      if (f == v) T = C = 0;
      else {
        let A = f - v;
        switch (((C = Y > 0.5 ? A / (2 - f - v) : A / (f + v)), f)) {
          case t:
            T = (h - c) / A + (h < c ? 6 : 0);
            break;
          case h:
            T = (c - t) / A + 2;
            break;
          case c:
            T = (t - h) / A + 4;
            break;
        }
        T /= 6;
      }
      return [T, C, Y];
    }
    eq(t) {
      return this.r === t.r && this.g === t.g && this.b === t.b;
    }
    toString() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    toHex() {
      return (
        "#" +
        ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b)
          .toString(16)
          .slice(1)
      );
    }
  };
  function W(...r) {
    if (r.length === 0) return new $(255, 255, 255);
    if (r.length === 1) {
      if (r[0] instanceof $) return r[0].clone();
      if (typeof r[0] == "string") return $.fromHex(r[0]);
      if (Array.isArray(r[0]) && r[0].length === 3) return $.fromArray(r[0]);
    }
    return new $(...r);
  }
  n(W, "rgb");
  var In = n((r, t, h) => $.fromHSL(r, t, h), "hsl2rgb"),
    pe = class zr {
      static {
        n(this, "Quad");
      }
      x = 0;
      y = 0;
      w = 1;
      h = 1;
      constructor(t, h, c, f) {
        (this.x = t), (this.y = h), (this.w = c), (this.h = f);
      }
      scale(t) {
        return new zr(
          this.x + this.w * t.x,
          this.y + this.h * t.y,
          this.w * t.w,
          this.h * t.h
        );
      }
      pos() {
        return new E(this.x, this.y);
      }
      clone() {
        return new zr(this.x, this.y, this.w, this.h);
      }
      eq(t) {
        return (
          this.x === t.x && this.y === t.y && this.w === t.w && this.h === t.h
        );
      }
      toString() {
        return `quad(${this.x}, ${this.y}, ${this.w}, ${this.h})`;
      }
    };
  function oe(r, t, h, c) {
    return new pe(r, t, h, c);
  }
  n(oe, "quad");
  var ke = class qe {
    static {
      n(this, "Mat4");
    }
    m = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    constructor(t) {
      t && (this.m = t);
    }
    static translate(t) {
      return new qe([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t.x, t.y, 0, 1]);
    }
    static scale(t) {
      return new qe([t.x, 0, 0, 0, 0, t.y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    static rotateX(t) {
      t = Ne(-t);
      let h = Math.cos(t),
        c = Math.sin(t);
      return new qe([1, 0, 0, 0, 0, h, -c, 0, 0, c, h, 0, 0, 0, 0, 1]);
    }
    static rotateY(t) {
      t = Ne(-t);
      let h = Math.cos(t),
        c = Math.sin(t);
      return new qe([h, 0, c, 0, 0, 1, 0, 0, -c, 0, h, 0, 0, 0, 0, 1]);
    }
    static rotateZ(t) {
      t = Ne(-t);
      let h = Math.cos(t),
        c = Math.sin(t);
      return new qe([h, -c, 0, 0, c, h, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    translate(t) {
      return (
        (this.m[12] += this.m[0] * t.x + this.m[4] * t.y),
        (this.m[13] += this.m[1] * t.x + this.m[5] * t.y),
        (this.m[14] += this.m[2] * t.x + this.m[6] * t.y),
        (this.m[15] += this.m[3] * t.x + this.m[7] * t.y),
        this
      );
    }
    scale(t) {
      return (
        (this.m[0] *= t.x),
        (this.m[4] *= t.y),
        (this.m[1] *= t.x),
        (this.m[5] *= t.y),
        (this.m[2] *= t.x),
        (this.m[6] *= t.y),
        (this.m[3] *= t.x),
        (this.m[7] *= t.y),
        this
      );
    }
    rotate(t) {
      t = Ne(-t);
      let h = Math.cos(t),
        c = Math.sin(t),
        f = this.m[0],
        v = this.m[1],
        T = this.m[4],
        C = this.m[5];
      return (
        (this.m[0] = f * h + v * c),
        (this.m[1] = -f * c + v * h),
        (this.m[4] = T * h + C * c),
        (this.m[5] = -T * c + C * h),
        this
      );
    }
    mult(t) {
      let h = [];
      for (let c = 0; c < 4; c++)
        for (let f = 0; f < 4; f++)
          h[c * 4 + f] =
            this.m[0 * 4 + f] * t.m[c * 4 + 0] +
            this.m[1 * 4 + f] * t.m[c * 4 + 1] +
            this.m[2 * 4 + f] * t.m[c * 4 + 2] +
            this.m[3 * 4 + f] * t.m[c * 4 + 3];
      return new qe(h);
    }
    multVec2(t) {
      return new E(
        t.x * this.m[0] + t.y * this.m[4] + this.m[12],
        t.x * this.m[1] + t.y * this.m[5] + this.m[13]
      );
    }
    getTranslation() {
      return new E(this.m[12], this.m[13]);
    }
    getScale() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let t = this.m[0] * this.m[5] - this.m[1] * this.m[4],
          h = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new E(h, t / h);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let t = this.m[0] * this.m[5] - this.m[1] * this.m[4],
          h = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new E(t / h, h);
      } else return new E(0, 0);
    }
    getRotation() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let t = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return Et(
          this.m[1] > 0 ? Math.acos(this.m[0] / t) : -Math.acos(this.m[0] / t)
        );
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let t = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return Et(
          Math.PI / 2 -
            (this.m[5] > 0
              ? Math.acos(-this.m[4] / t)
              : -Math.acos(this.m[4] / t))
        );
      } else return 0;
    }
    getSkew() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let t = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new E(
          Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (t * t),
          0
        );
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let t = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new E(
          0,
          Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (t * t)
        );
      } else return new E(0, 0);
    }
    invert() {
      let t = [],
        h = this.m[10] * this.m[15] - this.m[14] * this.m[11],
        c = this.m[9] * this.m[15] - this.m[13] * this.m[11],
        f = this.m[9] * this.m[14] - this.m[13] * this.m[10],
        v = this.m[8] * this.m[15] - this.m[12] * this.m[11],
        T = this.m[8] * this.m[14] - this.m[12] * this.m[10],
        C = this.m[8] * this.m[13] - this.m[12] * this.m[9],
        Y = this.m[6] * this.m[15] - this.m[14] * this.m[7],
        A = this.m[5] * this.m[15] - this.m[13] * this.m[7],
        te = this.m[5] * this.m[14] - this.m[13] * this.m[6],
        b = this.m[4] * this.m[15] - this.m[12] * this.m[7],
        K = this.m[4] * this.m[14] - this.m[12] * this.m[6],
        y = this.m[5] * this.m[15] - this.m[13] * this.m[7],
        X = this.m[4] * this.m[13] - this.m[12] * this.m[5],
        le = this.m[6] * this.m[11] - this.m[10] * this.m[7],
        ee = this.m[5] * this.m[11] - this.m[9] * this.m[7],
        U = this.m[5] * this.m[10] - this.m[9] * this.m[6],
        de = this.m[4] * this.m[11] - this.m[8] * this.m[7],
        S = this.m[4] * this.m[10] - this.m[8] * this.m[6],
        Me = this.m[4] * this.m[9] - this.m[8] * this.m[5];
      (t[0] = this.m[5] * h - this.m[6] * c + this.m[7] * f),
        (t[4] = -(this.m[4] * h - this.m[6] * v + this.m[7] * T)),
        (t[8] = this.m[4] * c - this.m[5] * v + this.m[7] * C),
        (t[12] = -(this.m[4] * f - this.m[5] * T + this.m[6] * C)),
        (t[1] = -(this.m[1] * h - this.m[2] * c + this.m[3] * f)),
        (t[5] = this.m[0] * h - this.m[2] * v + this.m[3] * T),
        (t[9] = -(this.m[0] * c - this.m[1] * v + this.m[3] * C)),
        (t[13] = this.m[0] * f - this.m[1] * T + this.m[2] * C),
        (t[2] = this.m[1] * Y - this.m[2] * A + this.m[3] * te),
        (t[6] = -(this.m[0] * Y - this.m[2] * b + this.m[3] * K)),
        (t[10] = this.m[0] * y - this.m[1] * b + this.m[3] * X),
        (t[14] = -(this.m[0] * te - this.m[1] * K + this.m[2] * X)),
        (t[3] = -(this.m[1] * le - this.m[2] * ee + this.m[3] * U)),
        (t[7] = this.m[0] * le - this.m[2] * de + this.m[3] * S),
        (t[11] = -(this.m[0] * ee - this.m[1] * de + this.m[3] * Me)),
        (t[15] = this.m[0] * U - this.m[1] * S + this.m[2] * Me);
      let H =
        this.m[0] * t[0] +
        this.m[1] * t[4] +
        this.m[2] * t[8] +
        this.m[3] * t[12];
      for (let xe = 0; xe < 4; xe++)
        for (let ge = 0; ge < 4; ge++) t[xe * 4 + ge] *= 1 / H;
      return new qe(t);
    }
    clone() {
      return new qe([...this.m]);
    }
    toString() {
      return this.m.toString();
    }
  };
  function Jr(r, t, h, c = (f) => -Math.cos(f)) {
    return r + ((c(h) + 1) / 2) * (t - r);
  }
  n(Jr, "wave");
  var Dn = 1103515245,
    Cn = 12345,
    Vs = 2147483648,
    Cs = class {
      static {
        n(this, "RNG");
      }
      seed;
      constructor(r) {
        this.seed = r;
      }
      gen() {
        return (this.seed = (Dn * this.seed + Cn) % Vs), this.seed / Vs;
      }
      genNumber(r, t) {
        return r + this.gen() * (t - r);
      }
      genVec2(r, t) {
        return new E(this.genNumber(r.x, t.x), this.genNumber(r.y, t.y));
      }
      genColor(r, t) {
        return new $(
          this.genNumber(r.r, t.r),
          this.genNumber(r.g, t.g),
          this.genNumber(r.b, t.b)
        );
      }
      genAny(...r) {
        if (r.length === 0) return this.gen();
        if (r.length === 1) {
          if (typeof r[0] == "number") return this.genNumber(0, r[0]);
          if (r[0] instanceof E) return this.genVec2(M(0, 0), r[0]);
          if (r[0] instanceof $) return this.genColor(W(0, 0, 0), r[0]);
        } else if (r.length === 2) {
          if (typeof r[0] == "number" && typeof r[1] == "number")
            return this.genNumber(r[0], r[1]);
          if (r[0] instanceof E && r[1] instanceof E)
            return this.genVec2(r[0], r[1]);
          if (r[0] instanceof $ && r[1] instanceof $)
            return this.genColor(r[0], r[1]);
        }
      }
    },
    Xr = new Cs(Date.now());
  function ks(r) {
    return r != null && (Xr.seed = r), Xr.seed;
  }
  n(ks, "randSeed");
  function Zt(...r) {
    return Xr.genAny(...r);
  }
  n(Zt, "rand");
  function ii(...r) {
    return Math.floor(Zt(...r));
  }
  n(ii, "randi");
  function Ns(r) {
    return Zt() <= r;
  }
  n(Ns, "chance");
  function Us(r) {
    return r[ii(r.length)];
  }
  n(Us, "choose");
  function Ls(r, t) {
    return (
      r.pos.x + r.width > t.pos.x &&
      r.pos.x < t.pos.x + t.width &&
      r.pos.y + r.height > t.pos.y &&
      r.pos.y < t.pos.y + t.height
    );
  }
  n(Ls, "testRectRect");
  function Gs(r, t) {
    if (
      (r.p1.x === r.p2.x && r.p1.y === r.p2.y) ||
      (t.p1.x === t.p2.x && t.p1.y === t.p2.y)
    )
      return null;
    let h =
      (t.p2.y - t.p1.y) * (r.p2.x - r.p1.x) -
      (t.p2.x - t.p1.x) * (r.p2.y - r.p1.y);
    if (h === 0) return null;
    let c =
        ((t.p2.x - t.p1.x) * (r.p1.y - t.p1.y) -
          (t.p2.y - t.p1.y) * (r.p1.x - t.p1.x)) /
        h,
      f =
        ((r.p2.x - r.p1.x) * (r.p1.y - t.p1.y) -
          (r.p2.y - r.p1.y) * (r.p1.x - t.p1.x)) /
        h;
    return c < 0 || c > 1 || f < 0 || f > 1 ? null : c;
  }
  n(Gs, "testLineLineT");
  function yt(r, t) {
    let h = Gs(r, t);
    return h
      ? M(r.p1.x + h * (r.p2.x - r.p1.x), r.p1.y + h * (r.p2.y - r.p1.y))
      : null;
  }
  n(yt, "testLineLine");
  function Os(r, t) {
    if (_t(r, t.p1) || _t(r, t.p2)) return !0;
    let h = r.points();
    return (
      !!yt(t, new xt(h[0], h[1])) ||
      !!yt(t, new xt(h[1], h[2])) ||
      !!yt(t, new xt(h[2], h[3])) ||
      !!yt(t, new xt(h[3], h[0]))
    );
  }
  n(Os, "testRectLine");
  function _t(r, t) {
    return (
      t.x > r.pos.x &&
      t.x < r.pos.x + r.width &&
      t.y > r.pos.y &&
      t.y < r.pos.y + r.height
    );
  }
  n(_t, "testRectPoint");
  function qs(r, t) {
    let h = t.sub(r.p1),
      c = r.p2.sub(r.p1);
    if (Math.abs(h.cross(c)) > Number.EPSILON) return !1;
    let f = h.dot(c) / c.dot(c);
    return f >= 0 && f <= 1;
  }
  n(qs, "testLinePoint");
  function si(r, t) {
    let h = r.p2.sub(r.p1),
      c = h.dot(h),
      f = r.p1.sub(t.center),
      v = 2 * h.dot(f),
      T = f.dot(f) - t.radius * t.radius,
      C = v * v - 4 * c * T;
    if (c <= Number.EPSILON || C < 0) return !1;
    if (C == 0) {
      let Y = -v / (2 * c);
      if (Y >= 0 && Y <= 1) return !0;
    } else {
      let Y = (-v + Math.sqrt(C)) / (2 * c),
        A = (-v - Math.sqrt(C)) / (2 * c);
      if ((Y >= 0 && Y <= 1) || (A >= 0 && A <= 1)) return !0;
    }
    return ni(t, r.p1);
  }
  n(si, "testLineCircle");
  function ni(r, t) {
    return r.center.sdist(t) < r.radius * r.radius;
  }
  n(ni, "testCirclePoint");
  function Hs(r, t) {
    let h = t.pts[t.pts.length - 1];
    for (let c of t.pts) {
      if (si(new xt(h, c), r)) return !0;
      h = c;
    }
    return ni(r, t.pts[0]) ? !0 : oi(t, r.center);
  }
  n(Hs, "testCirclePolygon");
  function oi(r, t) {
    let h = !1,
      c = r.pts;
    for (let f = 0, v = c.length - 1; f < c.length; v = f++)
      c[f].y > t.y != c[v].y > t.y &&
        t.x <
          ((c[v].x - c[f].x) * (t.y - c[f].y)) / (c[v].y - c[f].y) + c[f].x &&
        (h = !h);
    return h;
  }
  n(oi, "testPolygonPoint");
  var xt = class Wr {
      static {
        n(this, "Line");
      }
      p1;
      p2;
      constructor(t, h) {
        (this.p1 = t.clone()), (this.p2 = h.clone());
      }
      transform(t) {
        return new Wr(t.multVec2(this.p1), t.multVec2(this.p2));
      }
      bbox() {
        return Ve.fromPoints(this.p1, this.p2);
      }
      area() {
        return this.p1.dist(this.p2);
      }
      clone() {
        return new Wr(this.p1, this.p2);
      }
    },
    Ve = class Zr {
      static {
        n(this, "Rect");
      }
      pos;
      width;
      height;
      constructor(t, h, c) {
        (this.pos = t.clone()), (this.width = h), (this.height = c);
      }
      static fromPoints(t, h) {
        return new Zr(t.clone(), h.x - t.x, h.y - t.y);
      }
      center() {
        return new E(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
      }
      points() {
        return [
          this.pos,
          this.pos.add(this.width, 0),
          this.pos.add(this.width, this.height),
          this.pos.add(0, this.height),
        ];
      }
      transform(t) {
        return new zt(this.points().map((h) => t.multVec2(h)));
      }
      bbox() {
        return this.clone();
      }
      area() {
        return this.width * this.height;
      }
      clone() {
        return new Zr(this.pos.clone(), this.width, this.height);
      }
      distToPoint(t) {
        return Math.sqrt(this.sdistToPoint(t));
      }
      sdistToPoint(t) {
        let h = this.pos,
          c = this.pos.add(this.width, this.height),
          f = Math.max(h.x - t.x, 0, t.x - c.x),
          v = Math.max(h.y - t.y, 0, t.y - c.y);
        return f * f + v * v;
      }
    },
    vs = class Ys {
      static {
        n(this, "Circle");
      }
      center;
      radius;
      constructor(t, h) {
        (this.center = t.clone()), (this.radius = h);
      }
      transform(t) {
        return new kn(this.center, this.radius, this.radius).transform(t);
      }
      bbox() {
        return Ve.fromPoints(
          this.center.sub(M(this.radius)),
          this.center.add(M(this.radius))
        );
      }
      area() {
        return this.radius * this.radius * Math.PI;
      }
      clone() {
        return new Ys(this.center, this.radius);
      }
    },
    kn = class _r {
      static {
        n(this, "Ellipse");
      }
      center;
      radiusX;
      radiusY;
      constructor(t, h, c) {
        (this.center = t.clone()), (this.radiusX = h), (this.radiusY = c);
      }
      transform(t) {
        return new _r(
          t.multVec2(this.center),
          t.m[0] * this.radiusX,
          t.m[5] * this.radiusY
        );
      }
      bbox() {
        return Ve.fromPoints(
          this.center.sub(M(this.radiusX, this.radiusY)),
          this.center.add(M(this.radiusX, this.radiusY))
        );
      }
      area() {
        return this.radiusX * this.radiusY * Math.PI;
      }
      clone() {
        return new _r(this.center, this.radiusX, this.radiusY);
      }
    },
    zt = class $r {
      static {
        n(this, "Polygon");
      }
      pts;
      constructor(t) {
        if (t.length < 3)
          throw new Error("Polygons should have at least 3 vertices");
        this.pts = t;
      }
      transform(t) {
        return new $r(this.pts.map((h) => t.multVec2(h)));
      }
      bbox() {
        let t = M(Number.MAX_VALUE),
          h = M(-Number.MAX_VALUE);
        for (let c of this.pts)
          (t.x = Math.min(t.x, c.x)),
            (h.x = Math.max(h.x, c.x)),
            (t.y = Math.min(t.y, c.y)),
            (h.y = Math.max(h.y, c.y));
        return Ve.fromPoints(t, h);
      }
      area() {
        let t = 0,
          h = this.pts.length;
        for (let c = 0; c < h; c++) {
          let f = this.pts[c],
            v = this.pts[(c + 1) % h];
          (t += f.x * v.y * 0.5), (t -= v.x * f.y * 0.5);
        }
        return Math.abs(t);
      }
      clone() {
        return new $r(this.pts.map((t) => t.clone()));
      }
    };
  function Ks(r, t) {
    let h = Number.MAX_VALUE,
      c = M(0);
    for (let f of [r, t])
      for (let v = 0; v < f.pts.length; v++) {
        let T = f.pts[v],
          C = f.pts[(v + 1) % f.pts.length].sub(T).normal().unit(),
          Y = Number.MAX_VALUE,
          A = -Number.MAX_VALUE;
        for (let y = 0; y < r.pts.length; y++) {
          let X = r.pts[y].dot(C);
          (Y = Math.min(Y, X)), (A = Math.max(A, X));
        }
        let te = Number.MAX_VALUE,
          b = -Number.MAX_VALUE;
        for (let y = 0; y < t.pts.length; y++) {
          let X = t.pts[y].dot(C);
          (te = Math.min(te, X)), (b = Math.max(b, X));
        }
        let K = Math.min(A, b) - Math.max(Y, te);
        if (K < 0) return null;
        if (K < Math.abs(h)) {
          let y = b - Y,
            X = te - A;
          (h = Math.abs(y) < Math.abs(X) ? y : X), (c = C.scale(h));
        }
      }
    return c;
  }
  n(Ks, "sat");
  var js = class extends Map {
      static {
        n(this, "Registry");
      }
      lastID;
      constructor(...r) {
        super(...r), (this.lastID = 0);
      }
      push(r) {
        let t = this.lastID;
        return this.set(t, r), this.lastID++, t;
      }
      pushd(r) {
        let t = this.push(r);
        return () => this.delete(t);
      }
    },
    vt = class Qs {
      static {
        n(this, "EventController");
      }
      paused = !1;
      cancel;
      constructor(t) {
        this.cancel = t;
      }
      static join(t) {
        let h = new Qs(() => t.forEach((c) => c.cancel()));
        return (
          Object.defineProperty(h, "paused", {
            get: () => t[0].paused,
            set: (c) => t.forEach((f) => (f.paused = c)),
          }),
          (h.paused = !1),
          h
        );
      }
    },
    Ie = class {
      static {
        n(this, "Event");
      }
      handlers = new js();
      add(r) {
        let t = this.handlers.pushd((...c) => {
            h.paused || r(...c);
          }),
          h = new vt(t);
        return h;
      }
      addOnce(r) {
        let t = this.add((...h) => {
          t.cancel(), r(...h);
        });
        return t;
      }
      next() {
        return new Promise((r) => this.addOnce(r));
      }
      trigger(...r) {
        this.handlers.forEach((t) => t(...r));
      }
      numListeners() {
        return this.handlers.size;
      }
      clear() {
        this.handlers.clear();
      }
    },
    Jt = class {
      static {
        n(this, "EventHandler");
      }
      handlers = {};
      on(r, t) {
        return (
          this.handlers[r] || (this.handlers[r] = new Ie()),
          this.handlers[r].add(t)
        );
      }
      onOnce(r, t) {
        let h = this.on(r, (...c) => {
          h.cancel(), t(...c);
        });
        return h;
      }
      next(r) {
        return new Promise((t) => {
          this.onOnce(r, (...h) => t(h[0]));
        });
      }
      trigger(r, ...t) {
        this.handlers[r] && this.handlers[r].trigger(...t);
      }
      remove(r) {
        delete this.handlers[r];
      }
      clear() {
        this.handlers = {};
      }
      numListeners(r) {
        return this.handlers[r]?.numListeners() ?? 0;
      }
    };
  function Vr(r, t) {
    if (r === t) return !0;
    let h = typeof r,
      c = typeof t;
    if (h !== c) return !1;
    if (h === "object" && c === "object" && r !== null && t !== null) {
      if (Array.isArray(r) !== Array.isArray(t)) return !1;
      let f = Object.keys(r),
        v = Object.keys(t);
      if (f.length !== v.length) return !1;
      for (let T of f) {
        let C = r[T],
          Y = t[T];
        if (!Vr(C, Y)) return !1;
      }
      return !0;
    }
    return !1;
  }
  n(Vr, "deepEq");
  function zs(r) {
    let t = window.atob(r),
      h = t.length,
      c = new Uint8Array(h);
    for (let f = 0; f < h; f++) c[f] = t.charCodeAt(f);
    return c.buffer;
  }
  n(zs, "base64ToArrayBuffer");
  function Js(r) {
    return zs(r.split(",")[1]);
  }
  n(Js, "dataURLToArrayBuffer");
  function vr(r, t) {
    let h = document.createElement("a");
    (h.href = t), (h.download = r), h.click();
  }
  n(vr, "download");
  function ai(r, t) {
    vr(r, "data:text/plain;charset=utf-8," + t);
  }
  n(ai, "downloadText");
  function Xs(r, t) {
    ai(r, JSON.stringify(t));
  }
  n(Xs, "downloadJSON");
  function ei(r, t) {
    let h = URL.createObjectURL(t);
    vr(r, h), URL.revokeObjectURL(h);
  }
  n(ei, "downloadBlob");
  var ys = n((r) => r.match(/^data:\w+\/\w+;base64,.+/), "isDataURL"),
    Nn = n((r) => r.split(".").slice(0, -1).join("."), "getFileName");
  function Re(r, t) {
    return (...h) => {
      let c = h.length;
      if (c === r.length) return r(...h);
      if (c === t.length) return t(...h);
    };
  }
  n(Re, "overload2");
  var Un = (() => {
      let r = 0;
      return () => r++;
    })(),
    Ln = n(
      (r) => (r instanceof Error ? r.message : String(r)),
      "getErrorMessage"
    ),
    Gn = class {
      static {
        n(this, "BinaryHeap");
      }
      _items;
      _compareFn;
      constructor(r = (t, h) => t < h) {
        (this._compareFn = r), (this._items = []);
      }
      insert(r) {
        this._items.push(r), this.moveUp(this._items.length - 1);
      }
      remove() {
        if (this._items.length === 0) return null;
        let r = this._items[0],
          t = this._items.pop();
        return (
          this._items.length !== 0 && ((this._items[0] = t), this.moveDown(0)),
          r
        );
      }
      clear() {
        this._items.splice(0, this._items.length);
      }
      moveUp(r) {
        for (; r > 0; ) {
          let t = Math.floor((r - 1) / 2);
          if (
            !this._compareFn(this._items[r], this._items[t]) &&
            this._items[r] >= this._items[t]
          )
            break;
          this.swap(r, t), (r = t);
        }
      }
      moveDown(r) {
        for (; r < Math.floor(this._items.length / 2); ) {
          let t = 2 * r + 1;
          if (
            (t < this._items.length - 1 &&
              !this._compareFn(this._items[t], this._items[t + 1]) &&
              ++t,
            this._compareFn(this._items[r], this._items[t]))
          )
            break;
          this.swap(r, t), (r = t);
        }
      }
      swap(r, t) {
        [this._items[r], this._items[t]] = [this._items[t], this._items[r]];
      }
      get length() {
        return this._items.length;
      }
    },
    On = Object.freeze([
      776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449,
      4520,
    ]);
  function Ws(r) {
    if (typeof r != "string")
      throw new TypeError("string cannot be undefined or null");
    let t = [],
      h = 0,
      c = 0;
    for (; h < r.length; ) {
      if (
        ((c += Zs(h + c, r)),
        nn(r[h + c]) && c++,
        tn(r[h + c]) && c++,
        rn(r[h + c]) && c++,
        on(r[h + c]))
      ) {
        c++;
        continue;
      }
      t.push(r.substring(h, h + c)), (h += c), (c = 0);
    }
    return t;
  }
  n(Ws, "runes");
  function Zs(r, t) {
    let h = t[r];
    if (!_s(h) || r === t.length - 1) return 1;
    let c = h + t[r + 1],
      f = t.substring(r + 2, r + 5);
    return ti(c) && ti(f)
      ? 4
      : $s(c) && sn(f)
      ? t.slice(r).indexOf(String.fromCodePoint(917631)) + 2
      : en(f)
      ? 4
      : 2;
  }
  n(Zs, "nextUnits");
  function _s(r) {
    return r && Ze(r[0].charCodeAt(0), 55296, 56319);
  }
  n(_s, "isFirstOfSurrogatePair");
  function ti(r) {
    return Ze(yr(r), 127462, 127487);
  }
  n(ti, "isRegionalIndicator");
  function $s(r) {
    return Ze(yr(r), 127988, 127988);
  }
  n($s, "isSubdivisionFlag");
  function en(r) {
    return Ze(yr(r), 127995, 127999);
  }
  n(en, "isFitzpatrickModifier");
  function tn(r) {
    return typeof r == "string" && Ze(r.charCodeAt(0), 65024, 65039);
  }
  n(tn, "isVariationSelector");
  function rn(r) {
    return typeof r == "string" && Ze(r.charCodeAt(0), 8400, 8447);
  }
  n(rn, "isDiacriticalMark");
  function sn(r) {
    let t = r.codePointAt(0);
    return (
      typeof r == "string" && typeof t == "number" && Ze(t, 917504, 917631)
    );
  }
  n(sn, "isSupplementarySpecialpurposePlane");
  function nn(r) {
    return typeof r == "string" && On.includes(r.charCodeAt(0));
  }
  n(nn, "isGrapheme");
  function on(r) {
    return typeof r == "string" && r.charCodeAt(0) === 8205;
  }
  n(on, "isZeroWidthJoiner");
  function yr(r) {
    let t = r.charCodeAt(0) - 55296,
      h = r.charCodeAt(1) - 56320;
    return (t << 10) + h + 65536;
  }
  n(yr, "codePointFromSurrogatePair");
  function Ze(r, t, h) {
    return r >= t && r <= h;
  }
  n(Ze, "betweenInclusive");
  var xs = {
      "Joy-Con L+R (STANDARD GAMEPAD Vendor: 057e Product: 200e)": {
        buttons: {
          0: "south",
          1: "east",
          2: "west",
          3: "north",
          4: "lshoulder",
          5: "rshoulder",
          6: "ltrigger",
          7: "rtrigger",
          8: "select",
          9: "start",
          10: "lstick",
          11: "rstick",
          12: "dpad-up",
          13: "dpad-down",
          14: "dpad-left",
          15: "dpad-right",
          16: "home",
          17: "capture",
        },
        sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
      },
      "Joy-Con (L) (STANDARD GAMEPAD Vendor: 057e Product: 2006)": {
        buttons: {
          0: "south",
          1: "east",
          2: "west",
          3: "north",
          4: "lshoulder",
          5: "rshoulder",
          9: "select",
          10: "lstick",
          16: "start",
        },
        sticks: { left: { x: 0, y: 1 } },
      },
      "Joy-Con (R) (STANDARD GAMEPAD Vendor: 057e Product: 2007)": {
        buttons: {
          0: "south",
          1: "east",
          2: "west",
          3: "north",
          4: "lshoulder",
          5: "rshoulder",
          9: "start",
          10: "lstick",
          16: "select",
        },
        sticks: { left: { x: 0, y: 1 } },
      },
      "Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)": {
        buttons: {
          0: "south",
          1: "east",
          2: "west",
          3: "north",
          4: "lshoulder",
          5: "rshoulder",
          6: "ltrigger",
          7: "rtrigger",
          8: "select",
          9: "start",
          10: "lstick",
          11: "rstick",
          12: "dpad-up",
          13: "dpad-down",
          14: "dpad-left",
          15: "dpad-right",
          16: "home",
          17: "capture",
        },
        sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
      },
      default: {
        buttons: {
          0: "south",
          1: "east",
          2: "west",
          3: "north",
          4: "lshoulder",
          5: "rshoulder",
          6: "ltrigger",
          7: "rtrigger",
          8: "select",
          9: "start",
          10: "lstick",
          11: "rstick",
          12: "dpad-up",
          13: "dpad-down",
          14: "dpad-left",
          15: "dpad-right",
          16: "home",
        },
        sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
      },
    },
    wr = class {
      static {
        n(this, "ButtonState");
      }
      pressed = new Set([]);
      pressedRepeat = new Set([]);
      released = new Set([]);
      down = new Set([]);
      update() {
        this.pressed.clear(), this.released.clear(), this.pressedRepeat.clear();
      }
      press(r) {
        this.pressed.add(r), this.pressedRepeat.add(r), this.down.add(r);
      }
      pressRepeat(r) {
        this.pressedRepeat.add(r);
      }
      release(r) {
        this.down.delete(r), this.pressed.delete(r), this.released.add(r);
      }
    },
    qn = class {
      static {
        n(this, "GamepadState");
      }
      buttonState = new wr();
      stickState = new Map();
    },
    Hn = class {
      static {
        n(this, "FPSCounter");
      }
      dts = [];
      timer = 0;
      fps = 0;
      tick(r) {
        this.dts.push(r),
          (this.timer += r),
          this.timer >= 1 &&
            ((this.timer = 0),
            (this.fps = Math.round(
              1 / (this.dts.reduce((t, h) => t + h) / this.dts.length)
            )),
            (this.dts = []));
      }
    },
    Yn = n((r) => {
      if (!r.canvas) throw new Error("Please provide a canvas");
      let t = {
        canvas: r.canvas,
        loopID: null,
        stopped: !1,
        dt: 0,
        time: 0,
        realTime: 0,
        fpsCounter: new Hn(),
        timeScale: 1,
        skipTime: !1,
        numFrames: 0,
        mousePos: new E(0),
        mouseDeltaPos: new E(0),
        keyState: new wr(),
        mouseState: new wr(),
        mergedGamepadState: new qn(),
        gamepadStates: new Map(),
        gamepads: [],
        charInputted: [],
        isMouseMoved: !1,
        lastWidth: r.canvas.offsetWidth,
        lastHeight: r.canvas.offsetHeight,
        events: new Jt(),
      };
      function h() {
        return t.dt * t.timeScale;
      }
      n(h, "dt");
      function c() {
        return t.time;
      }
      n(c, "time");
      function f() {
        return t.fpsCounter.fps;
      }
      n(f, "fps");
      function v() {
        return t.numFrames;
      }
      n(v, "numFrames");
      function T() {
        return t.canvas.toDataURL();
      }
      n(T, "screenshot");
      function C(d) {
        t.canvas.style.cursor = d;
      }
      n(C, "setCursor");
      function Y() {
        return t.canvas.style.cursor;
      }
      n(Y, "getCursor");
      function A(d) {
        if (d)
          try {
            let V = t.canvas.requestPointerLock();
            V.catch && V.catch((R) => console.error(R));
          } catch (V) {
            console.error(V);
          }
        else document.exitPointerLock();
      }
      n(A, "setCursorLocked");
      function te() {
        return !!document.pointerLockElement;
      }
      n(te, "isCursorLocked");
      function b(d) {
        d.requestFullscreen
          ? d.requestFullscreen()
          : d.webkitRequestFullscreen && d.webkitRequestFullscreen();
      }
      n(b, "enterFullscreen");
      function K() {
        document.exitFullscreen
          ? document.exitFullscreen()
          : document.webkitExitFullScreen && document.webkitExitFullScreen();
      }
      n(K, "exitFullscreen");
      function y() {
        return document.fullscreenElement || document.webkitFullscreenElement;
      }
      n(y, "getFullscreenElement");
      function X(d = !0) {
        d ? b(t.canvas) : K();
      }
      n(X, "setFullscreen");
      function le() {
        return !!y();
      }
      n(le, "isFullscreen");
      function ee() {
        t.stopped = !0;
        for (let d in re) t.canvas.removeEventListener(d, re[d]);
        for (let d in ae) document.removeEventListener(d, ae[d]);
        for (let d in se) window.removeEventListener(d, se[d]);
        me.disconnect();
      }
      n(ee, "quit");
      function U(d) {
        t.loopID !== null && cancelAnimationFrame(t.loopID);
        let V = 0,
          R = n((q) => {
            if (t.stopped) return;
            if (document.visibilityState !== "visible") {
              t.loopID = requestAnimationFrame(R);
              return;
            }
            let j = q / 1e3,
              ue = j - t.realTime,
              Ee = r.maxFPS ? 1 / r.maxFPS : 0;
            (t.realTime = j),
              (V += ue),
              V > Ee &&
                (t.skipTime ||
                  ((t.dt = V), (t.time += h()), t.fpsCounter.tick(t.dt)),
                (V = 0),
                (t.skipTime = !1),
                t.numFrames++,
                rt(),
                d(),
                Nt()),
              (t.loopID = requestAnimationFrame(R));
          }, "frame");
        R(0);
      }
      n(U, "run");
      function de() {
        return "ontouchstart" in window || navigator.maxTouchPoints > 0;
      }
      n(de, "isTouchscreen");
      function S() {
        return t.mousePos.clone();
      }
      n(S, "mousePos");
      function Me() {
        return t.mouseDeltaPos.clone();
      }
      n(Me, "mouseDeltaPos");
      function H(d = "left") {
        return t.mouseState.pressed.has(d);
      }
      n(H, "isMousePressed");
      function xe(d = "left") {
        return t.mouseState.down.has(d);
      }
      n(xe, "isMouseDown");
      function ge(d = "left") {
        return t.mouseState.released.has(d);
      }
      n(ge, "isMouseReleased");
      function ve() {
        return t.isMouseMoved;
      }
      n(ve, "isMouseMoved");
      function Ke(d) {
        return d === void 0
          ? t.keyState.pressed.size > 0
          : t.keyState.pressed.has(d);
      }
      n(Ke, "isKeyPressed");
      function bt(d) {
        return d === void 0
          ? t.keyState.pressedRepeat.size > 0
          : t.keyState.pressedRepeat.has(d);
      }
      n(bt, "isKeyPressedRepeat");
      function at(d) {
        return d === void 0 ? t.keyState.down.size > 0 : t.keyState.down.has(d);
      }
      n(at, "isKeyDown");
      function ht(d) {
        return d === void 0
          ? t.keyState.released.size > 0
          : t.keyState.released.has(d);
      }
      n(ht, "isKeyReleased");
      function lt(d) {
        return d === void 0
          ? t.mergedGamepadState.buttonState.pressed.size > 0
          : t.mergedGamepadState.buttonState.pressed.has(d);
      }
      n(lt, "isGamepadButtonPressed");
      function Ue(d) {
        return d === void 0
          ? t.mergedGamepadState.buttonState.down.size > 0
          : t.mergedGamepadState.buttonState.down.has(d);
      }
      n(Ue, "isGamepadButtonDown");
      function St(d) {
        return d === void 0
          ? t.mergedGamepadState.buttonState.released.size > 0
          : t.mergedGamepadState.buttonState.released.has(d);
      }
      n(St, "isGamepadButtonReleased");
      function Rt(d) {
        return t.events.on("resize", d);
      }
      n(Rt, "onResize");
      let $t = Re(
          (d) => t.events.on("keyDown", d),
          (d, V) => t.events.on("keyDown", (R) => R === d && V(d))
        ),
        er = Re(
          (d) => t.events.on("keyPress", d),
          (d, V) => t.events.on("keyPress", (R) => R === d && V(d))
        ),
        tr = Re(
          (d) => t.events.on("keyPressRepeat", d),
          (d, V) => t.events.on("keyPressRepeat", (R) => R === d && V(d))
        ),
        rr = Re(
          (d) => t.events.on("keyRelease", d),
          (d, V) => t.events.on("keyRelease", (R) => R === d && V(d))
        ),
        Mt = Re(
          (d) => t.events.on("mouseDown", (V) => d(V)),
          (d, V) => t.events.on("mouseDown", (R) => R === d && V(R))
        ),
        Pt = Re(
          (d) => t.events.on("mousePress", (V) => d(V)),
          (d, V) => t.events.on("mousePress", (R) => R === d && V(R))
        ),
        Tt = Re(
          (d) => t.events.on("mouseRelease", (V) => d(V)),
          (d, V) => t.events.on("mouseRelease", (R) => R === d && V(R))
        );
      function ut(d) {
        return t.events.on("mouseMove", () => d(S(), Me()));
      }
      n(ut, "onMouseMove");
      function dt(d) {
        return t.events.on("charInput", d);
      }
      n(dt, "onCharInput");
      function Bt(d) {
        return t.events.on("touchStart", d);
      }
      n(Bt, "onTouchStart");
      function _e(d) {
        return t.events.on("touchMove", d);
      }
      n(_e, "onTouchMove");
      function Ft(d) {
        return t.events.on("touchEnd", d);
      }
      n(Ft, "onTouchEnd");
      function It(d) {
        return t.events.on("scroll", d);
      }
      n(It, "onScroll");
      function ct(d) {
        return t.events.on("hide", d);
      }
      n(ct, "onHide");
      function Dt(d) {
        return t.events.on("show", d);
      }
      n(Dt, "onShow");
      function ft(d, V) {
        if (typeof d == "function") return t.events.on("gamepadButtonDown", d);
        if (typeof d == "string" && typeof V == "function")
          return t.events.on("gamepadButtonDown", (R) => R === d && V(d));
      }
      n(ft, "onGamepadButtonDown");
      function pt(d, V) {
        if (typeof d == "function") return t.events.on("gamepadButtonPress", d);
        if (typeof d == "string" && typeof V == "function")
          return t.events.on("gamepadButtonPress", (R) => R === d && V(d));
      }
      n(pt, "onGamepadButtonPress");
      function Ct(d, V) {
        if (typeof d == "function")
          return t.events.on("gamepadButtonRelease", d);
        if (typeof d == "string" && typeof V == "function")
          return t.events.on("gamepadButtonRelease", (R) => R === d && V(d));
      }
      n(Ct, "onGamepadButtonRelease");
      function $e(d, V) {
        return t.events.on("gamepadStick", (R, q) => R === d && V(q));
      }
      n($e, "onGamepadStick");
      function kt(d) {
        t.events.on("gamepadConnect", d);
      }
      n(kt, "onGamepadConnect");
      function et(d) {
        t.events.on("gamepadDisconnect", d);
      }
      n(et, "onGamepadDisconnect");
      function Pe(d) {
        return t.mergedGamepadState.stickState.get(d) || new E(0);
      }
      n(Pe, "getGamepadStick");
      function tt() {
        return [...t.charInputted];
      }
      n(tt, "charInputted");
      function gt() {
        return [...t.gamepads];
      }
      n(gt, "getGamepads");
      function rt() {
        t.events.trigger("input"),
          t.keyState.down.forEach((d) => t.events.trigger("keyDown", d)),
          t.mouseState.down.forEach((d) => t.events.trigger("mouseDown", d)),
          De();
      }
      n(rt, "processInput");
      function Nt() {
        t.keyState.update(),
          t.mouseState.update(),
          t.mergedGamepadState.buttonState.update(),
          t.mergedGamepadState.stickState.forEach((d, V) => {
            t.mergedGamepadState.stickState.set(V, new E(0));
          }),
          (t.charInputted = []),
          (t.isMouseMoved = !1),
          t.gamepadStates.forEach((d) => {
            d.buttonState.update(),
              d.stickState.forEach((V, R) => {
                d.stickState.set(R, new E(0));
              });
          });
      }
      n(Nt, "resetInput");
      function mt(d) {
        let V = {
          index: d.index,
          isPressed: (R) =>
            t.gamepadStates.get(d.index).buttonState.pressed.has(R),
          isDown: (R) => t.gamepadStates.get(d.index).buttonState.down.has(R),
          isReleased: (R) =>
            t.gamepadStates.get(d.index).buttonState.released.has(R),
          getStick: (R) => t.gamepadStates.get(d.index).stickState.get(R),
        };
        return (
          t.gamepads.push(V),
          t.gamepadStates.set(d.index, {
            buttonState: new wr(),
            stickState: new Map([
              ["left", new E(0)],
              ["right", new E(0)],
            ]),
          }),
          V
        );
      }
      n(mt, "registerGamepad");
      function _(d) {
        (t.gamepads = t.gamepads.filter((V) => V.index !== d.index)),
          t.gamepadStates.delete(d.index);
      }
      n(_, "removeGamepad");
      function De() {
        for (let d of navigator.getGamepads())
          d && !t.gamepadStates.has(d.index) && mt(d);
        for (let d of t.gamepads) {
          let V = navigator.getGamepads()[d.index],
            R = (r.gamepads ?? {})[V.id] ?? xs[V.id] ?? xs.default,
            q = t.gamepadStates.get(d.index);
          for (let j = 0; j < V.buttons.length; j++)
            V.buttons[j].pressed
              ? (q.buttonState.down.has(R.buttons[j]) ||
                  (t.mergedGamepadState.buttonState.press(R.buttons[j]),
                  q.buttonState.press(R.buttons[j]),
                  t.events.trigger("gamepadButtonPress", R.buttons[j])),
                t.events.trigger("gamepadButtonDown", R.buttons[j]))
              : q.buttonState.down.has(R.buttons[j]) &&
                (t.mergedGamepadState.buttonState.release(R.buttons[j]),
                q.buttonState.release(R.buttons[j]),
                t.events.trigger("gamepadButtonRelease", R.buttons[j]));
          for (let j in R.sticks) {
            let ue = R.sticks[j],
              Ee = new E(V.axes[ue.x], V.axes[ue.y]);
            q.stickState.set(j, Ee),
              t.mergedGamepadState.stickState.set(j, Ee),
              t.events.trigger("gamepadStick", j, Ee);
          }
        }
      }
      n(De, "processGamepad");
      let re = {},
        ae = {},
        se = {},
        Ce = r.pixelDensity || window.devicePixelRatio || 1;
      re.mousemove = (d) => {
        let V = new E(d.offsetX, d.offsetY),
          R = new E(d.movementX, d.movementY);
        if (le()) {
          let q = t.canvas.width / Ce,
            j = t.canvas.height / Ce,
            ue = window.innerWidth,
            Ee = window.innerHeight,
            Ut = ue / Ee,
            Lt = q / j;
          if (Ut > Lt) {
            let Be = Ee / j,
              be = (ue - q * Be) / 2;
            (V.x = We(d.offsetX - be, 0, q * Be, 0, q)),
              (V.y = We(d.offsetY, 0, j * Be, 0, j));
          } else {
            let Be = ue / q,
              be = (Ee - j * Be) / 2;
            (V.x = We(d.offsetX, 0, q * Be, 0, q)),
              (V.y = We(d.offsetY - be, 0, j * Be, 0, j));
          }
        }
        t.events.onOnce("input", () => {
          (t.isMouseMoved = !0),
            (t.mousePos = V),
            (t.mouseDeltaPos = R),
            t.events.trigger("mouseMove");
        });
      };
      let je = ["left", "middle", "right", "back", "forward"];
      (re.mousedown = (d) => {
        t.events.onOnce("input", () => {
          let V = je[d.button];
          V && (t.mouseState.press(V), t.events.trigger("mousePress", V));
        });
      }),
        (re.mouseup = (d) => {
          t.events.onOnce("input", () => {
            let V = je[d.button];
            V && (t.mouseState.release(V), t.events.trigger("mouseRelease", V));
          });
        });
      let ir = new Set([
          " ",
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
          "Tab",
        ]),
        Le = {
          ArrowLeft: "left",
          ArrowRight: "right",
          ArrowUp: "up",
          ArrowDown: "down",
          " ": "space",
        };
      (re.keydown = (d) => {
        ir.has(d.key) && d.preventDefault(),
          t.events.onOnce("input", () => {
            let V = Le[d.key] || d.key.toLowerCase();
            V.length === 1
              ? (t.events.trigger("charInput", V), t.charInputted.push(V))
              : V === "space" &&
                (t.events.trigger("charInput", " "), t.charInputted.push(" ")),
              d.repeat
                ? (t.keyState.pressRepeat(V),
                  t.events.trigger("keyPressRepeat", V))
                : (t.keyState.press(V),
                  t.events.trigger("keyPressRepeat", V),
                  t.events.trigger("keyPress", V));
          });
      }),
        (re.keyup = (d) => {
          t.events.onOnce("input", () => {
            let V = Le[d.key] || d.key.toLowerCase();
            t.keyState.release(V), t.events.trigger("keyRelease", V);
          });
        }),
        (re.touchstart = (d) => {
          d.preventDefault(),
            t.events.onOnce("input", () => {
              let V = [...d.changedTouches],
                R = t.canvas.getBoundingClientRect();
              r.touchToMouse !== !1 &&
                ((t.mousePos = new E(V[0].clientX - R.x, V[0].clientY - R.y)),
                t.mouseState.press("left"),
                t.events.trigger("mousePress", "left")),
                V.forEach((q) => {
                  t.events.trigger(
                    "touchStart",
                    new E(q.clientX - R.x, q.clientY - R.y),
                    q
                  );
                });
            });
        }),
        (re.touchmove = (d) => {
          d.preventDefault(),
            t.events.onOnce("input", () => {
              let V = [...d.changedTouches],
                R = t.canvas.getBoundingClientRect();
              r.touchToMouse !== !1 &&
                ((t.mousePos = new E(V[0].clientX - R.x, V[0].clientY - R.y)),
                t.events.trigger("mouseMove")),
                V.forEach((q) => {
                  t.events.trigger(
                    "touchMove",
                    new E(q.clientX - R.x, q.clientY - R.y),
                    q
                  );
                });
            });
        }),
        (re.touchend = (d) => {
          t.events.onOnce("input", () => {
            let V = [...d.changedTouches],
              R = t.canvas.getBoundingClientRect();
            r.touchToMouse !== !1 &&
              ((t.mousePos = new E(V[0].clientX - R.x, V[0].clientY - R.y)),
              t.mouseState.release("left"),
              t.events.trigger("mouseRelease", "left")),
              V.forEach((q) => {
                t.events.trigger(
                  "touchEnd",
                  new E(q.clientX - R.x, q.clientY - R.y),
                  q
                );
              });
          });
        }),
        (re.touchcancel = (d) => {
          t.events.onOnce("input", () => {
            let V = [...d.changedTouches],
              R = t.canvas.getBoundingClientRect();
            r.touchToMouse !== !1 &&
              ((t.mousePos = new E(V[0].clientX - R.x, V[0].clientY - R.y)),
              t.mouseState.release("left"),
              t.events.trigger("mouseRelease", "left")),
              V.forEach((q) => {
                t.events.trigger(
                  "touchEnd",
                  new E(q.clientX - R.x, q.clientY - R.y),
                  q
                );
              });
          });
        }),
        (re.wheel = (d) => {
          d.preventDefault(),
            t.events.onOnce("input", () => {
              t.events.trigger("scroll", new E(d.deltaX, d.deltaY));
            });
        }),
        (re.contextmenu = (d) => d.preventDefault()),
        (ae.visibilitychange = () => {
          document.visibilityState === "visible"
            ? ((t.skipTime = !0), t.events.trigger("show"))
            : t.events.trigger("hide");
        }),
        (se.gamepadconnected = (d) => {
          let V = mt(d.gamepad);
          t.events.onOnce("input", () => {
            t.events.trigger("gamepadConnect", V);
          });
        }),
        (se.gamepaddisconnected = (d) => {
          let V = gt().filter((R) => R.index === d.gamepad.index)[0];
          _(d.gamepad),
            t.events.onOnce("input", () => {
              t.events.trigger("gamepadDisconnect", V);
            });
        });
      for (let d in re) t.canvas.addEventListener(d, re[d]);
      for (let d in ae) document.addEventListener(d, ae[d]);
      for (let d in se) window.addEventListener(d, se[d]);
      let me = new ResizeObserver((d) => {
        for (let V of d)
          if (V.target === t.canvas) {
            if (
              t.lastWidth === t.canvas.offsetWidth &&
              t.lastHeight === t.canvas.offsetHeight
            )
              return;
            (t.lastWidth = t.canvas.offsetWidth),
              (t.lastHeight = t.canvas.offsetHeight),
              t.events.onOnce("input", () => {
                t.events.trigger("resize");
              });
          }
      });
      return (
        me.observe(t.canvas),
        {
          dt: h,
          time: c,
          run: U,
          canvas: t.canvas,
          fps: f,
          numFrames: v,
          quit: ee,
          setFullscreen: X,
          isFullscreen: le,
          setCursor: C,
          screenshot: T,
          getGamepads: gt,
          getCursor: Y,
          setCursorLocked: A,
          isCursorLocked: te,
          isTouchscreen: de,
          mousePos: S,
          mouseDeltaPos: Me,
          isKeyDown: at,
          isKeyPressed: Ke,
          isKeyPressedRepeat: bt,
          isKeyReleased: ht,
          isMouseDown: xe,
          isMousePressed: H,
          isMouseReleased: ge,
          isMouseMoved: ve,
          isGamepadButtonPressed: lt,
          isGamepadButtonDown: Ue,
          isGamepadButtonReleased: St,
          getGamepadStick: Pe,
          charInputted: tt,
          onResize: Rt,
          onKeyDown: $t,
          onKeyPress: er,
          onKeyPressRepeat: tr,
          onKeyRelease: rr,
          onMouseDown: Mt,
          onMousePress: Pt,
          onMouseRelease: Tt,
          onMouseMove: ut,
          onCharInput: dt,
          onTouchStart: Bt,
          onTouchMove: _e,
          onTouchEnd: Ft,
          onScroll: It,
          onHide: ct,
          onShow: Dt,
          onGamepadButtonDown: ft,
          onGamepadButtonPress: pt,
          onGamepadButtonRelease: Ct,
          onGamepadStick: $e,
          onGamepadConnect: kt,
          onGamepadDisconnect: et,
          events: t.events,
        }
      );
    }, "default"),
    ot = class an {
      static {
        n(this, "Texture");
      }
      ctx;
      src = null;
      glTex;
      width;
      height;
      constructor(t, h, c, f = {}) {
        this.ctx = t;
        let v = t.gl;
        (this.glTex = t.gl.createTexture()),
          t.onDestroy(() => this.free()),
          (this.width = h),
          (this.height = c);
        let T =
            { linear: v.LINEAR, nearest: v.NEAREST }[
              f.filter ?? t.opts.texFilter
            ] ?? v.NEAREST,
          C =
            { repeat: v.REPEAT, clampToEadge: v.CLAMP_TO_EDGE }[f.wrap] ??
            v.CLAMP_TO_EDGE;
        this.bind(),
          h &&
            c &&
            v.texImage2D(
              v.TEXTURE_2D,
              0,
              v.RGBA,
              h,
              c,
              0,
              v.RGBA,
              v.UNSIGNED_BYTE,
              null
            ),
          v.texParameteri(v.TEXTURE_2D, v.TEXTURE_MIN_FILTER, T),
          v.texParameteri(v.TEXTURE_2D, v.TEXTURE_MAG_FILTER, T),
          v.texParameteri(v.TEXTURE_2D, v.TEXTURE_WRAP_S, C),
          v.texParameteri(v.TEXTURE_2D, v.TEXTURE_WRAP_T, C),
          this.unbind();
      }
      static fromImage(t, h, c = {}) {
        let f = new an(t, h.width, h.height, c);
        return f.update(h), (f.src = h), f;
      }
      update(t, h = 0, c = 0) {
        let f = this.ctx.gl;
        this.bind(),
          f.texSubImage2D(f.TEXTURE_2D, 0, h, c, f.RGBA, f.UNSIGNED_BYTE, t),
          this.unbind();
      }
      bind() {
        this.ctx.pushTexture2D(this.glTex);
      }
      unbind() {
        this.ctx.popTexture2D();
      }
      free() {
        this.ctx.gl.deleteTexture(this.glTex);
      }
    },
    ur = class {
      static {
        n(this, "FrameBuffer");
      }
      ctx;
      tex;
      glFramebuffer;
      glRenderbuffer;
      constructor(r, t, h, c = {}) {
        this.ctx = r;
        let f = r.gl;
        r.onDestroy(() => this.free()),
          (this.tex = new ot(r, t, h, c)),
          (this.glFramebuffer = f.createFramebuffer()),
          (this.glRenderbuffer = f.createRenderbuffer()),
          this.bind(),
          f.renderbufferStorage(f.RENDERBUFFER, f.DEPTH_STENCIL, t, h),
          f.framebufferTexture2D(
            f.FRAMEBUFFER,
            f.COLOR_ATTACHMENT0,
            f.TEXTURE_2D,
            this.tex.glTex,
            0
          ),
          f.framebufferRenderbuffer(
            f.FRAMEBUFFER,
            f.DEPTH_STENCIL_ATTACHMENT,
            f.RENDERBUFFER,
            this.glRenderbuffer
          ),
          this.unbind();
      }
      get width() {
        return this.tex.width;
      }
      get height() {
        return this.tex.height;
      }
      toImageData() {
        let r = this.ctx.gl,
          t = new Uint8ClampedArray(this.width * this.height * 4);
        this.bind(),
          r.readPixels(
            0,
            0,
            this.width,
            this.height,
            r.RGBA,
            r.UNSIGNED_BYTE,
            t
          ),
          this.unbind();
        let h = this.width * 4,
          c = new Uint8Array(h);
        for (let f = 0; f < ((this.height / 2) | 0); f++) {
          let v = f * h,
            T = (this.height - f - 1) * h;
          c.set(t.subarray(v, v + h)), t.copyWithin(v, T, T + h), t.set(c, T);
        }
        return new ImageData(t, this.width, this.height);
      }
      toDataURL() {
        let r = document.createElement("canvas"),
          t = r.getContext("2d");
        return (
          (r.width = this.width),
          (r.height = this.height),
          t.putImageData(this.toImageData(), 0, 0),
          r.toDataURL()
        );
      }
      draw(r) {
        this.bind(), r(), this.unbind();
      }
      bind() {
        this.ctx.pushFramebuffer(this.glFramebuffer),
          this.ctx.pushRenderbuffer(this.glRenderbuffer),
          this.ctx.pushViewport({ x: 0, y: 0, w: this.width, h: this.height });
      }
      unbind() {
        this.ctx.popFramebuffer(),
          this.ctx.popRenderbuffer(),
          this.ctx.popViewport();
      }
      free() {
        let r = this.ctx.gl;
        r.deleteFramebuffer(this.glFramebuffer),
          r.deleteRenderbuffer(this.glRenderbuffer),
          this.tex.free();
      }
    },
    Kn = class {
      static {
        n(this, "Shader");
      }
      ctx;
      glProgram;
      constructor(r, t, h, c) {
        (this.ctx = r), r.onDestroy(() => this.free());
        let f = r.gl,
          v = f.createShader(f.VERTEX_SHADER),
          T = f.createShader(f.FRAGMENT_SHADER);
        f.shaderSource(v, t),
          f.shaderSource(T, h),
          f.compileShader(v),
          f.compileShader(T);
        let C = f.createProgram();
        if (
          ((this.glProgram = C),
          f.attachShader(C, v),
          f.attachShader(C, T),
          c.forEach((Y, A) => f.bindAttribLocation(C, A, Y)),
          f.linkProgram(C),
          !f.getProgramParameter(C, f.LINK_STATUS))
        ) {
          let Y = f.getShaderInfoLog(v);
          if (Y) throw new Error("VERTEX SHADER " + Y);
          let A = f.getShaderInfoLog(T);
          if (A) throw new Error("FRAGMENT SHADER " + A);
        }
        f.deleteShader(v), f.deleteShader(T);
      }
      bind() {
        this.ctx.pushProgram(this.glProgram);
      }
      unbind() {
        this.ctx.popProgram();
      }
      send(r) {
        let t = this.ctx.gl;
        for (let h in r) {
          let c = r[h],
            f = t.getUniformLocation(this.glProgram, h);
          typeof c == "number"
            ? t.uniform1f(f, c)
            : c instanceof ke
            ? t.uniformMatrix4fv(f, !1, new Float32Array(c.m))
            : c instanceof $
            ? t.uniform3f(f, c.r, c.g, c.b)
            : c instanceof E && t.uniform2f(f, c.x, c.y);
        }
      }
      free() {
        this.ctx.gl.deleteProgram(this.glProgram);
      }
    },
    jn = class {
      static {
        n(this, "BatchRenderer");
      }
      ctx;
      glVBuf;
      glIBuf;
      vqueue = [];
      iqueue = [];
      stride;
      maxVertices;
      maxIndices;
      vertexFormat;
      numDraws = 0;
      curPrimitive = null;
      curTex = null;
      curShader = null;
      curUniform = {};
      constructor(r, t, h, c) {
        let f = r.gl;
        (this.vertexFormat = t),
          (this.ctx = r),
          (this.stride = t.reduce((v, T) => v + T.size, 0)),
          (this.maxVertices = h),
          (this.maxIndices = c),
          (this.glVBuf = f.createBuffer()),
          r.pushArrayBuffer(this.glVBuf),
          f.bufferData(f.ARRAY_BUFFER, h * 4, f.DYNAMIC_DRAW),
          r.popArrayBuffer(),
          (this.glIBuf = f.createBuffer()),
          r.pushElementArrayBuffer(this.glIBuf),
          f.bufferData(f.ELEMENT_ARRAY_BUFFER, c * 4, f.DYNAMIC_DRAW),
          r.popElementArrayBuffer();
      }
      push(r, t, h, c, f = null, v = {}) {
        (r !== this.curPrimitive ||
          f !== this.curTex ||
          c !== this.curShader ||
          !Vr(this.curUniform, v) ||
          this.vqueue.length + t.length * this.stride > this.maxVertices ||
          this.iqueue.length + h.length > this.maxIndices) &&
          this.flush();
        let T = this.vqueue.length / this.stride;
        for (let C of t) this.vqueue.push(C);
        for (let C of h) this.iqueue.push(C + T);
        (this.curPrimitive = r),
          (this.curShader = c),
          (this.curTex = f),
          (this.curUniform = v);
      }
      flush() {
        if (
          !this.curPrimitive ||
          !this.curShader ||
          this.vqueue.length === 0 ||
          this.iqueue.length === 0
        )
          return;
        let r = this.ctx.gl;
        this.ctx.pushArrayBuffer(this.glVBuf),
          r.bufferSubData(r.ARRAY_BUFFER, 0, new Float32Array(this.vqueue)),
          this.ctx.pushElementArrayBuffer(this.glIBuf),
          r.bufferSubData(
            r.ELEMENT_ARRAY_BUFFER,
            0,
            new Uint16Array(this.iqueue)
          ),
          this.ctx.setVertexFormat(this.vertexFormat),
          this.curShader.bind(),
          this.curShader.send(this.curUniform),
          this.curTex?.bind(),
          r.drawElements(
            this.curPrimitive,
            this.iqueue.length,
            r.UNSIGNED_SHORT,
            0
          ),
          this.curTex?.unbind(),
          this.curShader.unbind(),
          this.ctx.popArrayBuffer(),
          this.ctx.popElementArrayBuffer(),
          (this.vqueue = []),
          (this.iqueue = []),
          this.numDraws++;
      }
      free() {
        let r = this.ctx.gl;
        r.deleteBuffer(this.glVBuf), r.deleteBuffer(this.glIBuf);
      }
    };
  function Xe(r) {
    let t = [],
      h = n((v) => {
        t.push(v), r(v);
      }, "push"),
      c = n(() => {
        t.pop(), r(f() ?? null);
      }, "pop"),
      f = n(() => t[t.length - 1], "cur");
    return [h, c, f];
  }
  n(Xe, "genStack");
  function hn(r, t = {}) {
    let h = [];
    function c(H) {
      h.push(H);
    }
    n(c, "onDestroy");
    function f() {
      h.forEach((H) => H()), r.getExtension("WEBGL_lose_context").loseContext();
    }
    n(f, "destroy");
    let v = null;
    function T(H) {
      if (Vr(H, v)) return;
      v = H;
      let xe = H.reduce((ge, ve) => ge + ve.size, 0);
      H.reduce(
        (ge, ve, Ke) => (
          r.vertexAttribPointer(Ke, ve.size, r.FLOAT, !1, xe * 4, ge),
          r.enableVertexAttribArray(Ke),
          ge + ve.size * 4
        ),
        0
      );
    }
    n(T, "setVertexFormat");
    let [C, Y] = Xe((H) => r.bindTexture(r.TEXTURE_2D, H)),
      [A, te] = Xe((H) => r.bindBuffer(r.ARRAY_BUFFER, H)),
      [b, K] = Xe((H) => r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, H)),
      [y, X] = Xe((H) => r.bindFramebuffer(r.FRAMEBUFFER, H)),
      [le, ee] = Xe((H) => r.bindRenderbuffer(r.RENDERBUFFER, H)),
      [U, de] = Xe(({ x: H, y: xe, w: ge, h: ve }) => {
        r.viewport(H, xe, ge, ve);
      }),
      [S, Me] = Xe((H) => r.useProgram(H));
    return (
      U({ x: 0, y: 0, w: r.drawingBufferWidth, h: r.drawingBufferHeight }),
      {
        gl: r,
        opts: t,
        onDestroy: c,
        destroy: f,
        pushTexture2D: C,
        popTexture2D: Y,
        pushArrayBuffer: A,
        popArrayBuffer: te,
        pushElementArrayBuffer: b,
        popElementArrayBuffer: K,
        pushFramebuffer: y,
        popFramebuffer: X,
        pushRenderbuffer: le,
        popRenderbuffer: ee,
        pushViewport: U,
        popViewport: de,
        pushProgram: S,
        popProgram: Me,
        setVertexFormat: T,
      }
    );
  }
  n(hn, "initGfx");
  var Te = class ln {
      static {
        n(this, "Asset");
      }
      loaded = !1;
      data = null;
      error = null;
      onLoadEvents = new Ie();
      onErrorEvents = new Ie();
      onFinishEvents = new Ie();
      constructor(t) {
        t.then((h) => {
          (this.data = h), this.onLoadEvents.trigger(h);
        })
          .catch((h) => {
            if (((this.error = h), this.onErrorEvents.numListeners() > 0))
              this.onErrorEvents.trigger(h);
            else throw h;
          })
          .finally(() => {
            this.onFinishEvents.trigger(), (this.loaded = !0);
          });
      }
      static loaded(t) {
        let h = new ln(Promise.resolve(t));
        return (h.data = t), (h.loaded = !0), h;
      }
      onLoad(t) {
        return (
          this.loaded && this.data ? t(this.data) : this.onLoadEvents.add(t),
          this
        );
      }
      onError(t) {
        return (
          this.loaded && this.error ? t(this.error) : this.onErrorEvents.add(t),
          this
        );
      }
      onFinish(t) {
        return this.loaded ? t() : this.onFinishEvents.add(t), this;
      }
      then(t) {
        return this.onLoad(t);
      }
      catch(t) {
        return this.onError(t);
      }
      finally(t) {
        return this.onFinish(t);
      }
    },
    Vt = class {
      static {
        n(this, "AssetBucket");
      }
      assets = new Map();
      lastUID = 0;
      add(r, t) {
        let h = r ?? this.lastUID++ + "",
          c = new Te(t);
        return this.assets.set(h, c), c;
      }
      addLoaded(r, t) {
        let h = r ?? this.lastUID++ + "",
          c = Te.loaded(t);
        return this.assets.set(h, c), c;
      }
      get(r) {
        return this.assets.get(r);
      }
      progress() {
        if (this.assets.size === 0) return 1;
        let r = 0;
        return (
          this.assets.forEach((t) => {
            t.loaded && r++;
          }),
          r / this.assets.size
        );
      }
    };
  function xr(r) {
    return fetch(r).then((t) => {
      if (!t.ok) throw new Error(`Failed to fetch "${r}"`);
      return t;
    });
  }
  n(xr, "fetchURL");
  function Xt(r) {
    return xr(r).then((t) => t.json());
  }
  n(Xt, "fetchJSON");
  function un(r) {
    return xr(r).then((t) => t.text());
  }
  n(un, "fetchText");
  function dn(r) {
    return xr(r).then((t) => t.arrayBuffer());
  }
  n(dn, "fetchArrayBuffer");
  function Wt(r) {
    let t = new Image();
    return (
      (t.crossOrigin = "anonymous"),
      (t.src = r),
      new Promise((h, c) => {
        (t.onload = () => h(t)),
          (t.onerror = () => c(new Error(`Failed to load image from "${r}"`)));
      })
    );
  }
  n(Wt, "loadImg");
  var dr = 2.5949095,
    Es = 1.70158 + 1,
    bs = (2 * Math.PI) / 3,
    Ss = (2 * Math.PI) / 4.5,
    Ar = {
      linear: (r) => r,
      easeInSine: (r) => 1 - Math.cos((r * Math.PI) / 2),
      easeOutSine: (r) => Math.sin((r * Math.PI) / 2),
      easeInOutSine: (r) => -(Math.cos(Math.PI * r) - 1) / 2,
      easeInQuad: (r) => r * r,
      easeOutQuad: (r) => 1 - (1 - r) * (1 - r),
      easeInOutQuad: (r) =>
        r < 0.5 ? 2 * r * r : 1 - Math.pow(-2 * r + 2, 2) / 2,
      easeInCubic: (r) => r * r * r,
      easeOutCubic: (r) => 1 - Math.pow(1 - r, 3),
      easeInOutCubic: (r) =>
        r < 0.5 ? 4 * r * r * r : 1 - Math.pow(-2 * r + 2, 3) / 2,
      easeInQuart: (r) => r * r * r * r,
      easeOutQuart: (r) => 1 - Math.pow(1 - r, 4),
      easeInOutQuart: (r) =>
        r < 0.5 ? 8 * r * r * r * r : 1 - Math.pow(-2 * r + 2, 4) / 2,
      easeInQuint: (r) => r * r * r * r * r,
      easeOutQuint: (r) => 1 - Math.pow(1 - r, 5),
      easeInOutQuint: (r) =>
        r < 0.5 ? 16 * r * r * r * r * r : 1 - Math.pow(-2 * r + 2, 5) / 2,
      easeInExpo: (r) => (r === 0 ? 0 : Math.pow(2, 10 * r - 10)),
      easeOutExpo: (r) => (r === 1 ? 1 : 1 - Math.pow(2, -10 * r)),
      easeInOutExpo: (r) =>
        r === 0
          ? 0
          : r === 1
          ? 1
          : r < 0.5
          ? Math.pow(2, 20 * r - 10) / 2
          : (2 - Math.pow(2, -20 * r + 10)) / 2,
      easeInCirc: (r) => 1 - Math.sqrt(1 - Math.pow(r, 2)),
      easeOutCirc: (r) => Math.sqrt(1 - Math.pow(r - 1, 2)),
      easeInOutCirc: (r) =>
        r < 0.5
          ? (1 - Math.sqrt(1 - Math.pow(2 * r, 2))) / 2
          : (Math.sqrt(1 - Math.pow(-2 * r + 2, 2)) + 1) / 2,
      easeInBack: (r) => Es * r * r * r - 1.70158 * r * r,
      easeOutBack: (r) =>
        1 + Es * Math.pow(r - 1, 3) + 1.70158 * Math.pow(r - 1, 2),
      easeInOutBack: (r) =>
        r < 0.5
          ? (Math.pow(2 * r, 2) * ((dr + 1) * 2 * r - dr)) / 2
          : (Math.pow(2 * r - 2, 2) * ((dr + 1) * (r * 2 - 2) + dr) + 2) / 2,
      easeInElastic: (r) =>
        r === 0
          ? 0
          : r === 1
          ? 1
          : -Math.pow(2, 10 * r - 10) * Math.sin((r * 10 - 10.75) * bs),
      easeOutElastic: (r) =>
        r === 0
          ? 0
          : r === 1
          ? 1
          : Math.pow(2, -10 * r) * Math.sin((r * 10 - 0.75) * bs) + 1,
      easeInOutElastic: (r) =>
        r === 0
          ? 0
          : r === 1
          ? 1
          : r < 0.5
          ? -(Math.pow(2, 20 * r - 10) * Math.sin((20 * r - 11.125) * Ss)) / 2
          : (Math.pow(2, -20 * r + 10) * Math.sin((20 * r - 11.125) * Ss)) / 2 +
            1,
      easeInBounce: (r) => 1 - Ar.easeOutBounce(1 - r),
      easeOutBounce: (r) =>
        r < 1 / 2.75
          ? 7.5625 * r * r
          : r < 2 / 2.75
          ? 7.5625 * (r -= 1.5 / 2.75) * r + 0.75
          : r < 2.5 / 2.75
          ? 7.5625 * (r -= 2.25 / 2.75) * r + 0.9375
          : 7.5625 * (r -= 2.625 / 2.75) * r + 0.984375,
      easeInOutBounce: (r) =>
        r < 0.5
          ? (1 - Ar.easeOutBounce(1 - 2 * r)) / 2
          : (1 + Ar.easeOutBounce(2 * r - 1)) / 2,
    },
    cr = Ar,
    Qn = class {
      static {
        n(this, "TexPacker");
      }
      textures = [];
      canvas;
      c2d;
      x = 0;
      y = 0;
      curHeight = 0;
      gfx;
      constructor(r, t, h) {
        (this.gfx = r),
          (this.canvas = document.createElement("canvas")),
          (this.canvas.width = t),
          (this.canvas.height = h),
          (this.textures = [ot.fromImage(r, this.canvas)]),
          (this.c2d = this.canvas.getContext("2d"));
      }
      add(r) {
        if (r.width > this.canvas.width || r.height > this.canvas.height)
          throw new Error(
            `Texture size (${r.width} x ${r.height}) exceeds limit (${this.canvas.width} x ${this.canvas.height})`
          );
        this.x + r.width > this.canvas.width &&
          ((this.x = 0), (this.y += this.curHeight), (this.curHeight = 0)),
          this.y + r.height > this.canvas.height &&
            (this.c2d.clearRect(0, 0, this.canvas.width, this.canvas.height),
            this.textures.push(ot.fromImage(this.gfx, this.canvas)),
            (this.x = 0),
            (this.y = 0),
            (this.curHeight = 0));
        let t = this.textures[this.textures.length - 1],
          h = new E(this.x, this.y);
        return (
          (this.x += r.width),
          r.height > this.curHeight && (this.curHeight = r.height),
          r instanceof ImageData
            ? this.c2d.putImageData(r, h.x, h.y)
            : this.c2d.drawImage(r, h.x, h.y),
          t.update(this.canvas),
          [
            t,
            new pe(
              h.x / this.canvas.width,
              h.y / this.canvas.height,
              r.width / this.canvas.width,
              r.height / this.canvas.height
            ),
          ]
        );
      }
      free() {
        for (let r of this.textures) r.free();
      }
    },
    zn =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA1CAYAAADyMeOEAAAAAXNSR0IArs4c6QAAAoVJREFUaIHdm7txwkAQhheGAqACiCHzOKQDQrqgILpwSAeEDBnEUAF0gCMxZ7G72qce/mec2Lpf9+3unaS78wgSNZ8uX5729+d1FNWXUuGmXlBOUUEIMckEpeQJgBu6C+BSFngztBR2vd+ovY+7g+p6LbgaWgJrAeUkDYIUXgXdBBwNi6kpABJwMTQH3AZsXRR8GHTfgEth8E3gjdAUcNewpbTgY85sCMCUuOokozE0YM0YRzM9NGAAXd8+omAF5h4lnmBRvpSnZHyLoLEbaN+aKB9KWv/KWw0tAbbANnlG+UvB2dm77NxxdwgBpjrF/d7rW9cbmpvio2A5z8iAYpVU8pGZlo6/2+MSco2lHfd3rv9jAP038e1xef9o2mjvYb2OqpqKE81028/jeietlSEVO5FRWsxWsJit1G3aFpW8iWe5RwpiCZAk25QvV6nz6fIlynRGuTd5WqpJ4guAlDfVKBK87hXljflgv1ON6fV+4+5gVlA17SfeG0heKqQd4l4jI/wrmaA9N9R4ar+wpHJDZyrrfcH0nB66PqAzPi76pn+faSyJk/vzOorYhGurQrzj/P68jtBMawHaHBIR9xoD5O34dy0qQOSYHvqExq2TpT2nf76+w7y251OYF0CRaU+J920TwLUa6inx6OxE6g80lu2ux7Y2eJLF/rCXE6zEPdnenk9o+4ih9AEdnW2q81HXl5LuU6OTl2fXUhqganbXAGq3g6jJOWV/OnoesO6YqqEB/GdNsjf7uHtwj2DzmRNpp7iOZfm6D9oAxB6Yi1gC4oIYeo4MIPdopEQRB+cAko5J1tW386HpB2Kz1eop4Epdwls/kgZ1sh8gZsEjdcWkr//D8Qu3Z3l5Nl1NtAAAAABJRU5ErkJggg==",
    Jn = Fn(
      "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L5QNSqT5iiySS9Ja2SV//5ME0ak//+4KgAAABgQBAADAMDgYCAEgCteQ0fZH6+ICXA357+MPfhR/+ywRf/U///LVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5JknQAFoWhGLm5gBClBmT3GiAAAAAGkHAAAIAAANIOAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"
    ),
    Xn =
      "data:image/png;base64,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",
    Wn =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOcAAACDCAYAAAB2kQxsAAAAAXNSR0IArs4c6QAABqxJREFUeJztnU1yFDkQRtMEB+AG7Fk6fBPO6ZsQLGc/N5gbMAtosJvqKv2kpPxS763A0W5XSXqVqZ+SngzgF58/fflx/7N///vnacW1gBkFD2Z2LOYNBF3Dx9UXAGs5kxLWwhNxU2qlJHrOhwLfkNZoiaBzIa3dCFJYLXgSboKXmETPeVDQyamR8vX55fe/v37/9vBzCDoH0tqktEpZ+t0IOh4KOBm16euZmETPtVDAiRgRLRF0HRRuEkrFrE1hzR4Lipxj+bD6AqCPz5++/Bgp5tXfdv1CeAdPPmFmSkn0nE+a0drdFm6XiOkdKWEuKRptTXqlLuqqFNaM6Dkb+T5nbb+npo8WjZVinqFantFJk9bWojaRThq7HzKN8wiPJ7aCoJHEZN5zHvJp7RE1DTV6SnZ1fa/PL1MjJtF5HmnT2tJF3GZ/BIj05I8ULUtR6ypER7ogjxpw61rRGxEal4KYjNyORzatbUlHSxr06tFcBTHPiN5NUEJWzlZKG/aKRqYk5tl1IKgPafucZ7w+vxSluLP6olHnL6MQQfYV6bpk/+BRZXm+cXHEiApSipZHlE6tRBDMkxmyysl5VsmtjXiFoJmiZU35ZWK0oNv1OY+omSv0GDDKJCaMI42cHg25dvFCi6QZxVS6ViVSpLUz38A4oiS9ySjlW2althGWKZrN6XNuOVpbwq0ReIzqZhfTrHwE/PZZuEYqcnqO0tZQGxVqRylprLGIEDXNkLOKEakbYsYiiphmiQaEZuD9BghixiKSmGYJIueqBt4TRZEyHtHENCNyNtMaRREzHhHFNBOKnKv7myVcVXKka4WfRBXTjMjpypl8iBmP6MsOmed0Bgk1UHjxXlpORIAWIqeybyGtha1QEdNMRM5s7wLCGpTENBORE6AXNTHNkBM2QFFMM4F5ToX5TYiLqphmRE7YmMhimiEnJEb9XBdJOUlp4Qp1Mc1E5QQ4I/qyvFJCy8n8JnijEjXNAi3fQ0TwIEM6e2OqnAgII8kkptkgOZEQZlN6BquZjqhVFxlBOkZq4Z6WASAFQQ8jZwQJ70FK8CTiaeb3fDSLJyMiwiwiS/q0SkwEBE+85jYjSTpcTiSE2WQRtVlOpAMVemVdtjXmlZxICFlQk/TJjHcmYS96JJ0p6KmcZggKeWmVdPopYwgKuxJVUuQE+EU0Sd99KYICxJH0ry9DUIA/rFy3WyWnGYLCnqyQ9PCXERTgmJmSPvwlBAU4p1bUWklPP1yytA9JYWdGRtLLDyEowDUjomiRwQgKUIZnJC3OgREUoByPSDpkDyEkBfhJj6RNQ7xEUYA6aiS9Cdo8SUoUBaijVtCuFQwICtBGiajdawARFKCNK0HdVtEjKUAd0+Q0q9v/FklhJ1rmP4e8JEoUBejfq2jYNgtEUdgJzwN7u6dSSkBQyMSME7O7FyHUQpoLCqw8rv5o+d6Uw3NvfzjagUkAZvOlLH1lLMyx8wCzWBEhW3ZDmLZ7NTsrwCpmyui5A1+IPidigjcjhZy14/vytBYxwRsPMVcf/2c2QU72wQUVIgj5lqFyIiZEJ5qQb1me1gLMJLKM93wY9cVETYiGkphmg+RETFhJljY2LHICQB/uchI1AXxwlRMxAfwgrYVtUHvxwk1OoiaAL8MjJ2ICtOEip1q6APnJEBS6VwiRzp4vtM5YBvf3m/EeI8DyvUZK33z4+v1bqsZ7dN+3n2W6zwgMO44hY0X1vIqkXh419x7lXh9ds8oyviFyRqmcXrxf2FUtF89ymFkG6nI2p7WZB4FGvUWfLcVt4ahsdy+TR7ifz6lc0F5v0GfalmXldpE3esrr6PrTR84sjNjS4kpQhQhaUi4lD6KR1xK9DHupfoKoR02vSFDy9FWNoKVivv1/lG7OfZkqR043OZUbWgmtFaomaGl51ZTHCnFv5bqNnFGjZvRtEFUEHSHmI1ZHWgVBXZ5+sxvX7ANlPChpjKsknSllKaPlRU4nZo0Yjq6wiIJGFPMML2mj3M8ZRRe4QkzF6FhCJEFbBn4i0iKswn11yenZiLLKeMRqQdWiZSmlkqrcV9d0gPfksAcqBW+2ZqAoq5gZGSrnTtGwlVmCIqUepxWxerj7iIyNZ7SgiKmJhJw7NJpRgiKmLuHl3KnReA4UIaU+y+WkcbzHQ1DEzMGQ9aJH0BDK6RE0y9wlTDp2HuppERQxc0FFBaZGUMTMB5UlQG/fHyk1odJEaBUUMXWh4oSoFRQxtaHyxMi2uBseQwUKciUoYuaAShTlkaCImQcqUph7QREzF/8DSS/2GZ2/N/sAAAAASUVORK5CYII=",
    Zn = "3000.1.17",
    Rs =
      " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
    fr = "topleft",
    Ms = 64,
    _n = "monospace",
    pr = "monospace",
    $n = 36,
    gr = 64,
    mr = 256,
    Ps = 2048,
    Ts = 2048,
    Bs = 2048,
    Fs = 2048,
    Is = 0.1,
    eo = 64,
    Kr = "linear",
    to = 8,
    ro = 4,
    ri = [
      { name: "a_pos", size: 2 },
      { name: "a_uv", size: 2 },
      { name: "a_color", size: 4 },
    ],
    io = ri.reduce((r, t) => r + t.size, 0),
    cn = 2048,
    so = cn * 4 * io,
    no = cn * 6,
    oo = `
attribute vec2 a_pos;
attribute vec2 a_uv;
attribute vec4 a_color;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

vec4 def_vert() {
	return vec4(a_pos, 0.0, 1.0);
}

{{user}}

void main() {
	vec4 pos = vert(a_pos, a_uv, a_color);
	v_pos = a_pos;
	v_uv = a_uv;
	v_color = a_color;
	gl_Position = pos;
}
`,
    ao = `
precision mediump float;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

uniform sampler2D u_tex;

vec4 def_frag() {
	return v_color * texture2D(u_tex, v_uv);
}

{{user}}

void main() {
	gl_FragColor = frag(v_pos, v_uv, v_color, u_tex);
	if (gl_FragColor.a == 0.0) {
		discard;
	}
}
`,
    jr = `
vec4 vert(vec2 pos, vec2 uv, vec4 color) {
	return def_vert();
}
`,
    Qr = `
vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	return def_frag();
}
`,
    ho = new Set(["id", "require"]),
    lo = new Set([
      "add",
      "update",
      "draw",
      "destroy",
      "inspect",
      "drawInspect",
    ]);
  function nt(r) {
    switch (r) {
      case "topleft":
        return new E(-1, -1);
      case "top":
        return new E(0, -1);
      case "topright":
        return new E(1, -1);
      case "left":
        return new E(-1, 0);
      case "center":
        return new E(0, 0);
      case "right":
        return new E(1, 0);
      case "botleft":
        return new E(-1, 1);
      case "bot":
        return new E(0, 1);
      case "botright":
        return new E(1, 1);
      default:
        return r;
    }
  }
  n(nt, "anchorPt");
  function fn(r) {
    switch (r) {
      case "left":
        return 0;
      case "center":
        return 0.5;
      case "right":
        return 1;
      default:
        return 0;
    }
  }
  n(fn, "alignPt");
  function pn(r) {
    return r.createBuffer(1, 1, 44100);
  }
  n(pn, "createEmptyAudioBuffer");
  var gn = n((r = {}) => {
    let t = r.root ?? document.body;
    t === document.body &&
      ((document.body.style.width = "100%"),
      (document.body.style.height = "100%"),
      (document.body.style.margin = "0px"),
      (document.documentElement.style.width = "100%"),
      (document.documentElement.style.height = "100%"));
    let h =
        r.canvas ??
        (() => {
          let e = document.createElement("canvas");
          return t.appendChild(e), e;
        })(),
      c = r.scale ?? 1,
      f = r.width && r.height && !r.stretch && !r.letterbox;
    f
      ? ((h.width = r.width * c), (h.height = r.height * c))
      : ((h.width = h.parentElement.offsetWidth),
        (h.height = h.parentElement.offsetHeight));
    let v = ["outline: none", "cursor: default"];
    if (f) {
      let e = h.width,
        i = h.height;
      v.push(`width: ${e}px`), v.push(`height: ${i}px`);
    } else v.push("width: 100%"), v.push("height: 100%");
    r.crisp &&
      (v.push("image-rendering: pixelated"),
      v.push("image-rendering: crisp-edges")),
      (h.style.cssText = v.join(";"));
    let T = r.pixelDensity || window.devicePixelRatio;
    (h.width *= T), (h.height *= T), (h.tabIndex = 0);
    let C = document.createElement("canvas");
    (C.width = mr), (C.height = mr);
    let Y = C.getContext("2d", { willReadFrequently: !0 }),
      A = Yn({
        canvas: h,
        touchToMouse: r.touchToMouse,
        gamepads: r.gamepads,
        pixelDensity: r.pixelDensity,
        maxFPS: r.maxFPS,
      }),
      te = [],
      b = A.canvas.getContext("webgl", {
        antialias: !0,
        depth: !0,
        stencil: !0,
        alpha: !0,
        preserveDrawingBuffer: !0,
      }),
      K = hn(b, { texFilter: r.texFilter }),
      y = (() => {
        let e = $e(jr, Qr),
          i = ot.fromImage(
            K,
            new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)
          ),
          s =
            r.width && r.height
              ? new ur(K, r.width * T * c, r.height * T * c)
              : new ur(K, b.drawingBufferWidth, b.drawingBufferHeight),
          a = null,
          o = 1;
        r.background &&
          ((a = W(r.background)),
          (o = Array.isArray(r.background) ? r.background[3] : 1),
          b.clearColor(a.r / 255, a.g / 255, a.b / 255, o ?? 1)),
          b.enable(b.BLEND),
          b.blendFuncSeparate(
            b.SRC_ALPHA,
            b.ONE_MINUS_SRC_ALPHA,
            b.ONE,
            b.ONE_MINUS_SRC_ALPHA
          );
        let l = new jn(K, ri, so, no),
          p = ot.fromImage(
            K,
            new ImageData(
              new Uint8ClampedArray([
                128, 128, 128, 255, 190, 190, 190, 255, 190, 190, 190, 255, 128,
                128, 128, 255,
              ]),
              2,
              2
            ),
            { wrap: "repeat", filter: "nearest" }
          );
        return {
          lastDrawCalls: 0,
          defShader: e,
          defTex: i,
          frameBuffer: s,
          postShader: null,
          postShaderUniform: null,
          renderer: l,
          transform: new ke(),
          transformStack: [],
          bgTex: p,
          bgColor: a,
          bgAlpha: o,
          width: r.width ?? b.drawingBufferWidth / T / c,
          height: r.height ?? b.drawingBufferHeight / T / c,
          viewport: {
            x: 0,
            y: 0,
            width: b.drawingBufferWidth,
            height: b.drawingBufferHeight,
          },
          fixed: !1,
        };
      })();
    class X {
      static {
        n(this, "SpriteData");
      }
      tex;
      frames = [new pe(0, 0, 1, 1)];
      anims = {};
      slice9 = null;
      constructor(i, s, a = {}, o = null) {
        (this.tex = i),
          s && (this.frames = s),
          (this.anims = a),
          (this.slice9 = o);
      }
      get width() {
        return this.tex.width * this.frames[0].w;
      }
      get height() {
        return this.tex.height * this.frames[0].h;
      }
      static from(i, s = {}) {
        return typeof i == "string"
          ? X.fromURL(i, s)
          : Promise.resolve(X.fromImage(i, s));
      }
      static fromImage(i, s = {}) {
        let [a, o] = U.packer.add(i),
          l = s.frames
            ? s.frames.map(
                (p) =>
                  new pe(o.x + p.x * o.w, o.y + p.y * o.h, p.w * o.w, p.h * o.h)
              )
            : at(s.sliceX || 1, s.sliceY || 1, o.x, o.y, o.w, o.h);
        return new X(a, l, s.anims, s.slice9);
      }
      static fromURL(i, s = {}) {
        return Wt(i).then((a) => X.fromImage(a, s));
      }
    }
    class le {
      static {
        n(this, "SoundData");
      }
      buf;
      constructor(i) {
        this.buf = i;
      }
      static fromArrayBuffer(i) {
        return new Promise((s, a) => ee.ctx.decodeAudioData(i, s, a)).then(
          (s) => new le(s)
        );
      }
      static fromURL(i) {
        return ys(i)
          ? le.fromArrayBuffer(Js(i))
          : dn(i).then((s) => le.fromArrayBuffer(s));
      }
    }
    let ee = (() => {
        let e = new (window.AudioContext || window.webkitAudioContext)(),
          i = e.createGain();
        i.connect(e.destination);
        let s = new le(pn(e));
        return (
          e
            .decodeAudioData(Jn.buffer.slice(0))
            .then((a) => {
              s.buf = a;
            })
            .catch((a) => {
              console.error("Failed to load burp: ", a);
            }),
          { ctx: e, masterNode: i, burpSnd: s }
        );
      })(),
      U = {
        urlPrefix: "",
        sprites: new Vt(),
        fonts: new Vt(),
        bitmapFonts: new Vt(),
        sounds: new Vt(),
        shaders: new Vt(),
        custom: new Vt(),
        packer: new Qn(K, Bs, Fs),
        loaded: !1,
      };
    function de(e) {
      return typeof e != "string" || ys(e) ? e : U.urlPrefix + e;
    }
    n(de, "fixURL");
    let S = {
      events: new Jt(),
      objEvents: new Jt(),
      root: sr([]),
      gravity: 0,
      scenes: {},
      logs: [],
      cam: {
        pos: null,
        scale: new E(1),
        angle: 0,
        shake: 0,
        transform: new ke(),
      },
    };
    S.root.use(ar());
    function Me(e) {
      return U.custom.add(null, e);
    }
    n(Me, "load");
    function H() {
      let e = [
        U.sprites,
        U.sounds,
        U.shaders,
        U.fonts,
        U.bitmapFonts,
        U.custom,
      ];
      return e.reduce((i, s) => i + s.progress(), 0) / e.length;
    }
    n(H, "loadProgress");
    function xe(e) {
      return e !== void 0 && (U.urlPrefix = e), U.urlPrefix;
    }
    n(xe, "loadRoot");
    function ge(e, i) {
      return U.custom.add(e, Xt(i));
    }
    n(ge, "loadJSON");
    class ve {
      static {
        n(this, "FontData");
      }
      fontface;
      filter = Kr;
      outline = null;
      size = gr;
      constructor(i, s = {}) {
        if (
          ((this.fontface = i),
          (this.filter = s.filter ?? Kr),
          (this.size = s.size ?? gr),
          this.size > mr)
        )
          throw new Error(`Max font size: ${mr}`);
        s.outline &&
          ((this.outline = { width: 1, color: W(0, 0, 0) }),
          typeof s.outline == "number"
            ? (this.outline.width = s.outline)
            : typeof s.outline == "object" &&
              (s.outline.width && (this.outline.width = s.outline.width),
              s.outline.color && (this.outline.color = s.outline.color)));
      }
    }
    function Ke(e, i, s = {}) {
      let a = new FontFace(e, typeof i == "string" ? `url(${i})` : i);
      return (
        document.fonts.add(a),
        U.fonts.add(
          e,
          a
            .load()
            .catch((o) => {
              throw new Error(`Failed to load font from "${i}": ${o}`);
            })
            .then((o) => new ve(o, s))
        )
      );
    }
    n(Ke, "loadFont");
    function bt(e, i, s, a, o = {}) {
      return U.bitmapFonts.add(
        e,
        Wt(i).then((l) => kt(ot.fromImage(K, l, o), s, a, o.chars ?? Rs))
      );
    }
    n(bt, "loadBitmapFont");
    function at(e = 1, i = 1, s = 0, a = 0, o = 1, l = 1) {
      let p = [],
        w = o / e,
        g = l / i;
      for (let u = 0; u < i; u++)
        for (let m = 0; m < e; m++) p.push(new pe(s + m * w, a + u * g, w, g));
      return p;
    }
    n(at, "slice");
    function ht(e, i) {
      return (
        (e = de(e)),
        Me(
          typeof i == "string"
            ? new Promise((s, a) => {
                Xt(i).then((o) => {
                  ht(e, o).then(s).catch(a);
                });
              })
            : X.from(e).then((s) => {
                let a = {};
                for (let o in i) {
                  let l = i[o],
                    p = s.frames[0],
                    w = Bs * p.w,
                    g = Fs * p.h,
                    u = l.frames
                      ? l.frames.map(
                          (P) =>
                            new pe(
                              p.x + ((l.x + P.x) / w) * p.w,
                              p.y + ((l.y + P.y) / g) * p.h,
                              (P.w / w) * p.w,
                              (P.h / g) * p.h
                            )
                        )
                      : at(
                          l.sliceX || 1,
                          l.sliceY || 1,
                          p.x + (l.x / w) * p.w,
                          p.y + (l.y / g) * p.h,
                          (l.width / w) * p.w,
                          (l.height / g) * p.h
                        ),
                    m = new X(s.tex, u, l.anims);
                  U.sprites.addLoaded(o, m), (a[o] = m);
                }
                return a;
              })
        )
      );
    }
    n(ht, "loadSpriteAtlas");
    function lt(e, i = {}) {
      let s = document.createElement("canvas"),
        a = e[0].width,
        o = e[0].height;
      (s.width = a * e.length), (s.height = o);
      let l = s.getContext("2d");
      e.forEach((w, g) => {
        w instanceof ImageData
          ? l.putImageData(w, g * a, 0)
          : l.drawImage(w, g * a, 0);
      });
      let p = l.getImageData(0, 0, e.length * a, o);
      return X.fromImage(p, { ...i, sliceX: e.length, sliceY: 1 });
    }
    n(lt, "createSpriteSheet");
    function Ue(e, i, s = { sliceX: 1, sliceY: 1, anims: {} }) {
      return (
        (i = de(i)),
        Array.isArray(i)
          ? i.some((a) => typeof a == "string")
            ? U.sprites.add(
                e,
                Promise.all(
                  i.map((a) =>
                    typeof a == "string" ? Wt(a) : Promise.resolve(a)
                  )
                ).then((a) => lt(a, s))
              )
            : U.sprites.addLoaded(e, lt(i, s))
          : typeof i == "string"
          ? U.sprites.add(e, X.from(i, s))
          : U.sprites.addLoaded(e, X.fromImage(i, s))
      );
    }
    n(Ue, "loadSprite");
    function St(e, i) {
      return (
        (i = de(i)),
        U.sprites.add(
          e,
          new Promise(async (s) => {
            let a = typeof i == "string" ? await Xt(i) : i,
              o = await Promise.all(a.frames.map(Wt)),
              l = document.createElement("canvas");
            (l.width = a.width), (l.height = a.height * a.frames.length);
            let p = l.getContext("2d");
            o.forEach((g, u) => {
              p.drawImage(g, 0, u * a.height);
            });
            let w = await Ue(null, l, {
              sliceY: a.frames.length,
              anims: a.anims,
            });
            s(w);
          })
        )
      );
    }
    n(St, "loadPedit");
    function Rt(e, i, s) {
      (i = de(i)),
        (s = de(s)),
        typeof i == "string" && !s && (s = Nn(i) + ".json");
      let a = typeof s == "string" ? Xt(s) : Promise.resolve(s);
      return U.sprites.add(
        e,
        a.then((o) => {
          let l = o.meta.size,
            p = o.frames.map(
              (g) =>
                new pe(
                  g.frame.x / l.w,
                  g.frame.y / l.h,
                  g.frame.w / l.w,
                  g.frame.h / l.h
                )
            ),
            w = {};
          for (let g of o.meta.frameTags)
            g.from === g.to
              ? (w[g.name] = g.from)
              : (w[g.name] = {
                  from: g.from,
                  to: g.to,
                  speed: 10,
                  loop: !0,
                  pingpong: g.direction === "pingpong",
                });
          return X.from(i, { frames: p, anims: w });
        })
      );
    }
    n(Rt, "loadAseprite");
    function $t(e, i, s) {
      return U.shaders.addLoaded(e, $e(i, s));
    }
    n($t, "loadShader");
    function er(e, i, s) {
      (i = de(i)), (s = de(s));
      let a = n((l) => (l ? un(l) : Promise.resolve(null)), "resolveUrl"),
        o = Promise.all([a(i), a(s)]).then(([l, p]) => $e(l, p));
      return U.shaders.add(e, o);
    }
    n(er, "loadShaderURL");
    function tr(e, i) {
      return (
        (i = de(i)),
        U.sounds.add(
          e,
          typeof i == "string" ? le.fromURL(i) : le.fromArrayBuffer(i)
        )
      );
    }
    n(tr, "loadSound");
    function rr(e = "bean") {
      return Ue(e, zn);
    }
    n(rr, "loadBean");
    function Mt(e) {
      return U.sprites.get(e);
    }
    n(Mt, "getSprite");
    function Pt(e) {
      return U.sounds.get(e);
    }
    n(Pt, "getSound");
    function Tt(e) {
      return U.fonts.get(e);
    }
    n(Tt, "getFont");
    function ut(e) {
      return U.bitmapFonts.get(e);
    }
    n(ut, "getBitmapFont");
    function dt(e) {
      return U.shaders.get(e);
    }
    n(dt, "getShader");
    function Bt(e) {
      return U.custom.get(e);
    }
    n(Bt, "getAsset");
    function _e(e) {
      if (typeof e == "string") {
        let i = Mt(e);
        if (i) return i;
        if (H() < 1) return null;
        throw new Error(`Sprite not found: ${e}`);
      } else {
        if (e instanceof X) return Te.loaded(e);
        if (e instanceof Te) return e;
        throw new Error(`Invalid sprite: ${e}`);
      }
    }
    n(_e, "resolveSprite");
    function Ft(e) {
      if (typeof e == "string") {
        let i = Pt(e);
        if (i) return i;
        if (H() < 1) return null;
        throw new Error(`Sound not found: ${e}`);
      } else {
        if (e instanceof le) return Te.loaded(e);
        if (e instanceof Te) return e;
        throw new Error(`Invalid sound: ${e}`);
      }
    }
    n(Ft, "resolveSound");
    function It(e) {
      if (!e) return y.defShader;
      if (typeof e == "string") {
        let i = dt(e);
        if (i) return i.data ?? i;
        if (H() < 1) return null;
        throw new Error(`Shader not found: ${e}`);
      } else if (e instanceof Te) return e.data ? e.data : e;
      return e;
    }
    n(It, "resolveShader");
    function ct(e) {
      if (!e) return ct(r.font ?? _n);
      if (typeof e == "string") {
        let i = ut(e),
          s = Tt(e);
        if (i) return i.data ?? i;
        if (s) return s.data ?? s;
        if (document.fonts.check(`${gr}px ${e}`)) return e;
        if (H() < 1) return null;
        throw new Error(`Font not found: ${e}`);
      } else if (e instanceof Te) return e.data ? e.data : e;
      return e;
    }
    n(ct, "resolveFont");
    function Dt(e) {
      return (
        e !== void 0 && (ee.masterNode.gain.value = e), ee.masterNode.gain.value
      );
    }
    n(Dt, "volume");
    function ft(e, i = {}) {
      let s = ee.ctx,
        a = i.paused ?? !1,
        o = s.createBufferSource(),
        l = new Ie(),
        p = s.createGain(),
        w = i.seek ?? 0,
        g = 0,
        u = 0,
        m = !1;
      (o.loop = !!i.loop),
        (o.detune.value = i.detune ?? 0),
        (o.playbackRate.value = i.speed ?? 1),
        o.connect(p),
        (o.onended = () => {
          L() >= o.buffer?.duration && l.trigger();
        }),
        p.connect(ee.masterNode),
        (p.gain.value = i.volume ?? 1);
      let P = n((D) => {
          (o.buffer = D.buf),
            a || ((g = s.currentTime), o.start(0, w), (m = !0));
        }, "start"),
        B = Ft(e);
      B instanceof Te && B.onLoad(P);
      let L = n(() => {
          if (!o.buffer) return 0;
          let D = a ? u - g : s.currentTime - g,
            N = o.buffer.duration;
          return o.loop ? D % N : Math.min(D, N);
        }, "getTime"),
        G = n((D) => {
          let N = s.createBufferSource();
          return (
            (N.buffer = D.buffer),
            (N.loop = D.loop),
            (N.playbackRate.value = D.playbackRate.value),
            (N.detune.value = D.detune.value),
            (N.onended = D.onended),
            N.connect(p),
            N
          );
        }, "cloneNode");
      return {
        stop() {
          (this.paused = !0), this.seek(0);
        },
        set paused(D) {
          if (a !== D)
            if (((a = D), D)) m && (o.stop(), (m = !1)), (u = s.currentTime);
            else {
              o = G(o);
              let N = u - g;
              o.start(0, N), (m = !0), (g = s.currentTime - N), (u = 0);
            }
        },
        get paused() {
          return a;
        },
        play(D = 0) {
          this.seek(D), (this.paused = !1);
        },
        seek(D) {
          o.buffer?.duration &&
            (D > o.buffer.duration ||
              (a
                ? ((o = G(o)), (g = u - D))
                : (o.stop(),
                  (o = G(o)),
                  (g = s.currentTime - D),
                  o.start(0, D),
                  (m = !0),
                  (u = 0))));
        },
        set speed(D) {
          o.playbackRate.value = D;
        },
        get speed() {
          return o.playbackRate.value;
        },
        set detune(D) {
          o.detune.value = D;
        },
        get detune() {
          return o.detune.value;
        },
        set volume(D) {
          p.gain.value = Math.max(D, 0);
        },
        get volume() {
          return p.gain.value;
        },
        set loop(D) {
          o.loop = D;
        },
        get loop() {
          return o.loop;
        },
        duration() {
          return o.buffer?.duration ?? 0;
        },
        time() {
          return L() % this.duration();
        },
        onEnd(D) {
          return l.add(D);
        },
        then(D) {
          return this.onEnd(D);
        },
      };
    }
    n(ft, "play");
    function pt(e) {
      return ft(ee.burpSnd, e);
    }
    n(pt, "burp");
    function Ct(e, i) {
      return new ur(K, e, i);
    }
    n(Ct, "makeCanvas");
    function $e(e = jr, i = Qr) {
      let s = oo.replace("{{user}}", e ?? jr),
        a = ao.replace("{{user}}", i ?? Qr);
      try {
        return new Kn(
          K,
          s,
          a,
          ri.map((o) => o.name)
        );
      } catch (o) {
        let l = /(?<type>^\w+) SHADER ERROR: 0:(?<line>\d+): (?<msg>.+)/,
          p = Ln(o).match(l),
          w = Number(p.groups.line) - 14,
          g = p.groups.msg.trim(),
          u = p.groups.type.toLowerCase();
        throw new Error(`${u} shader line ${w}: ${g}`);
      }
    }
    n($e, "makeShader");
    function kt(e, i, s, a) {
      let o = e.width / i,
        l = {},
        p = a.split("").entries();
      for (let [w, g] of p)
        l[g] = new pe((w % o) * i, Math.floor(w / o) * s, i, s);
      return { tex: e, map: l, size: s };
    }
    n(kt, "makeFont");
    function et(e, i, s, a = y.defTex, o = y.defShader, l = {}) {
      let p = It(o);
      if (!p || p instanceof Te) return;
      let w = y.fixed || s ? y.transform : S.cam.transform.mult(y.transform),
        g = [];
      for (let u of e) {
        let m = Nt(w.multVec2(u.pos));
        g.push(
          m.x,
          m.y,
          u.uv.x,
          u.uv.y,
          u.color.r / 255,
          u.color.g / 255,
          u.color.b / 255,
          u.opacity
        );
      }
      y.renderer.push(b.TRIANGLES, g, i, p, a, l);
    }
    n(et, "drawRaw");
    function Pe() {
      y.renderer.flush();
    }
    n(Pe, "flush");
    function tt() {
      b.clear(b.COLOR_BUFFER_BIT),
        y.frameBuffer.bind(),
        b.clear(b.COLOR_BUFFER_BIT),
        y.bgColor ||
          be(() => {
            Ce({
              width: we(),
              height: Ae(),
              quad: new pe(0, 0, we() / Ms, Ae() / Ms),
              tex: y.bgTex,
              fixed: !0,
            });
          }),
        (y.renderer.numDraws = 0),
        (y.fixed = !1),
        (y.transformStack.length = 0),
        (y.transform = new ke());
    }
    n(tt, "frameStart");
    function gt(e, i) {
      (y.postShader = e), (y.postShaderUniform = i ?? null);
    }
    n(gt, "usePostEffect");
    function rt() {
      Pe(),
        (y.lastDrawCalls = y.renderer.numDraws),
        y.frameBuffer.unbind(),
        b.viewport(0, 0, b.drawingBufferWidth, b.drawingBufferHeight);
      let e = y.width,
        i = y.height;
      (y.width = b.drawingBufferWidth / T),
        (y.height = b.drawingBufferHeight / T),
        je({
          flipY: !0,
          tex: y.frameBuffer.tex,
          pos: new E(y.viewport.x, y.viewport.y),
          width: y.viewport.width,
          height: y.viewport.height,
          shader: y.postShader,
          uniform:
            typeof y.postShaderUniform == "function"
              ? y.postShaderUniform()
              : y.postShaderUniform,
          fixed: !0,
        }),
        Pe(),
        (y.width = e),
        (y.height = i);
    }
    n(rt, "frameEnd");
    function Nt(e) {
      return new E((e.x / we()) * 2 - 1, (-e.y / Ae()) * 2 + 1);
    }
    n(Nt, "screen2ndc");
    function mt(e) {
      y.transform = e.clone();
    }
    n(mt, "pushMatrix");
    function _(...e) {
      if (e[0] === void 0) return;
      let i = M(...e);
      (i.x === 0 && i.y === 0) || y.transform.translate(i);
    }
    n(_, "pushTranslate");
    function De(...e) {
      if (e[0] === void 0) return;
      let i = M(...e);
      (i.x === 1 && i.y === 1) || y.transform.scale(i);
    }
    n(De, "pushScale");
    function re(e) {
      e && y.transform.rotate(e);
    }
    n(re, "pushRotate");
    function ae() {
      y.transformStack.push(y.transform.clone());
    }
    n(ae, "pushTransform");
    function se() {
      y.transformStack.length > 0 && (y.transform = y.transformStack.pop());
    }
    n(se, "popTransform");
    function Ce(e) {
      if (e.width === void 0 || e.height === void 0)
        throw new Error('drawUVQuad() requires property "width" and "height".');
      if (e.width <= 0 || e.height <= 0) return;
      let i = e.width,
        s = e.height,
        a = nt(e.anchor || fr).scale(new E(i, s).scale(-0.5)),
        o = e.quad || new pe(0, 0, 1, 1),
        l = e.color || W(255, 255, 255),
        p = e.opacity ?? 1,
        w = e.tex ? Is / e.tex.width : 0,
        g = e.tex ? Is / e.tex.height : 0,
        u = o.x + w,
        m = o.y + g,
        P = o.w - w * 2,
        B = o.h - g * 2;
      ae(),
        _(e.pos),
        re(e.angle),
        De(e.scale),
        _(a),
        et(
          [
            {
              pos: new E(-i / 2, s / 2),
              uv: new E(e.flipX ? u + P : u, e.flipY ? m : m + B),
              color: l,
              opacity: p,
            },
            {
              pos: new E(-i / 2, -s / 2),
              uv: new E(e.flipX ? u + P : u, e.flipY ? m + B : m),
              color: l,
              opacity: p,
            },
            {
              pos: new E(i / 2, -s / 2),
              uv: new E(e.flipX ? u : u + P, e.flipY ? m + B : m),
              color: l,
              opacity: p,
            },
            {
              pos: new E(i / 2, s / 2),
              uv: new E(e.flipX ? u : u + P, e.flipY ? m : m + B),
              color: l,
              opacity: p,
            },
          ],
          [0, 1, 3, 1, 2, 3],
          e.fixed,
          e.tex,
          e.shader,
          e.uniform
        ),
        se();
    }
    n(Ce, "drawUVQuad");
    function je(e) {
      if (!e.tex) throw new Error('drawTexture() requires property "tex".');
      let i = e.quad ?? new pe(0, 0, 1, 1),
        s = e.tex.width * i.w,
        a = e.tex.height * i.h,
        o = new E(1);
      if (e.tiled) {
        let l = Math.ceil((e.width || s) / s),
          p = Math.ceil((e.height || a) / a),
          w = nt(e.anchor || fr)
            .add(new E(1, 1))
            .scale(0.5)
            .scale(l * s, p * a);
        for (let g = 0; g < l; g++)
          for (let u = 0; u < p; u++)
            Ce(
              Object.assign({}, e, {
                pos: (e.pos || new E(0)).add(new E(s * g, a * u)).sub(w),
                scale: o.scale(e.scale || new E(1)),
                tex: e.tex,
                quad: i,
                width: s,
                height: a,
                anchor: "topleft",
              })
            );
      } else
        e.width && e.height
          ? ((o.x = e.width / s), (o.y = e.height / a))
          : e.width
          ? ((o.x = e.width / s), (o.y = o.x))
          : e.height && ((o.y = e.height / a), (o.x = o.y)),
          Ce(
            Object.assign({}, e, {
              scale: o.scale(e.scale || new E(1)),
              tex: e.tex,
              quad: i,
              width: s,
              height: a,
            })
          );
    }
    n(je, "drawTexture");
    function ir(e) {
      if (!e.sprite) throw new Error('drawSprite() requires property "sprite"');
      let i = _e(e.sprite);
      if (!i || !i.data) return;
      let s = i.data.frames[e.frame ?? 0];
      if (!s) throw new Error(`Frame not found: ${e.frame ?? 0}`);
      je(
        Object.assign({}, e, {
          tex: i.data.tex,
          quad: s.scale(e.quad ?? new pe(0, 0, 1, 1)),
        })
      );
    }
    n(ir, "drawSprite");
    function Le(e, i, s, a, o, l = 1) {
      (a = Ne(a % 360)), (o = Ne(o % 360)), o <= a && (o += Math.PI * 2);
      let p = [],
        w = Math.ceil(((o - a) / Ne(8)) * l),
        g = (o - a) / w;
      for (let u = a; u < o; u += g)
        p.push(e.add(i * Math.cos(u), s * Math.sin(u)));
      return p.push(e.add(i * Math.cos(o), s * Math.sin(o))), p;
    }
    n(Le, "getArcPts");
    function me(e) {
      if (e.width === void 0 || e.height === void 0)
        throw new Error('drawRect() requires property "width" and "height".');
      if (e.width <= 0 || e.height <= 0) return;
      let i = e.width,
        s = e.height,
        a = nt(e.anchor || fr)
          .add(1, 1)
          .scale(new E(i, s).scale(-0.5)),
        o = [new E(0, 0), new E(i, 0), new E(i, s), new E(0, s)];
      if (e.radius) {
        let l = Math.min(Math.min(i, s) / 2, e.radius);
        o = [
          new E(l, 0),
          new E(i - l, 0),
          ...Le(new E(i - l, l), l, l, 270, 360),
          new E(i, l),
          new E(i, s - l),
          ...Le(new E(i - l, s - l), l, l, 0, 90),
          new E(i - l, s),
          new E(l, s),
          ...Le(new E(l, s - l), l, l, 90, 180),
          new E(0, s - l),
          new E(0, l),
          ...Le(new E(l, l), l, l, 180, 270),
        ];
      }
      ue(
        Object.assign({}, e, {
          offset: a,
          pts: o,
          ...(e.gradient
            ? {
                colors: e.horizontal
                  ? [e.gradient[0], e.gradient[1], e.gradient[1], e.gradient[0]]
                  : [
                      e.gradient[0],
                      e.gradient[0],
                      e.gradient[1],
                      e.gradient[1],
                    ],
              }
            : {}),
        })
      );
    }
    n(me, "drawRect");
    function d(e) {
      let { p1: i, p2: s } = e;
      if (!i || !s)
        throw new Error('drawLine() requires properties "p1" and "p2".');
      let a = e.width || 1,
        o = s
          .sub(i)
          .unit()
          .normal()
          .scale(a * 0.5),
        l = [i.sub(o), i.add(o), s.add(o), s.sub(o)].map((p) => ({
          pos: new E(p.x, p.y),
          uv: new E(0),
          color: e.color ?? $.WHITE,
          opacity: e.opacity ?? 1,
        }));
      et(l, [0, 1, 3, 1, 2, 3], e.fixed, y.defTex, e.shader, e.uniform);
    }
    n(d, "drawLine");
    function V(e) {
      let i = e.pts;
      if (!i) throw new Error('drawLines() requires property "pts".');
      if (!(i.length < 2))
        if (e.radius && i.length >= 3) {
          let s = i[0].sdist(i[1]);
          for (let o = 1; o < i.length - 1; o++)
            s = Math.min(i[o].sdist(i[o + 1]), s);
          let a = Math.min(e.radius, Math.sqrt(s) / 2);
          d(Object.assign({}, e, { p1: i[0], p2: i[1] }));
          for (let o = 1; o < i.length - 2; o++) {
            let l = i[o],
              p = i[o + 1];
            d(Object.assign({}, e, { p1: l, p2: p }));
          }
          d(Object.assign({}, e, { p1: i[i.length - 2], p2: i[i.length - 1] }));
        } else
          for (let s = 0; s < i.length - 1; s++)
            d(Object.assign({}, e, { p1: i[s], p2: i[s + 1] })),
              e.join !== "none" &&
                q(Object.assign({}, e, { pos: i[s], radius: e.width / 2 }));
    }
    n(V, "drawLines");
    function R(e) {
      if (!e.p1 || !e.p2 || !e.p3)
        throw new Error(
          'drawTriangle() requires properties "p1", "p2" and "p3".'
        );
      return ue(Object.assign({}, e, { pts: [e.p1, e.p2, e.p3] }));
    }
    n(R, "drawTriangle");
    function q(e) {
      if (typeof e.radius != "number")
        throw new Error('drawCircle() requires property "radius".');
      e.radius !== 0 &&
        j(
          Object.assign({}, e, {
            radiusX: e.radius,
            radiusY: e.radius,
            angle: 0,
          })
        );
    }
    n(q, "drawCircle");
    function j(e) {
      if (e.radiusX === void 0 || e.radiusY === void 0)
        throw new Error(
          'drawEllipse() requires properties "radiusX" and "radiusY".'
        );
      if (e.radiusX === 0 || e.radiusY === 0) return;
      let i = e.start ?? 0,
        s = e.end ?? 360,
        a = nt(e.anchor ?? "center").scale(new E(-e.radiusX, -e.radiusY)),
        o = Le(a, e.radiusX, e.radiusY, i, s, e.resolution);
      o.unshift(a);
      let l = Object.assign({}, e, {
        pts: o,
        radius: 0,
        ...(e.gradient
          ? {
              colors: [
                e.gradient[0],
                ...Array(o.length - 1).fill(e.gradient[1]),
              ],
            }
          : {}),
      });
      if (s - i >= 360 && e.outline) {
        e.fill !== !1 && ue(Object.assign(l, { outline: null })),
          ue(Object.assign(l, { pts: o.slice(1), fill: !1 }));
        return;
      }
      ue(l);
    }
    n(j, "drawEllipse");
    function ue(e) {
      if (!e.pts) throw new Error('drawPolygon() requires property "pts".');
      let i = e.pts.length;
      if (!(i < 3)) {
        if (
          (ae(), _(e.pos), De(e.scale), re(e.angle), _(e.offset), e.fill !== !1)
        ) {
          let s = e.color ?? $.WHITE,
            a = e.pts.map((l, p) => ({
              pos: new E(l.x, l.y),
              uv: new E(0, 0),
              color: e.colors && e.colors[p] ? e.colors[p].mult(s) : s,
              opacity: e.opacity ?? 1,
            })),
            o = [...Array(i - 2).keys()].map((l) => [0, l + 1, l + 2]).flat();
          et(a, e.indices ?? o, e.fixed, y.defTex, e.shader, e.uniform);
        }
        e.outline &&
          V({
            pts: [...e.pts, e.pts[0]],
            radius: e.radius,
            width: e.outline.width,
            color: e.outline.color,
            join: e.outline.join,
            uniform: e.uniform,
            fixed: e.fixed,
            opacity: e.opacity,
          }),
          se();
      }
    }
    n(ue, "drawPolygon");
    function Ee(e, i, s) {
      Pe(),
        b.clear(b.STENCIL_BUFFER_BIT),
        b.enable(b.STENCIL_TEST),
        b.stencilFunc(b.NEVER, 1, 255),
        b.stencilOp(b.REPLACE, b.REPLACE, b.REPLACE),
        i(),
        Pe(),
        b.stencilFunc(s, 1, 255),
        b.stencilOp(b.KEEP, b.KEEP, b.KEEP),
        e(),
        Pe(),
        b.disable(b.STENCIL_TEST);
    }
    n(Ee, "drawStenciled");
    function Ut(e, i) {
      Ee(e, i, b.EQUAL);
    }
    n(Ut, "drawMasked");
    function Lt(e, i) {
      Ee(e, i, b.NOTEQUAL);
    }
    n(Lt, "drawSubtracted");
    function Be() {
      return (y.viewport.width + y.viewport.height) / (y.width + y.height);
    }
    n(Be, "getViewportScale");
    function be(e) {
      Pe();
      let i = y.width,
        s = y.height;
      (y.width = y.viewport.width),
        (y.height = y.viewport.height),
        e(),
        Pe(),
        (y.width = i),
        (y.height = s);
    }
    n(be, "drawUnscaled");
    function Er(e, i) {
      i.pos && (e.pos = e.pos.add(i.pos)),
        i.scale && (e.scale = e.scale.scale(M(i.scale))),
        i.angle && (e.angle += i.angle),
        i.color && e.ch.length === 1 && (e.color = e.color.mult(i.color)),
        i.opacity && (e.opacity *= i.opacity);
    }
    n(Er, "applyCharTransform");
    let hi = /\[(?<style>\w+)\](?<text>.*?)\[\/\k<style>\]/g;
    function li(e) {
      let i = {},
        s = e.replace(hi, "$2"),
        a = 0;
      for (let o of e.matchAll(hi)) {
        let l = o.index - a;
        for (let p = 0; p < o.groups.text.length; p++)
          i[p + l] = [o.groups.style];
        a += o[0].length - o.groups.text.length;
      }
      return { charStyleMap: i, text: s };
    }
    n(li, "compileStyledText");
    let br = {};
    function Qe(e) {
      if (e.text === void 0)
        throw new Error('formatText() requires property "text".');
      let i = ct(e.font);
      if (e.text === "" || i instanceof Te || !i)
        return { width: 0, height: 0, chars: [], opt: e };
      let { charStyleMap: s, text: a } = li(e.text + ""),
        o = Ws(a);
      if (i instanceof ve || typeof i == "string") {
        let Q = i instanceof ve ? i.fontface.family : i,
          z =
            i instanceof ve
              ? { outline: i.outline, filter: i.filter }
              : { outline: null, filter: Kr },
          O = br[Q] ?? {
            font: {
              tex: new ot(K, Ps, Ts, { filter: z.filter }),
              map: {},
              size: gr,
            },
            cursor: new E(0),
            outline: z.outline,
          };
        br[Q] || (br[Q] = O), (i = O.font);
        for (let ce of o)
          if (!O.font.map[ce]) {
            let x = Y;
            x.clearRect(0, 0, C.width, C.height),
              (x.font = `${i.size}px ${Q}`),
              (x.textBaseline = "top"),
              (x.textAlign = "left"),
              (x.fillStyle = "#ffffff");
            let F = x.measureText(ce),
              I = Math.ceil(F.width),
              k = i.size;
            O.outline &&
              ((x.lineJoin = "round"),
              (x.lineWidth = O.outline.width * 2),
              (x.strokeStyle = O.outline.color.toHex()),
              x.strokeText(ce, O.outline.width, O.outline.width),
              (I += O.outline.width * 2),
              (k += O.outline.width * 3)),
              x.fillText(ce, O.outline?.width ?? 0, O.outline?.width ?? 0);
            let J = x.getImageData(0, 0, I, k);
            if (
              O.cursor.x + I > Ps &&
              ((O.cursor.x = 0), (O.cursor.y += k), O.cursor.y > Ts)
            )
              throw new Error("Font atlas exceeds character limit");
            i.tex.update(J, O.cursor.x, O.cursor.y),
              (i.map[ce] = new pe(O.cursor.x, O.cursor.y, I, k)),
              (O.cursor.x += I);
          }
      }
      let l = e.size || i.size,
        p = M(e.scale ?? 1).scale(l / i.size),
        w = e.lineSpacing ?? 0,
        g = e.letterSpacing ?? 0,
        u = 0,
        m = 0,
        P = 0,
        B = [],
        L = [],
        G = 0,
        D = null,
        N = null;
      for (; G < o.length; ) {
        let Q = o[G];
        if (
          Q ===
          `
`
        )
          (P += l + w),
            B.push({ width: u - g, chars: L }),
            (D = null),
            (N = null),
            (u = 0),
            (L = []);
        else {
          let z = i.map[Q];
          if (z) {
            let O = z.w * p.x;
            e.width &&
              u + O > e.width &&
              ((P += l + w),
              D != null &&
                ((G -= L.length - D),
                (Q = o[G]),
                (z = i.map[Q]),
                (O = z.w * p.x),
                (L = L.slice(0, D - 1)),
                (u = N)),
              (D = null),
              (N = null),
              B.push({ width: u - g, chars: L }),
              (u = 0),
              (L = [])),
              L.push({
                tex: i.tex,
                width: z.w,
                height: z.h,
                quad: new pe(
                  z.x / i.tex.width,
                  z.y / i.tex.height,
                  z.w / i.tex.width,
                  z.h / i.tex.height
                ),
                ch: Q,
                pos: new E(u, P),
                opacity: e.opacity ?? 1,
                color: e.color ?? $.WHITE,
                scale: M(p),
                angle: 0,
              }),
              Q === " " && ((D = L.length), (N = u)),
              (u += O),
              (m = Math.max(m, u)),
              (u += g);
          }
        }
        G++;
      }
      B.push({ width: u - g, chars: L }), (P += l), e.width && (m = e.width);
      let Se = [];
      for (let Q of B) {
        let z = (m - Q.width) * fn(e.align ?? "left");
        for (let O of Q.chars) {
          let ce = i.map[O.ch],
            x = Se.length;
          if (
            ((O.pos = O.pos.add(z, 0).add(ce.w * p.x * 0.5, ce.h * p.y * 0.5)),
            e.transform)
          ) {
            let F =
              typeof e.transform == "function"
                ? e.transform(x, O.ch)
                : e.transform;
            F && Er(O, F);
          }
          if (s[x]) {
            let F = s[x];
            for (let I of F) {
              let k = e.styles[I],
                J = typeof k == "function" ? k(x, O.ch) : k;
              J && Er(O, J);
            }
          }
          Se.push(O);
        }
      }
      return { width: m, height: P, chars: Se, opt: e };
    }
    n(Qe, "formatText");
    function Sr(e) {
      ze(Qe(e));
    }
    n(Sr, "drawText");
    function ze(e) {
      ae(),
        _(e.opt.pos),
        re(e.opt.angle),
        _(
          nt(e.opt.anchor ?? "topleft")
            .add(1, 1)
            .scale(e.width, e.height)
            .scale(-0.5)
        ),
        e.chars.forEach((i) => {
          Ce({
            tex: i.tex,
            width: i.width,
            height: i.height,
            pos: i.pos,
            scale: i.scale,
            angle: i.angle,
            color: i.color,
            opacity: i.opacity,
            quad: i.quad,
            anchor: "center",
            uniform: e.opt.uniform,
            shader: e.opt.shader,
            fixed: e.opt.fixed,
          });
        }),
        se();
    }
    n(ze, "drawFormattedText");
    function we() {
      return y.width;
    }
    n(we, "width");
    function Ae() {
      return y.height;
    }
    n(Ae, "height");
    function ui(e) {
      return new E(
        ((e.x - y.viewport.x) * we()) / y.viewport.width,
        ((e.y - y.viewport.y) * Ae()) / y.viewport.height
      );
    }
    n(ui, "windowToContent");
    function di(e) {
      return new E(
        (e.x * y.viewport.width) / y.width,
        (e.y * y.viewport.height) / y.height
      );
    }
    n(di, "contentToView");
    function Gt() {
      return ui(A.mousePos());
    }
    n(Gt, "mousePos");
    let ci = !1,
      ie = {
        inspect: !1,
        timeScale: 1,
        showLog: !0,
        fps: () => A.fps(),
        numFrames: () => A.numFrames(),
        stepFrame: Nr,
        drawCalls: () => y.lastDrawCalls,
        clearLog: () => (S.logs = []),
        log: (e) => {
          let i = r.logMax ?? to;
          S.logs.unshift({ msg: e, time: A.time() }),
            S.logs.length > i && (S.logs = S.logs.slice(0, i));
        },
        error: (e) => ie.log(new Error(e.toString ? e.toString() : e)),
        curRecording: null,
        numObjects: () => Dr("*", { recursive: !0 }).length,
        get paused() {
          return ci;
        },
        set paused(e) {
          (ci = e), e ? ee.ctx.suspend() : ee.ctx.resume();
        },
      };
    function Fe() {
      return A.dt() * ie.timeScale;
    }
    n(Fe, "dt");
    function fi(...e) {
      return (
        e.length > 0 && (S.cam.pos = M(...e)),
        S.cam.pos ? S.cam.pos.clone() : Kt()
      );
    }
    n(fi, "camPos");
    function pi(...e) {
      return e.length > 0 && (S.cam.scale = M(...e)), S.cam.scale.clone();
    }
    n(pi, "camScale");
    function gi(e) {
      return e !== void 0 && (S.cam.angle = e), S.cam.angle;
    }
    n(gi, "camRot");
    function mi(e = 12) {
      S.cam.shake += e;
    }
    n(mi, "shake");
    function Rr(e) {
      return S.cam.transform.multVec2(e);
    }
    n(Rr, "toScreen");
    function Mr(e) {
      return S.cam.transform.invert().multVec2(e);
    }
    n(Mr, "toWorld");
    function Ot(e) {
      let i = new ke();
      return (
        e.pos && i.translate(e.pos),
        e.scale && i.scale(e.scale),
        e.angle && i.rotate(e.angle),
        e.parent ? i.mult(e.parent.transform) : i
      );
    }
    n(Ot, "calcTransform");
    function sr(e = []) {
      let i = new Map(),
        s = {},
        a = new Jt(),
        o = [],
        l = null,
        p = !1,
        w = {
          id: Un(),
          hidden: !1,
          transform: new ke(),
          children: [],
          parent: null,
          set paused(u) {
            if (u !== p) {
              p = u;
              for (let m of o) m.paused = u;
            }
          },
          get paused() {
            return p;
          },
          add(u = []) {
            let m = Array.isArray(u) ? sr(u) : u;
            if (m.parent)
              throw new Error(
                "Cannot add a game obj that already has a parent."
              );
            return (
              (m.parent = this),
              (m.transform = Ot(m)),
              this.children.push(m),
              m.trigger("add", m),
              S.events.trigger("add", m),
              m
            );
          },
          readd(u) {
            let m = this.children.indexOf(u);
            return (
              m !== -1 && (this.children.splice(m, 1), this.children.push(u)), u
            );
          },
          remove(u) {
            let m = this.children.indexOf(u);
            if (m !== -1) {
              (u.parent = null), this.children.splice(m, 1);
              let P = n((B) => {
                B.trigger("destroy"),
                  S.events.trigger("destroy", B),
                  B.children.forEach((L) => P(L));
              }, "trigger");
              P(u);
            }
          },
          removeAll(u) {
            if (u) this.get(u).forEach((m) => this.remove(m));
            else for (let m of [...this.children]) this.remove(m);
          },
          update() {
            this.paused ||
              (this.children
                .sort((u, m) => (u.z ?? 0) - (m.z ?? 0))
                .forEach((u) => u.update()),
              this.trigger("update"));
          },
          draw() {
            if (this.hidden) return;
            this.canvas && this.canvas.bind();
            let u = y.fixed;
            this.fixed && (y.fixed = !0),
              ae(),
              _(this.pos),
              De(this.scale),
              re(this.angle);
            let m = this.children.sort((P, B) => (P.z ?? 0) - (B.z ?? 0));
            if (this.mask) {
              let P = { intersect: Ut, subtract: Lt }[this.mask];
              if (!P) throw new Error(`Invalid mask func: "${this.mask}"`);
              P(
                () => {
                  m.forEach((B) => B.draw());
                },
                () => {
                  this.trigger("draw");
                }
              );
            } else this.trigger("draw"), m.forEach((P) => P.draw());
            se(), (y.fixed = u), this.canvas && this.canvas.unbind();
          },
          drawInspect() {
            this.hidden ||
              (ae(),
              _(this.pos),
              De(this.scale),
              re(this.angle),
              this.children
                .sort((u, m) => (u.z ?? 0) - (m.z ?? 0))
                .forEach((u) => u.drawInspect()),
              this.trigger("drawInspect"),
              se());
          },
          use(u) {
            if (!u) return;
            if (typeof u == "string") return this.use({ id: u });
            let m = [];
            u.id &&
              (this.unuse(u.id), (s[u.id] = []), (m = s[u.id]), i.set(u.id, u));
            for (let B in u) {
              if (ho.has(B)) continue;
              let L = Object.getOwnPropertyDescriptor(u, B);
              if (
                (typeof L.value == "function" && (u[B] = u[B].bind(this)),
                L.set && Object.defineProperty(u, B, { set: L.set.bind(this) }),
                L.get && Object.defineProperty(u, B, { get: L.get.bind(this) }),
                lo.has(B))
              ) {
                let G =
                  B === "add"
                    ? () => {
                        (l = n((D) => m.push(D), "onCurCompCleanup")),
                          u[B](),
                          (l = null);
                      }
                    : u[B];
                m.push(this.on(B, G).cancel);
              } else if (this[B] === void 0)
                Object.defineProperty(this, B, {
                  get: () => u[B],
                  set: (G) => (u[B] = G),
                  configurable: !0,
                  enumerable: !0,
                }),
                  m.push(() => delete this[B]);
              else throw new Error(`Duplicate component property: "${B}"`);
            }
            let P = n(() => {
              if (u.require) {
                for (let B of u.require)
                  if (!this.c(B))
                    throw new Error(
                      `Component "${u.id}" requires component "${B}"`
                    );
              }
            }, "checkDeps");
            u.destroy && m.push(u.destroy.bind(this)),
              this.exists()
                ? (P(),
                  u.add &&
                    ((l = n((B) => m.push(B), "onCurCompCleanup")),
                    u.add.call(this),
                    (l = null)))
                : u.require && m.push(this.on("add", P).cancel);
          },
          unuse(u) {
            s[u] && (s[u].forEach((m) => m()), delete s[u]),
              i.has(u) && i.delete(u);
          },
          c(u) {
            return i.get(u);
          },
          get(u, m = {}) {
            let P = m.recursive
              ? this.children.flatMap(
                  n(function B(L) {
                    return [L, ...L.children.flatMap(B)];
                  }, "recurse")
                )
              : this.children;
            if (((P = P.filter((B) => (u ? B.is(u) : !0))), m.liveUpdate)) {
              let B = n(
                  (G) =>
                    m.recursive ? this.isAncestorOf(G) : G.parent === this,
                  "isChild"
                ),
                L = [];
              L.push(
                Pr((G) => {
                  B(G) && G.is(u) && P.push(G);
                })
              ),
                L.push(
                  wi((G) => {
                    if (B(G) && G.is(u)) {
                      let D = P.findIndex((N) => N.id === G.id);
                      D !== -1 && P.splice(D, 1);
                    }
                  })
                ),
                this.onDestroy(() => {
                  for (let G of L) G.cancel();
                });
            }
            return P;
          },
          isAncestorOf(u) {
            return u.parent
              ? u.parent === this || this.isAncestorOf(u.parent)
              : !1;
          },
          exists() {
            return S.root.isAncestorOf(this);
          },
          is(u) {
            if (u === "*") return !0;
            if (Array.isArray(u)) {
              for (let m of u) if (!this.c(m)) return !1;
              return !0;
            } else return this.c(u) != null;
          },
          on(u, m) {
            let P = a.on(u, m.bind(this));
            return l && l(() => P.cancel()), P;
          },
          trigger(u, ...m) {
            a.trigger(u, ...m), S.objEvents.trigger(u, this, ...m);
          },
          destroy() {
            this.parent && this.parent.remove(this);
          },
          inspect() {
            let u = {};
            for (let [m, P] of i) u[m] = P.inspect ? P.inspect() : null;
            return u;
          },
          onAdd(u) {
            return this.on("add", u);
          },
          onUpdate(u) {
            return this.on("update", u);
          },
          onDraw(u) {
            return this.on("draw", u);
          },
          onDestroy(u) {
            return this.on("destroy", u);
          },
          clearEvents() {
            a.clear();
          },
        },
        g = [
          "onKeyPress",
          "onKeyPressRepeat",
          "onKeyDown",
          "onKeyRelease",
          "onMousePress",
          "onMouseDown",
          "onMouseRelease",
          "onMouseMove",
          "onCharInput",
          "onMouseMove",
          "onTouchStart",
          "onTouchMove",
          "onTouchEnd",
          "onScroll",
          "onGamepadButtonPress",
          "onGamepadButtonDown",
          "onGamepadButtonRelease",
          "onGamepadStick",
        ];
      for (let u of g)
        w[u] = (...m) => {
          let P = A[u](...m);
          return o.push(P), w.onDestroy(() => P.cancel()), P;
        };
      for (let u of e) w.use(u);
      return w;
    }
    n(sr, "make");
    function Ge(e, i, s) {
      return (
        S.objEvents[e] || (S.objEvents[e] = new js()),
        S.objEvents.on(e, (a, ...o) => {
          a.is(i) && s(a, ...o);
        })
      );
    }
    n(Ge, "on");
    let wn = Re(
        (e) => {
          let i = jt([{ update: e }]);
          return {
            get paused() {
              return i.paused;
            },
            set paused(s) {
              i.paused = s;
            },
            cancel: () => i.destroy(),
          };
        },
        (e, i) => Ge("update", e, i)
      ),
      An = Re(
        (e) => {
          let i = jt([{ draw: e }]);
          return {
            get paused() {
              return i.hidden;
            },
            set paused(s) {
              i.hidden = s;
            },
            cancel: () => i.destroy(),
          };
        },
        (e, i) => Ge("draw", e, i)
      ),
      Pr = Re(
        (e) => S.events.on("add", e),
        (e, i) => Ge("add", e, i)
      ),
      wi = Re(
        (e) => S.events.on("destroy", e),
        (e, i) => Ge("destroy", e, i)
      );
    function Ai(e, i, s) {
      return Ge("collide", e, (a, o, l) => o.is(i) && s(a, o, l));
    }
    n(Ai, "onCollide");
    function Vi(e, i, s) {
      return Ge("collideUpdate", e, (a, o, l) => o.is(i) && s(a, o, l));
    }
    n(Vi, "onCollideUpdate");
    function vi(e, i, s) {
      return Ge("collideEnd", e, (a, o, l) => o.is(i) && s(a, o, l));
    }
    n(vi, "onCollideEnd");
    function qt(e, i) {
      Dr(e, { recursive: !0 }).forEach(i), Pr(e, i);
    }
    n(qt, "forAllCurrentAndFuture");
    let Vn = Re(
      (e) => A.onMousePress(e),
      (e, i) => {
        let s = [];
        return (
          qt(e, (a) => {
            if (!a.area)
              throw new Error(
                "onClick() requires the object to have area() component"
              );
            s.push(a.onClick(() => i(a)));
          }),
          vt.join(s)
        );
      }
    );
    function yi(e, i) {
      let s = [];
      return (
        qt(e, (a) => {
          if (!a.area)
            throw new Error(
              "onHover() requires the object to have area() component"
            );
          s.push(a.onHover(() => i(a)));
        }),
        vt.join(s)
      );
    }
    n(yi, "onHover");
    function xi(e, i) {
      let s = [];
      return (
        qt(e, (a) => {
          if (!a.area)
            throw new Error(
              "onHoverUpdate() requires the object to have area() component"
            );
          s.push(a.onHoverUpdate(() => i(a)));
        }),
        vt.join(s)
      );
    }
    n(xi, "onHoverUpdate");
    function Ei(e, i) {
      let s = [];
      return (
        qt(e, (a) => {
          if (!a.area)
            throw new Error(
              "onHoverEnd() requires the object to have area() component"
            );
          s.push(a.onHoverEnd(() => i(a)));
        }),
        vt.join(s)
      );
    }
    n(Ei, "onHoverEnd");
    function bi(e) {
      S.gravity = e;
    }
    n(bi, "setGravity");
    function Si() {
      return S.gravity;
    }
    n(Si, "getGravity");
    function Ri(...e) {
      e.length === 1 || e.length === 2
        ? ((y.bgColor = W(e[0])), e[1] && (y.bgAlpha = e[1]))
        : (e.length === 3 || e.length === 4) &&
          ((y.bgColor = W(e[0], e[1], e[2])), e[3] && (y.bgAlpha = e[3])),
        b.clearColor(
          y.bgColor.r / 255,
          y.bgColor.g / 255,
          y.bgColor.b / 255,
          y.bgAlpha
        );
    }
    n(Ri, "setBackground");
    function Mi() {
      return y.bgColor.clone();
    }
    n(Mi, "getBackground");
    function Ht(...e) {
      return {
        id: "pos",
        pos: M(...e),
        moveBy(...i) {
          this.pos = this.pos.add(M(...i));
        },
        move(...i) {
          this.moveBy(M(...i).scale(Fe()));
        },
        moveTo(...i) {
          if (typeof i[0] == "number" && typeof i[1] == "number")
            return this.moveTo(M(i[0], i[1]), i[2]);
          let s = i[0],
            a = i[1];
          if (a === void 0) {
            this.pos = M(s);
            return;
          }
          let o = s.sub(this.pos);
          if (o.len() <= a * Fe()) {
            this.pos = M(s);
            return;
          }
          this.move(o.unit().scale(a));
        },
        worldPos() {
          return this.parent
            ? this.parent.transform.multVec2(this.pos)
            : this.pos;
        },
        screenPos() {
          let i = this.worldPos();
          return At(this) ? i : Rr(i);
        },
        inspect() {
          return `(${Math.round(this.pos.x)}, ${Math.round(this.pos.y)})`;
        },
        drawInspect() {
          q({ color: W(255, 0, 0), radius: 4 / Be() });
        },
      };
    }
    n(Ht, "pos");
    function Yt(...e) {
      return e.length === 0
        ? Yt(1)
        : {
            id: "scale",
            scale: M(...e),
            scaleTo(...i) {
              this.scale = M(...i);
            },
            scaleBy(...i) {
              this.scale.scale(M(...i));
            },
            inspect() {
              return `(${wt(this.scale.x, 2)}, ${wt(this.scale.y, 2)})`;
            },
          };
    }
    n(Yt, "scale");
    function Pi(e) {
      return {
        id: "rotate",
        angle: e ?? 0,
        rotateBy(i) {
          this.angle += i;
        },
        rotateTo(i) {
          this.angle = i;
        },
        inspect() {
          return `${Math.round(this.angle)}`;
        },
      };
    }
    n(Pi, "rotate");
    function Ti(...e) {
      return {
        id: "color",
        color: W(...e),
        inspect() {
          return this.color.toString();
        },
      };
    }
    n(Ti, "color");
    function wt(e, i) {
      return Number(e.toFixed(i));
    }
    n(wt, "toFixed");
    function Bi(e) {
      return {
        id: "opacity",
        opacity: e ?? 1,
        inspect() {
          return `${wt(this.opacity, 1)}`;
        },
        fadeOut(i = 1, s = cr.linear) {
          return Cr(this.opacity, 0, i, (a) => (this.opacity = a), s);
        },
      };
    }
    n(Bi, "opacity");
    function nr(e) {
      if (!e) throw new Error("Please define an anchor");
      return {
        id: "anchor",
        anchor: e,
        inspect() {
          return typeof this.anchor == "string"
            ? this.anchor
            : this.anchor.toString();
        },
      };
    }
    n(nr, "anchor");
    function Fi(e) {
      return {
        id: "z",
        z: e,
        inspect() {
          return `${this.z}`;
        },
      };
    }
    n(Fi, "z");
    function Ii(e, i) {
      return {
        id: "follow",
        require: ["pos"],
        follow: { obj: e, offset: i ?? M(0) },
        add() {
          e.exists() &&
            (this.pos = this.follow.obj.pos.add(this.follow.offset));
        },
        update() {
          e.exists() &&
            (this.pos = this.follow.obj.pos.add(this.follow.offset));
        },
      };
    }
    n(Ii, "follow");
    function Di(e, i) {
      let s = typeof e == "number" ? E.fromAngle(e) : e.unit();
      return {
        id: "move",
        require: ["pos"],
        update() {
          this.move(s.scale(i));
        },
      };
    }
    n(Di, "move");
    let vn = 200;
    function Ci(e = {}) {
      let i = e.distance ?? vn,
        s = !1;
      return {
        id: "offscreen",
        require: ["pos"],
        isOffScreen() {
          let a = this.screenPos(),
            o = new Ve(M(0), we(), Ae());
          return !_t(o, a) && o.sdistToPoint(a) > i * i;
        },
        onExitScreen(a) {
          return this.on("exitView", a);
        },
        onEnterScreen(a) {
          return this.on("enterView", a);
        },
        update() {
          this.isOffScreen()
            ? (s || (this.trigger("exitView"), (s = !0)),
              e.hide && (this.hidden = !0),
              e.pause && (this.paused = !0),
              e.destroy && this.destroy())
            : (s && (this.trigger("enterView"), (s = !1)),
              e.hide && (this.hidden = !1),
              e.pause && (this.paused = !1));
        },
      };
    }
    n(Ci, "offscreen");
    function At(e) {
      return e.fixed ? !0 : e.parent ? At(e.parent) : !1;
    }
    n(At, "isFixed");
    function ki(e = {}) {
      let i = {},
        s = new Set();
      return {
        id: "area",
        collisionIgnore: e.collisionIgnore ?? [],
        add() {
          this.area.cursor && this.onHover(() => A.setCursor(this.area.cursor)),
            this.onCollideUpdate((a, o) => {
              i[a.id] || this.trigger("collide", a, o),
                (i[a.id] = o),
                s.add(a.id);
            });
        },
        update() {
          for (let a in i)
            s.has(Number(a)) ||
              (this.trigger("collideEnd", i[a].target), delete i[a]);
          s.clear();
        },
        drawInspect() {
          let a = this.localArea();
          ae(), De(this.area.scale), _(this.area.offset);
          let o = {
            outline: { width: 4 / Be(), color: W(0, 0, 255) },
            anchor: this.anchor,
            fill: !1,
            fixed: At(this),
          };
          a instanceof Ve
            ? me({ ...o, pos: a.pos, width: a.width, height: a.height })
            : a instanceof zt
            ? ue({ ...o, pts: a.pts })
            : a instanceof vs && q({ ...o, pos: a.center, radius: a.radius }),
            se();
        },
        area: {
          shape: e.shape ?? null,
          scale: e.scale ? M(e.scale) : M(1),
          offset: e.offset ?? M(0),
          cursor: e.cursor ?? null,
        },
        isClicked() {
          return A.isMousePressed() && this.isHovering();
        },
        isHovering() {
          let a = At(this) ? Gt() : Mr(Gt());
          return this.hasPoint(a);
        },
        checkCollision(a) {
          return i[a.id] ?? null;
        },
        getCollisions() {
          return Object.values(i);
        },
        isColliding(a) {
          return !!i[a.id];
        },
        isOverlapping(a) {
          let o = i[a.id];
          return o && o.hasOverlap();
        },
        onClick(a) {
          let o = A.onMousePress("left", () => {
            this.isHovering() && a();
          });
          return this.onDestroy(() => o.cancel()), o;
        },
        onHover(a) {
          let o = !1;
          return this.onUpdate(() => {
            o ? (o = this.isHovering()) : this.isHovering() && ((o = !0), a());
          });
        },
        onHoverUpdate(a) {
          return this.onUpdate(() => {
            this.isHovering() && a();
          });
        },
        onHoverEnd(a) {
          let o = !1;
          return this.onUpdate(() => {
            o ? this.isHovering() || ((o = !1), a()) : (o = this.isHovering());
          });
        },
        onCollide(a, o) {
          if (typeof a == "function" && o === void 0)
            return this.on("collide", a);
          if (typeof a == "string")
            return this.onCollide((l, p) => {
              l.is(a) && o(l, p);
            });
        },
        onCollideUpdate(a, o) {
          if (typeof a == "function" && o === void 0)
            return this.on("collideUpdate", a);
          if (typeof a == "string")
            return this.on("collideUpdate", (l, p) => l.is(a) && o(l, p));
        },
        onCollideEnd(a, o) {
          if (typeof a == "function" && o === void 0)
            return this.on("collideEnd", a);
          if (typeof a == "string")
            return this.on("collideEnd", (l) => l.is(a) && o(l));
        },
        hasPoint(a) {
          return oi(this.worldArea(), a);
        },
        resolveCollision(a) {
          let o = this.checkCollision(a);
          o &&
            !o.resolved &&
            ((this.pos = this.pos.add(o.displacement)), (o.resolved = !0));
        },
        localArea() {
          return this.area.shape ? this.area.shape : this.renderArea();
        },
        worldArea() {
          let a = this.localArea();
          if (!(a instanceof zt || a instanceof Ve))
            throw new Error("Only support polygon and rect shapes for now");
          let o = this.transform
            .clone()
            .scale(M(this.area.scale ?? 1))
            .translate(this.area.offset);
          if (a instanceof Ve) {
            let l = nt(this.anchor || fr)
              .add(1, 1)
              .scale(-0.5)
              .scale(a.width, a.height);
            o.translate(l);
          }
          return a.transform(o);
        },
        screenArea() {
          let a = this.worldArea();
          return At(this) ? a : a.transform(S.cam.transform);
        },
      };
    }
    n(ki, "area");
    function Je(e) {
      return {
        color: e.color,
        opacity: e.opacity,
        anchor: e.anchor,
        outline: e.outline,
        shader: e.shader,
        uniform: e.uniform,
      };
    }
    n(Je, "getRenderProps");
    function or(e, i = {}) {
      let s = null,
        a = null,
        o = null,
        l = new Ie();
      if (!e)
        throw new Error("Please pass the resource name or data to sprite()");
      let p = n((w, g, u, m) => {
        let P = M(1, 1);
        return (
          u && m
            ? ((P.x = u / (w.width * g.w)), (P.y = m / (w.height * g.h)))
            : u
            ? ((P.x = u / (w.width * g.w)), (P.y = P.x))
            : m && ((P.y = m / (w.height * g.h)), (P.x = P.y)),
          P
        );
      }, "calcTexScale");
      return {
        id: "sprite",
        width: 0,
        height: 0,
        frame: i.frame || 0,
        quad: i.quad || new pe(0, 0, 1, 1),
        animSpeed: i.animSpeed ?? 1,
        flipX: i.flipX ?? !1,
        flipY: i.flipY ?? !1,
        draw() {
          if (!s) return;
          let w = s.frames[this.frame ?? 0];
          if (!w) throw new Error(`Frame not found: ${this.frame ?? 0}`);
          if (s.slice9) {
            let { left: g, right: u, top: m, bottom: P } = s.slice9,
              B = s.tex.width * w.w,
              L = s.tex.height * w.h,
              G = this.width - g - u,
              D = this.height - m - P,
              N = g / B,
              Se = u / B,
              Q = 1 - N - Se,
              z = m / L,
              O = P / L,
              ce = 1 - z - O,
              x = [
                oe(0, 0, N, z),
                oe(N, 0, Q, z),
                oe(N + Q, 0, Se, z),
                oe(0, z, N, ce),
                oe(N, z, Q, ce),
                oe(N + Q, z, Se, ce),
                oe(0, z + ce, N, O),
                oe(N, z + ce, Q, O),
                oe(N + Q, z + ce, Se, O),
                oe(0, 0, g, m),
                oe(g, 0, G, m),
                oe(g + G, 0, u, m),
                oe(0, m, g, D),
                oe(g, m, G, D),
                oe(g + G, m, u, D),
                oe(0, m + D, g, P),
                oe(g, m + D, G, P),
                oe(g + G, m + D, u, P),
              ];
            for (let F = 0; F < 9; F++) {
              let I = x[F],
                k = x[F + 9];
              je(
                Object.assign(Je(this), {
                  pos: k.pos(),
                  tex: s.tex,
                  quad: w.scale(I),
                  flipX: this.flipX,
                  flipY: this.flipY,
                  tiled: i.tiled,
                  width: k.w,
                  height: k.h,
                })
              );
            }
          } else
            je(
              Object.assign(Je(this), {
                tex: s.tex,
                quad: w.scale(this.quad ?? new pe(0, 0, 1, 1)),
                flipX: this.flipX,
                flipY: this.flipY,
                tiled: i.tiled,
                width: this.width,
                height: this.height,
              })
            );
        },
        add() {
          let w = n((u) => {
              let m = u.frames[0].clone();
              i.quad && (m = m.scale(i.quad));
              let P = p(u.tex, m, i.width, i.height);
              (this.width = u.tex.width * m.w * P.x),
                (this.height = u.tex.height * m.h * P.y),
                i.anim && this.play(i.anim),
                (s = u),
                l.trigger(s);
            }, "setSpriteData"),
            g = _e(e);
          g ? g.onLoad(w) : hr(() => w(_e(e).data));
        },
        update() {
          if (!a) return;
          let w = s.anims[a.name];
          if (typeof w == "number") {
            this.frame = w;
            return;
          }
          if (w.speed === 0) throw new Error("Sprite anim speed cannot be 0");
          (a.timer += Fe() * this.animSpeed),
            a.timer >= 1 / a.speed &&
              ((a.timer = 0),
              (this.frame += o),
              (this.frame < Math.min(w.from, w.to) ||
                this.frame > Math.max(w.from, w.to)) &&
                (a.loop
                  ? a.pingpong
                    ? ((this.frame -= o), (o *= -1), (this.frame += o))
                    : (this.frame = w.from)
                  : ((this.frame = w.to), a.onEnd(), this.stop())));
        },
        play(w, g = {}) {
          if (!s) {
            l.add(() => this.play(w, g));
            return;
          }
          let u = s.anims[w];
          if (u === void 0) throw new Error(`Anim not found: ${w}`);
          a && this.stop(),
            (a =
              typeof u == "number"
                ? {
                    name: w,
                    timer: 0,
                    loop: !1,
                    pingpong: !1,
                    speed: 0,
                    onEnd: () => {},
                  }
                : {
                    name: w,
                    timer: 0,
                    loop: g.loop ?? u.loop ?? !1,
                    pingpong: g.pingpong ?? u.pingpong ?? !1,
                    speed: g.speed ?? u.speed ?? 10,
                    onEnd: g.onEnd ?? (() => {}),
                  }),
            (o = typeof u == "number" ? null : u.from < u.to ? 1 : -1),
            (this.frame = typeof u == "number" ? u : u.from),
            this.trigger("animStart", w);
        },
        stop() {
          if (!a) return;
          let w = a.name;
          (a = null), this.trigger("animEnd", w);
        },
        numFrames() {
          return s?.frames.length ?? 0;
        },
        curAnim() {
          return a?.name;
        },
        onAnimEnd(w) {
          return this.on("animEnd", w);
        },
        onAnimStart(w) {
          return this.on("animStart", w);
        },
        renderArea() {
          return new Ve(M(0), this.width, this.height);
        },
        inspect() {
          if (typeof e == "string") return `"${e}"`;
        },
      };
    }
    n(or, "sprite");
    function Ni(e, i = {}) {
      function s(o) {
        let l = Qe(
          Object.assign(Je(o), {
            text: o.text + "",
            size: o.textSize,
            font: o.font,
            width: i.width && o.width,
            align: o.align,
            letterSpacing: o.letterSpacing,
            lineSpacing: o.lineSpacing,
            transform: o.textTransform,
            styles: o.textStyles,
          })
        );
        return (
          i.width || (o.width = l.width / (o.scale?.x || 1)),
          (o.height = l.height / (o.scale?.y || 1)),
          l
        );
      }
      n(s, "update");
      let a = {
        id: "text",
        set text(o) {
          (e = o), s(this);
        },
        get text() {
          return e;
        },
        textSize: i.size ?? $n,
        font: i.font,
        width: i.width ?? 0,
        height: 0,
        align: i.align,
        lineSpacing: i.lineSpacing,
        letterSpacing: i.letterSpacing,
        textTransform: i.transform,
        textStyles: i.styles,
        add() {
          hr(() => s(this));
        },
        draw() {
          ze(s(this));
        },
        renderArea() {
          return new Ve(M(0), this.width, this.height);
        },
      };
      return s(a), a;
    }
    n(Ni, "text");
    function Ui(e, i = {}) {
      if (e.length < 3)
        throw new Error(
          `Polygon's need more than two points, ${e.length} points provided`
        );
      return {
        id: "polygon",
        pts: e,
        colors: i.colors,
        radius: i.radius,
        draw() {
          ue(
            Object.assign(Je(this), {
              pts: this.pts,
              colors: this.colors,
              radius: this.radius,
              fill: i.fill,
            })
          );
        },
        renderArea() {
          return new zt(this.pts);
        },
        inspect() {
          return this.pts.map((s) => `[${s.x},${s.y}]`).join(",");
        },
      };
    }
    n(Ui, "polygon");
    function Li(e, i, s = {}) {
      return {
        id: "rect",
        width: e,
        height: i,
        radius: s.radius || 0,
        draw() {
          me(
            Object.assign(Je(this), {
              width: this.width,
              height: this.height,
              radius: this.radius,
              fill: s.fill,
            })
          );
        },
        renderArea() {
          return new Ve(M(0), this.width, this.height);
        },
        inspect() {
          return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
        },
      };
    }
    n(Li, "rect");
    function Gi(e, i) {
      return {
        id: "rect",
        width: e,
        height: i,
        draw() {
          Ce(
            Object.assign(Je(this), { width: this.width, height: this.height })
          );
        },
        renderArea() {
          return new Ve(M(0), this.width, this.height);
        },
        inspect() {
          return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
        },
      };
    }
    n(Gi, "uvquad");
    function Oi(e, i = {}) {
      return {
        id: "circle",
        radius: e,
        draw() {
          q(Object.assign(Je(this), { radius: this.radius, fill: i.fill }));
        },
        renderArea() {
          return new Ve(
            new E(this.anchor ? 0 : -this.radius),
            this.radius * 2,
            this.radius * 2
          );
        },
        inspect() {
          return `${Math.ceil(this.radius)}`;
        },
      };
    }
    n(Oi, "circle");
    function qi(e = 1, i = W(0, 0, 0)) {
      return { id: "outline", outline: { width: e, color: i } };
    }
    n(qi, "outline");
    function ar() {
      return {
        id: "timer",
        wait(e, i) {
          let s = [];
          i && s.push(i);
          let a = 0,
            o = this.onUpdate(() => {
              (a += Fe()), a >= e && (s.forEach((l) => l()), o.cancel());
            });
          return {
            get paused() {
              return o.paused;
            },
            set paused(l) {
              o.paused = l;
            },
            cancel: o.cancel,
            onEnd(l) {
              s.push(l);
            },
            then(l) {
              return this.onEnd(l), this;
            },
          };
        },
        loop(e, i) {
          let s = null,
            a = n(() => {
              (s = this.wait(e, a)), i();
            }, "newAction");
          return (
            (s = this.wait(0, a)),
            {
              get paused() {
                return s.paused;
              },
              set paused(o) {
                s.paused = o;
              },
              cancel: () => s.cancel(),
            }
          );
        },
        tween(e, i, s, a, o = cr.linear) {
          let l = 0,
            p = [],
            w = this.onUpdate(() => {
              l += Fe();
              let g = Math.min(l / s, 1);
              a(Ye(e, i, o(g))),
                g === 1 && (w.cancel(), a(i), p.forEach((u) => u()));
            });
          return {
            get paused() {
              return w.paused;
            },
            set paused(g) {
              w.paused = g;
            },
            onEnd(g) {
              p.push(g);
            },
            then(g) {
              return this.onEnd(g), this;
            },
            cancel() {
              w.cancel();
            },
            finish() {
              w.cancel(), a(i), p.forEach((g) => g());
            },
          };
        },
      };
    }
    n(ar, "timer");
    let yn = 640,
      xn = 65536;
    function Hi(e = {}) {
      let i = null,
        s = null,
        a = !1;
      return {
        id: "body",
        require: ["pos", "area"],
        vel: new E(0),
        jumpForce: e.jumpForce ?? yn,
        gravityScale: e.gravityScale ?? 1,
        isStatic: e.isStatic ?? !1,
        mass: e.mass ?? 1,
        add() {
          if (this.mass === 0) throw new Error("Can't set body mass to 0");
          this.onCollideUpdate((o, l) => {
            if (
              o.is("body") &&
              !l.resolved &&
              (this.trigger("beforePhysicsResolve", l),
              o.trigger("beforePhysicsResolve", l.reverse()),
              !l.resolved && !(this.isStatic && o.isStatic))
            ) {
              if (!this.isStatic && !o.isStatic) {
                let p = this.mass + o.mass;
                (this.pos = this.pos.add(l.displacement.scale(o.mass / p))),
                  (o.pos = o.pos.add(l.displacement.scale(-this.mass / p))),
                  (this.transform = Ot(this)),
                  (o.transform = Ot(o));
              } else {
                let p = !this.isStatic && o.isStatic ? l : l.reverse();
                (p.source.pos = p.source.pos.add(p.displacement)),
                  (p.source.transform = Ot(p.source));
              }
              (l.resolved = !0),
                this.trigger("physicsResolve", l),
                o.trigger("physicsResolve", l.reverse());
            }
          }),
            this.onPhysicsResolve((o) => {
              S.gravity &&
                (o.isBottom() && this.isFalling()
                  ? ((this.vel.y = 0),
                    (i = o.target),
                    (s = o.target.pos),
                    a ? (a = !1) : this.trigger("ground", i))
                  : o.isTop() &&
                    this.isJumping() &&
                    ((this.vel.y = 0), this.trigger("headbutt", o.target)));
            });
        },
        update() {
          if (!S.gravity || this.isStatic) return;
          if (
            (a && ((i = null), (s = null), this.trigger("fallOff"), (a = !1)),
            i)
          )
            if (!this.isColliding(i) || !i.exists() || !i.is("body")) a = !0;
            else {
              !i.pos.eq(s) &&
                e.stickToPlatform !== !1 &&
                this.moveBy(i.pos.sub(s)),
                (s = i.pos);
              return;
            }
          let o = this.vel.y;
          (this.vel.y += S.gravity * this.gravityScale * Fe()),
            (this.vel.y = Math.min(this.vel.y, e.maxVelocity ?? xn)),
            o < 0 && this.vel.y >= 0 && this.trigger("fall"),
            this.move(this.vel);
        },
        onPhysicsResolve(o) {
          return this.on("physicsResolve", o);
        },
        onBeforePhysicsResolve(o) {
          return this.on("beforePhysicsResolve", o);
        },
        curPlatform() {
          return i;
        },
        isGrounded() {
          return i !== null;
        },
        isFalling() {
          return this.vel.y > 0;
        },
        isJumping() {
          return this.vel.y < 0;
        },
        jump(o) {
          (i = null), (s = null), (this.vel.y = -o || -this.jumpForce);
        },
        onGround(o) {
          return this.on("ground", o);
        },
        onFall(o) {
          return this.on("fall", o);
        },
        onFallOff(o) {
          return this.on("fallOff", o);
        },
        onHeadbutt(o) {
          return this.on("headbutt", o);
        },
      };
    }
    n(Hi, "body");
    function Yi(e = 2) {
      let i = e;
      return {
        id: "doubleJump",
        require: ["body"],
        numJumps: e,
        add() {
          this.onGround(() => {
            i = this.numJumps;
          });
        },
        doubleJump(s) {
          i <= 0 ||
            (i < this.numJumps && this.trigger("doubleJump"),
            i--,
            this.jump(s));
        },
        onDoubleJump(s) {
          return this.on("doubleJump", s);
        },
        inspect() {
          return `${i}`;
        },
      };
    }
    n(Yi, "doubleJump");
    function Ki(e, i) {
      return {
        id: "shader",
        shader: e,
        ...(typeof i == "function"
          ? {
              uniform: i(),
              update() {
                this.uniform = i();
              },
            }
          : { uniform: i }),
      };
    }
    n(Ki, "shader");
    function ji() {
      return { id: "fixed", fixed: !0 };
    }
    n(ji, "fixed");
    function Tr(e) {
      return { id: "stay", stay: !0, scenesToStay: e };
    }
    n(Tr, "stay");
    function Qi(e, i) {
      if (e == null)
        throw new Error("health() requires the initial amount of hp");
      return {
        id: "health",
        hurt(s = 1) {
          this.setHP(e - s), this.trigger("hurt", s);
        },
        heal(s = 1) {
          let a = e;
          this.setHP(e + s), this.trigger("heal", e - a);
        },
        hp() {
          return e;
        },
        maxHP() {
          return i ?? null;
        },
        setMaxHP(s) {
          i = s;
        },
        setHP(s) {
          (e = i ? Math.min(i, s) : s), e <= 0 && this.trigger("death");
        },
        onHurt(s) {
          return this.on("hurt", s);
        },
        onHeal(s) {
          return this.on("heal", s);
        },
        onDeath(s) {
          return this.on("death", s);
        },
        inspect() {
          return `${e}`;
        },
      };
    }
    n(Qi, "health");
    function zi(e, i = {}) {
      if (e == null) throw new Error("lifespan() requires time");
      let s = i.fade ?? 0;
      return {
        id: "lifespan",
        async add() {
          await as(e),
            s > 0 &&
              this.opacity &&
              (await Cr(
                this.opacity,
                0,
                s,
                (a) => (this.opacity = a),
                cr.linear
              )),
            this.destroy();
        },
      };
    }
    n(zi, "lifespan");
    function Ji(e, i, s) {
      if (!e) throw new Error("state() requires an initial state");
      let a = {};
      function o(g) {
        a[g] ||
          (a[g] = {
            enter: new Ie(),
            end: new Ie(),
            update: new Ie(),
            draw: new Ie(),
          });
      }
      n(o, "initStateEvents");
      function l(g, u, m) {
        return o(u), a[u][g].add(m);
      }
      n(l, "on");
      function p(g, u, ...m) {
        o(u), a[u][g].trigger(...m);
      }
      n(p, "trigger");
      let w = !1;
      return {
        id: "state",
        state: e,
        enterState(g, ...u) {
          if (((w = !0), i && !i.includes(g)))
            throw new Error(`State not found: ${g}`);
          let m = this.state;
          if (s) {
            if (!s?.[m]) return;
            let P = typeof s[m] == "string" ? [s[m]] : s[m];
            if (!P.includes(g))
              throw new Error(
                `Cannot transition state from "${m}" to "${g}". Available transitions: ${P.map(
                  (B) => `"${B}"`
                ).join(", ")}`
              );
          }
          p("end", m, ...u),
            (this.state = g),
            p("enter", g, ...u),
            p("enter", `${m} -> ${g}`, ...u);
        },
        onStateTransition(g, u, m) {
          return l("enter", `${g} -> ${u}`, m);
        },
        onStateEnter(g, u) {
          return l("enter", g, u);
        },
        onStateUpdate(g, u) {
          return l("update", g, u);
        },
        onStateDraw(g, u) {
          return l("draw", g, u);
        },
        onStateEnd(g, u) {
          return l("end", g, u);
        },
        update() {
          w || (p("enter", e), (w = !0)), p("update", this.state);
        },
        draw() {
          p("draw", this.state);
        },
        inspect() {
          return this.state;
        },
      };
    }
    n(Ji, "state");
    function Xi(e = 1) {
      let i = 0,
        s = !1;
      return {
        require: ["opacity"],
        add() {
          this.opacity = 0;
        },
        update() {
          s ||
            ((i += Fe()),
            (this.opacity = We(i, 0, e, 0, 1)),
            i >= e && ((this.opacity = 1), (s = !0)));
        },
      };
    }
    n(Xi, "fadeIn");
    function Wi(e = "intersect") {
      return { id: "mask", mask: e };
    }
    n(Wi, "mask");
    function Zi(e) {
      return {
        add() {
          this.canvas = e;
        },
      };
    }
    n(Zi, "drawon");
    function hr(e) {
      U.loaded ? e() : S.events.on("load", e);
    }
    n(hr, "onLoad");
    function _i(e, i) {
      S.scenes[e] = i;
    }
    n(_i, "scene");
    function $i(e, ...i) {
      if (!S.scenes[e]) throw new Error(`Scene not found: ${e}`);
      S.events.onOnce("frameEnd", () => {
        S.events.trigger("sceneLeave", e),
          A.events.clear(),
          S.events.clear(),
          S.objEvents.clear(),
          [...S.root.children].forEach((s) => {
            (!s.stay || (s.scenesToStay && !s.scenesToStay.includes(e))) &&
              S.root.remove(s);
          }),
          S.root.clearEvents(),
          Or(),
          (S.cam = {
            pos: null,
            scale: M(1),
            angle: 0,
            shake: 0,
            transform: new ke(),
          }),
          S.scenes[e](...i);
      });
    }
    n($i, "go");
    function es(e) {
      return S.events.on("sceneLeave", e);
    }
    n(es, "onSceneLeave");
    function ts(e, i) {
      try {
        return JSON.parse(window.localStorage[e]);
      } catch {
        return i ? (Br(e, i), i) : null;
      }
    }
    n(ts, "getData");
    function Br(e, i) {
      window.localStorage[e] = JSON.stringify(i);
    }
    n(Br, "setData");
    function Fr(e, ...i) {
      let s = e(it),
        a;
      typeof s == "function" ? (a = s(...i)(it)) : (a = s);
      for (let o in a) (it[o] = a[o]), r.global !== !1 && (window[o] = a[o]);
      return it;
    }
    n(Fr, "plug");
    function Kt() {
      return M(we() / 2, Ae() / 2);
    }
    n(Kt, "center");
    let En;
    ((e) => (
      (e[(e.None = 0)] = "None"),
      (e[(e.Left = 1)] = "Left"),
      (e[(e.Top = 2)] = "Top"),
      (e[(e.LeftTop = 3)] = "LeftTop"),
      (e[(e.Right = 4)] = "Right"),
      (e[(e.Horizontal = 5)] = "Horizontal"),
      (e[(e.RightTop = 6)] = "RightTop"),
      (e[(e.HorizontalTop = 7)] = "HorizontalTop"),
      (e[(e.Bottom = 8)] = "Bottom"),
      (e[(e.LeftBottom = 9)] = "LeftBottom"),
      (e[(e.Vertical = 10)] = "Vertical"),
      (e[(e.LeftVertical = 11)] = "LeftVertical"),
      (e[(e.RightBottom = 12)] = "RightBottom"),
      (e[(e.HorizontalBottom = 13)] = "HorizontalBottom"),
      (e[(e.RightVertical = 14)] = "RightVertical"),
      (e[(e.All = 15)] = "All")
    ))((En ||= {}));
    function Ir(e = {}) {
      let i = M(0),
        s = e.isObstacle ?? !1,
        a = e.cost ?? 0,
        o = e.edges ?? [],
        l = n(() => {
          let w = { left: 1, top: 2, right: 4, bottom: 8 };
          return o.map((g) => w[g] || 0).reduce((g, u) => g | u, 0);
        }, "getEdgeMask"),
        p = l();
      return {
        id: "tile",
        tilePosOffset: e.offset ?? M(0),
        set tilePos(w) {
          let g = this.getLevel();
          (i = w.clone()),
            (this.pos = M(
              this.tilePos.x * g.tileWidth(),
              this.tilePos.y * g.tileHeight()
            ).add(this.tilePosOffset));
        },
        get tilePos() {
          return i;
        },
        set isObstacle(w) {
          s !== w && ((s = w), this.getLevel().invalidateNavigationMap());
        },
        get isObstacle() {
          return s;
        },
        set cost(w) {
          a !== w && ((a = w), this.getLevel().invalidateNavigationMap());
        },
        get cost() {
          return a;
        },
        set edges(w) {
          (o = w), (p = l()), this.getLevel().invalidateNavigationMap();
        },
        get edges() {
          return o;
        },
        get edgeMask() {
          return p;
        },
        getLevel() {
          return this.parent;
        },
        moveLeft() {
          this.tilePos = this.tilePos.add(M(-1, 0));
        },
        moveRight() {
          this.tilePos = this.tilePos.add(M(1, 0));
        },
        moveUp() {
          this.tilePos = this.tilePos.add(M(0, -1));
        },
        moveDown() {
          this.tilePos = this.tilePos.add(M(0, 1));
        },
      };
    }
    n(Ir, "tile");
    function rs(e, i) {
      if (!i.tileWidth || !i.tileHeight)
        throw new Error("Must provide tileWidth and tileHeight.");
      let s = jt([Ht(i.pos ?? M(0))]),
        a = e.length,
        o = 0,
        l = null,
        p = null,
        w = null,
        g = null,
        u = n((x) => x.x + x.y * o, "tile2Hash"),
        m = n((x) => M(Math.floor(x % o), Math.floor(x / o)), "hash2Tile"),
        P = n(() => {
          l = [];
          for (let x of s.children) B(x);
        }, "createSpatialMap"),
        B = n((x) => {
          let F = u(x.tilePos);
          l[F] ? l[F].push(x) : (l[F] = [x]);
        }, "insertIntoSpatialMap"),
        L = n((x) => {
          let F = u(x.tilePos);
          if (l[F]) {
            let I = l[F].indexOf(x);
            I >= 0 && l[F].splice(I, 1);
          }
        }, "removeFromSpatialMap"),
        G = n(() => {
          let x = !1;
          for (let F of s.children) {
            let I = s.pos2Tile(F.pos);
            (F.tilePos.x != I.x || F.tilePos.y != I.y) &&
              ((x = !0), L(F), (F.tilePos.x = I.x), (F.tilePos.y = I.y), B(F));
          }
          x && s.trigger("spatial_map_changed");
        }, "updateSpatialMap"),
        D = n(() => {
          let x = s.getSpatialMap(),
            F = s.numRows() * s.numColumns();
          p ? (p.length = F) : (p = new Array(F)), p.fill(1, 0, F);
          for (let I = 0; I < x.length; I++) {
            let k = x[I];
            if (k) {
              let J = 0;
              for (let Z of k)
                if (Z.isObstacle) {
                  J = 1 / 0;
                  break;
                } else J += Z.cost;
              p[I] = J || 1;
            }
          }
        }, "createCostMap"),
        N = n(() => {
          let x = s.getSpatialMap(),
            F = s.numRows() * s.numColumns();
          w ? (w.length = F) : (w = new Array(F)), w.fill(15, 0, F);
          for (let I = 0; I < x.length; I++) {
            let k = x[I];
            if (k) {
              let J = k.length,
                Z = 15;
              for (let ne = 0; ne < J; ne++) Z |= k[ne].edgeMask;
              w[I] = Z;
            }
          }
        }, "createEdgeMap"),
        Se = n(() => {
          let x = s.numRows() * s.numColumns(),
            F = n((k, J) => {
              let Z = [];
              for (Z.push(k); Z.length > 0; ) {
                let ne = Z.pop();
                O(ne).forEach((fe) => {
                  g[fe] < 0 && ((g[fe] = J), Z.push(fe));
                });
              }
            }, "traverse");
          g ? (g.length = x) : (g = new Array(x)), g.fill(-1, 0, x);
          let I = 0;
          for (let k = 0; k < p.length; k++) {
            if (g[k] >= 0) {
              I++;
              continue;
            }
            F(k, I), I++;
          }
        }, "createConnectivityMap"),
        Q = n((x, F) => p[F], "getCost"),
        z = n((x, F) => {
          let I = m(x),
            k = m(F);
          return I.dist(k);
        }, "getHeuristic"),
        O = n((x, F) => {
          let I = [],
            k = Math.floor(x % o),
            J = k > 0 && w[x] & 1 && p[x - 1] !== 1 / 0,
            Z = x >= o && w[x] & 2 && p[x - o] !== 1 / 0,
            ne = k < o - 1 && w[x] & 4 && p[x + 1] !== 1 / 0,
            fe = x < o * a - o - 1 && w[x] & 8 && p[x + o] !== 1 / 0;
          return (
            F
              ? (J &&
                  (Z && I.push(x - o - 1),
                  I.push(x - 1),
                  fe && I.push(x + o - 1)),
                Z && I.push(x - o),
                ne &&
                  (Z && I.push(x - o + 1),
                  I.push(x + 1),
                  fe && I.push(x + o + 1)),
                fe && I.push(x + o))
              : (J && I.push(x - 1),
                Z && I.push(x - o),
                ne && I.push(x + 1),
                fe && I.push(x + o)),
            I
          );
        }, "getNeighbours"),
        ce = {
          id: "level",
          tileWidth() {
            return i.tileWidth;
          },
          tileHeight() {
            return i.tileHeight;
          },
          spawn(x, ...F) {
            let I = M(...F),
              k = (() => {
                if (typeof x == "string") {
                  if (i.tiles[x]) {
                    if (typeof i.tiles[x] != "function")
                      throw new Error(
                        "Level symbol def must be a function returning a component list"
                      );
                    return i.tiles[x](I);
                  } else if (i.wildcardTile) return i.wildcardTile(x, I);
                } else {
                  if (Array.isArray(x)) return x;
                  throw new Error("Expected a symbol or a component list");
                }
              })();
            if (!k) return null;
            let J = !1,
              Z = !1;
            for (let fe of k)
              fe.id === "tile" && (Z = !0), fe.id === "pos" && (J = !0);
            J || k.push(Ht()), Z || k.push(Ir());
            let ne = s.add(k);
            return (
              J && (ne.tilePosOffset = ne.pos.clone()),
              (ne.tilePos = I),
              l &&
                (B(ne),
                this.trigger("spatial_map_changed"),
                this.trigger("navigation_map_invalid")),
              ne
            );
          },
          numColumns() {
            return o;
          },
          numRows() {
            return a;
          },
          levelWidth() {
            return o * this.tileWidth();
          },
          levelHeight() {
            return a * this.tileHeight();
          },
          tile2Pos(...x) {
            return M(...x).scale(this.tileWidth(), this.tileHeight());
          },
          pos2Tile(...x) {
            let F = M(...x);
            return M(
              Math.floor(F.x / this.tileWidth()),
              Math.floor(F.y / this.tileHeight())
            );
          },
          getSpatialMap() {
            return l || P(), l;
          },
          onSpatialMapChanged(x) {
            return this.on("spatial_map_changed", x);
          },
          onNavigationMapInvalid(x) {
            return this.on("navigation_map_invalid", x);
          },
          getAt(x) {
            l || P();
            let F = u(x);
            return l[F] || [];
          },
          update() {
            l && G();
          },
          invalidateNavigationMap() {
            (p = null), (w = null), (g = null);
          },
          onNavigationMapChanged(x) {
            return this.on("navigation_map_changed", x);
          },
          getTilePath(x, F, I = {}) {
            if (
              (p || D(),
              w || N(),
              g || Se(),
              x.x < 0 ||
                x.x >= o ||
                x.y < 0 ||
                x.y >= a ||
                F.x < 0 ||
                F.x >= o ||
                F.y < 0 ||
                F.y >= a)
            )
              return null;
            let k = u(x),
              J = u(F);
            if (p[J] === 1 / 0) return null;
            if (k === J) return [];
            if (g[k] != -1 && g[k] !== g[J]) return null;
            let Z = new Gn((Oe, Hr) => Oe.cost < Hr.cost);
            Z.insert({ cost: 0, node: k });
            let ne = new Map();
            ne.set(k, k);
            let fe = new Map();
            for (fe.set(k, 0); Z.length !== 0; ) {
              let Oe = Z.remove()?.node;
              if (Oe === J) break;
              let Hr = O(Oe, I.allowDiagonals);
              for (let st of Hr) {
                let Yr = (fe.get(Oe) || 0) + Q(Oe, st) + z(st, J);
                (!fe.has(st) || Yr < fe.get(st)) &&
                  (fe.set(st, Yr),
                  Z.insert({ cost: Yr, node: st }),
                  ne.set(st, Oe));
              }
            }
            let qr = [],
              Qt = J,
              Tn = m(Qt);
            for (qr.push(Tn); Qt !== k; ) {
              Qt = ne.get(Qt);
              let Oe = m(Qt);
              qr.push(Oe);
            }
            return qr.reverse();
          },
          getPath(x, F, I = {}) {
            let k = this.tileWidth(),
              J = this.tileHeight(),
              Z = this.getTilePath(this.pos2Tile(x), this.pos2Tile(F), I);
            return Z
              ? [
                  x,
                  ...Z.slice(1, -1).map((ne) =>
                    ne.scale(k, J).add(k / 2, J / 2)
                  ),
                  F,
                ]
              : null;
          },
        };
      return (
        s.use(ce),
        s.onNavigationMapInvalid(() => {
          s.invalidateNavigationMap(), s.trigger("navigation_map_changed");
        }),
        e.forEach((x, F) => {
          let I = x.split("");
          (o = Math.max(I.length, o)),
            I.forEach((k, J) => {
              s.spawn(k, M(J, F));
            });
        }),
        s
      );
    }
    n(rs, "addLevel");
    function is(e = {}) {
      let i = null,
        s = null,
        a = null,
        o = null;
      return {
        id: "agent",
        require: ["pos", "tile"],
        agentSpeed: e.speed ?? 100,
        allowDiagonals: e.allowDiagonals ?? !0,
        getDistanceToTarget() {
          return i ? this.pos.dist(i) : 0;
        },
        getNextLocation() {
          return s && a ? s[a] : null;
        },
        getPath() {
          return s ? s.slice() : null;
        },
        getTarget() {
          return i;
        },
        isNavigationFinished() {
          return s ? a === null : !0;
        },
        isTargetReachable() {
          return s !== null;
        },
        isTargetReached() {
          return i ? this.pos.eq(i) : !0;
        },
        setTarget(l) {
          (i = l),
            (s = this.getLevel().getPath(this.pos, i, {
              allowDiagonals: this.allowDiagonals,
            })),
            (a = s ? 0 : null),
            s
              ? (o ||
                  ((o = this.getLevel().onNavigationMapChanged(() => {
                    s &&
                      a !== null &&
                      ((s = this.getLevel().getPath(this.pos, i, {
                        allowDiagonals: this.allowDiagonals,
                      })),
                      (a = s ? 0 : null),
                      s
                        ? this.trigger("navigation-next", this, s[a])
                        : this.trigger("navigation-ended", this));
                  })),
                  this.onDestroy(() => o.cancel())),
                this.trigger("navigation-started", this),
                this.trigger("navigation-next", this, s[a]))
              : this.trigger("navigation-ended", this);
        },
        update() {
          if (s && a !== null) {
            if (this.pos.sdist(s[a]) < 2)
              if (a === s.length - 1) {
                (this.pos = i.clone()),
                  (a = null),
                  this.trigger("navigation-ended", this),
                  this.trigger("target-reached", this);
                return;
              } else a++, this.trigger("navigation-next", this, s[a]);
            this.moveTo(s[a], this.agentSpeed);
          }
        },
        onNavigationStarted(l) {
          return this.on("navigation-started", l);
        },
        onNavigationNext(l) {
          return this.on("navigation-next", l);
        },
        onNavigationEnded(l) {
          return this.on("navigation-ended", l);
        },
        onTargetReached(l) {
          return this.on("target-reached", l);
        },
        inspect() {
          return JSON.stringify({
            target: JSON.stringify(i),
            path: JSON.stringify(s),
          });
        },
      };
    }
    n(is, "agent");
    function ss(e) {
      let i = A.canvas.captureStream(e),
        s = ee.ctx.createMediaStreamDestination();
      ee.masterNode.connect(s);
      let a = new MediaRecorder(i),
        o = [];
      return (
        (a.ondataavailable = (l) => {
          l.data.size > 0 && o.push(l.data);
        }),
        (a.onerror = () => {
          ee.masterNode.disconnect(s), i.getTracks().forEach((l) => l.stop());
        }),
        a.start(),
        {
          resume() {
            a.resume();
          },
          pause() {
            a.pause();
          },
          stop() {
            return (
              a.stop(),
              ee.masterNode.disconnect(s),
              i.getTracks().forEach((l) => l.stop()),
              new Promise((l) => {
                a.onstop = () => {
                  l(new Blob(o, { type: "video/mp4" }));
                };
              })
            );
          },
          download(l = "kaboom.mp4") {
            this.stop().then((p) => ei(l, p));
          },
        }
      );
    }
    n(ss, "record");
    function ns() {
      return document.activeElement === A.canvas;
    }
    n(ns, "isFocused");
    function os(e) {
      e.destroy();
    }
    n(os, "destroy");
    let jt = S.root.add.bind(S.root),
      bn = S.root.readd.bind(S.root),
      Sn = S.root.removeAll.bind(S.root),
      Dr = S.root.get.bind(S.root),
      as = S.root.wait.bind(S.root),
      Rn = S.root.loop.bind(S.root),
      Cr = S.root.tween.bind(S.root);
    function kr(e = 2, i = 1) {
      let s = 0;
      return {
        require: ["scale"],
        update() {
          let a = Math.sin(s * e) * i;
          a < 0 && this.destroy(), (this.scale = M(a)), (s += Fe());
        },
      };
    }
    n(kr, "boom");
    let Mn = Ue(null, Xn),
      Pn = Ue(null, Wn);
    function hs(e, i = {}) {
      let s = jt([Ht(e), Tr()]),
        a = (i.speed || 1) * 5,
        o = i.scale || 1;
      s.add([or(Pn), Yt(0), nr("center"), kr(a, o), ...(i.comps ?? [])]);
      let l = s.add([or(Mn), Yt(0), nr("center"), ar(), ...(i.comps ?? [])]);
      return (
        l.wait(0.4 / a, () => l.use(kr(a, o))),
        l.onDestroy(() => s.destroy()),
        s
      );
    }
    n(hs, "addKaboom");
    function Nr() {
      S.root.update();
    }
    n(Nr, "updateFrame");
    class Ur {
      static {
        n(this, "Collision");
      }
      source;
      target;
      displacement;
      resolved = !1;
      constructor(i, s, a, o = !1) {
        (this.source = i),
          (this.target = s),
          (this.displacement = a),
          (this.resolved = o);
      }
      reverse() {
        return new Ur(
          this.target,
          this.source,
          this.displacement.scale(-1),
          this.resolved
        );
      }
      hasOverlap() {
        return !this.displacement.isZero();
      }
      isLeft() {
        return this.displacement.x > 0;
      }
      isRight() {
        return this.displacement.x < 0;
      }
      isTop() {
        return this.displacement.y > 0;
      }
      isBottom() {
        return this.displacement.y < 0;
      }
      preventResolution() {
        this.resolved = !0;
      }
    }
    function ls() {
      let e = {},
        i = r.hashGridSize || eo,
        s = new ke(),
        a = [];
      function o(l) {
        if (
          (a.push(s.clone()),
          l.pos && s.translate(l.pos),
          l.scale && s.scale(l.scale),
          l.angle && s.rotate(l.angle),
          (l.transform = s.clone()),
          l.c("area") && !l.paused)
        ) {
          let p = l,
            w = p.worldArea().bbox(),
            g = Math.floor(w.pos.x / i),
            u = Math.floor(w.pos.y / i),
            m = Math.ceil((w.pos.x + w.width) / i),
            P = Math.ceil((w.pos.y + w.height) / i),
            B = new Set();
          for (let L = g; L <= m; L++)
            for (let G = u; G <= P; G++)
              if (!e[L]) (e[L] = {}), (e[L][G] = [p]);
              else if (!e[L][G]) e[L][G] = [p];
              else {
                let D = e[L][G];
                e: for (let N of D) {
                  if (N.paused || !N.exists() || B.has(N.id)) continue;
                  for (let Q of p.collisionIgnore) if (N.is(Q)) continue e;
                  for (let Q of N.collisionIgnore) if (p.is(Q)) continue e;
                  let Se = Ks(p.worldArea(), N.worldArea());
                  if (Se) {
                    let Q = new Ur(p, N, Se);
                    p.trigger("collideUpdate", N, Q);
                    let z = Q.reverse();
                    (z.resolved = Q.resolved), N.trigger("collideUpdate", p, z);
                  }
                  B.add(N.id);
                }
                D.push(p);
              }
        }
        l.children.forEach(o), (s = a.pop());
      }
      n(o, "checkObj"), o(S.root);
    }
    n(ls, "checkFrame");
    function us() {
      let e = S.cam,
        i = E.fromAngle(Zt(0, 360)).scale(e.shake);
      (e.shake = Ye(e.shake, 0, 5 * Fe())),
        (e.transform = new ke()
          .translate(Kt())
          .scale(e.scale)
          .rotate(e.angle)
          .translate((e.pos ?? Kt()).scale(-1).add(i))),
        S.root.draw(),
        Pe();
    }
    n(us, "drawFrame");
    function ds() {
      let e = H();
      S.events.numListeners("loading") > 0
        ? S.events.trigger("loading", e)
        : be(() => {
            let i = we() / 2,
              s = 24,
              a = M(we() / 2, Ae() / 2).sub(M(i / 2, s / 2));
            me({ pos: M(0), width: we(), height: Ae(), color: W(0, 0, 0) }),
              me({
                pos: a,
                width: i,
                height: s,
                fill: !1,
                outline: { width: 4 },
              }),
              me({ pos: a, width: i * e, height: s });
          });
    }
    n(ds, "drawLoadScreen");
    function Lr(e, i) {
      be(() => {
        let s = M(8);
        ae(), _(e);
        let a = Qe({
            text: i,
            font: pr,
            size: 16,
            pos: s,
            color: W(255, 255, 255),
            fixed: !0,
          }),
          o = a.width + s.x * 2,
          l = a.height + s.x * 2;
        e.x + o >= we() && _(M(-o, 0)),
          e.y + l >= Ae() && _(M(0, -l)),
          me({
            width: o,
            height: l,
            color: W(0, 0, 0),
            radius: 4,
            opacity: 0.8,
            fixed: !0,
          }),
          ze(a),
          se();
      });
    }
    n(Lr, "drawInspectText");
    function cs() {
      if (ie.inspect) {
        let e = null;
        for (let i of S.root.get("*", { recursive: !0 }))
          if (i.c("area") && i.isHovering()) {
            e = i;
            break;
          }
        if ((S.root.drawInspect(), e)) {
          let i = [],
            s = e.inspect();
          for (let a in s) s[a] ? i.push(`${a}: ${s[a]}`) : i.push(`${a}`);
          Lr(
            di(Gt()),
            i.join(`
`)
          );
        }
        Lr(M(8), `FPS: ${ie.fps()}`);
      }
      ie.paused &&
        be(() => {
          ae(), _(we(), 0), _(-8, 8);
          let e = 32;
          me({
            width: e,
            height: e,
            anchor: "topright",
            color: W(0, 0, 0),
            opacity: 0.8,
            radius: 4,
            fixed: !0,
          });
          for (let i = 1; i <= 2; i++)
            me({
              width: 4,
              height: e * 0.6,
              anchor: "center",
              pos: M((-e / 3) * i, e * 0.5),
              color: W(255, 255, 255),
              radius: 2,
              fixed: !0,
            });
          se();
        }),
        ie.timeScale !== 1 &&
          be(() => {
            ae(), _(we(), Ae()), _(-8, -8);
            let e = 8,
              i = Qe({
                text: ie.timeScale.toFixed(1),
                font: pr,
                size: 16,
                color: W(255, 255, 255),
                pos: M(-e),
                anchor: "botright",
                fixed: !0,
              });
            me({
              width: i.width + e * 2 + e * 4,
              height: i.height + e * 2,
              anchor: "botright",
              color: W(0, 0, 0),
              opacity: 0.8,
              radius: 4,
              fixed: !0,
            });
            for (let s = 0; s < 2; s++) {
              let a = ie.timeScale < 1;
              R({
                p1: M(-i.width - e * (a ? 2 : 3.5), -e),
                p2: M(-i.width - e * (a ? 2 : 3.5), -e - i.height),
                p3: M(-i.width - e * (a ? 3.5 : 2), -e - i.height / 2),
                pos: M(-s * e * 1 + (a ? -e * 0.5 : 0), 0),
                color: W(255, 255, 255),
                fixed: !0,
              });
            }
            ze(i), se();
          }),
        ie.curRecording &&
          be(() => {
            ae(),
              _(0, Ae()),
              _(24, -24),
              q({
                radius: 12,
                color: W(255, 0, 0),
                opacity: Jr(0, 1, A.time() * 4),
                fixed: !0,
              }),
              se();
          }),
        ie.showLog &&
          S.logs.length > 0 &&
          be(() => {
            ae(), _(0, Ae()), _(8, -8);
            let e = 8,
              i = [];
            for (let a of S.logs) {
              let o = "",
                l = a.msg instanceof Error ? "error" : "info";
              (o += `[time]${a.time.toFixed(2)}[/time]`),
                (o += " "),
                (o += `[${l}]${
                  a.msg?.toString ? a.msg.toString() : a.msg
                }[/${l}]`),
                i.push(o);
            }
            S.logs = S.logs.filter(
              (a) => A.time() - a.time < (r.logTime || ro)
            );
            let s = Qe({
              text: i.join(`
`),
              font: pr,
              pos: M(e, -e),
              anchor: "botleft",
              size: 16,
              width: we() * 0.6,
              lineSpacing: e / 2,
              fixed: !0,
              styles: {
                time: { color: W(127, 127, 127) },
                info: { color: W(255, 255, 255) },
                error: { color: W(255, 0, 127) },
              },
            });
            me({
              width: s.width + e * 2,
              height: s.height + e * 2,
              anchor: "botleft",
              color: W(0, 0, 0),
              radius: 4,
              opacity: 0.8,
              fixed: !0,
            }),
              ze(s),
              se();
          });
    }
    n(cs, "drawDebug");
    function fs(e) {
      S.events.on("loading", e);
    }
    n(fs, "onLoading");
    function ps(e) {
      A.onResize(e);
    }
    n(ps, "onResize");
    function gs(e) {
      S.events.on("error", e);
    }
    n(gs, "onError");
    function ms(e) {
      console.error(e),
        ee.ctx.suspend(),
        A.run(() => {
          tt(),
            be(() => {
              let i = we(),
                s = Ae(),
                a = {
                  size: 36,
                  width: i - 32 * 2,
                  letterSpacing: 4,
                  lineSpacing: 4,
                  font: pr,
                  fixed: !0,
                };
              me({ width: i, height: s, color: W(0, 0, 255), fixed: !0 });
              let o = Qe({
                ...a,
                text: "Error",
                pos: M(32),
                color: W(255, 128, 0),
                fixed: !0,
              });
              ze(o),
                Sr({
                  ...a,
                  text: e.message,
                  pos: M(32, 32 + o.height + 16),
                  fixed: !0,
                }),
                se(),
                S.events.trigger("error", e);
            }),
            rt();
        });
    }
    n(ms, "handleErr");
    function ws(e) {
      te.push(e);
    }
    n(ws, "onCleanup");
    function As() {
      S.events.onOnce("frameEnd", () => {
        A.quit(),
          b.clear(
            b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT | b.STENCIL_BUFFER_BIT
          );
        let e = b.getParameter(b.MAX_TEXTURE_IMAGE_UNITS);
        for (let i = 0; i < e; i++)
          b.activeTexture(b.TEXTURE0 + i),
            b.bindTexture(b.TEXTURE_2D, null),
            b.bindTexture(b.TEXTURE_CUBE_MAP, null);
        b.bindBuffer(b.ARRAY_BUFFER, null),
          b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, null),
          b.bindRenderbuffer(b.RENDERBUFFER, null),
          b.bindFramebuffer(b.FRAMEBUFFER, null),
          K.destroy(),
          te.forEach((i) => i());
      });
    }
    n(As, "quit");
    let lr = !0;
    A.run(() => {
      try {
        U.loaded ||
          (H() === 1 && !lr && ((U.loaded = !0), S.events.trigger("load"))),
          (!U.loaded && r.loadingScreen !== !1) || lr
            ? (tt(), ds(), rt())
            : (ie.paused || Nr(),
              ls(),
              tt(),
              us(),
              r.debug !== !1 && cs(),
              rt()),
          lr && (lr = !1),
          S.events.trigger("frameEnd");
      } catch (e) {
        ms(e);
      }
    });
    function Gr() {
      let e = T,
        i = b.drawingBufferWidth / e,
        s = b.drawingBufferHeight / e;
      if (r.letterbox) {
        if (!r.width || !r.height)
          throw new Error("Letterboxing requires width and height defined.");
        let a = i / s,
          o = r.width / r.height;
        if (a > o) {
          let l = s * o,
            p = (i - l) / 2;
          y.viewport = { x: p, y: 0, width: l, height: s };
        } else {
          let l = i / o,
            p = (s - l) / 2;
          y.viewport = { x: 0, y: p, width: i, height: l };
        }
        return;
      }
      if (r.stretch && (!r.width || !r.height))
        throw new Error("Stretching requires width and height defined.");
      y.viewport = { x: 0, y: 0, width: i, height: s };
    }
    n(Gr, "updateViewport");
    function Or() {
      A.onHide(() => {
        r.backgroundAudio || ee.ctx.suspend();
      }),
        A.onShow(() => {
          !r.backgroundAudio && !ie.paused && ee.ctx.resume();
        }),
        A.onResize(() => {
          if (A.isFullscreen()) return;
          let e = r.width && r.height;
          (e && !r.stretch && !r.letterbox) ||
            ((h.width = h.offsetWidth * T),
            (h.height = h.offsetHeight * T),
            Gr(),
            e ||
              (y.frameBuffer.free(),
              (y.frameBuffer = new ur(
                K,
                b.drawingBufferWidth,
                b.drawingBufferHeight
              )),
              (y.width = b.drawingBufferWidth / T),
              (y.height = b.drawingBufferHeight / T)));
        }),
        r.debug !== !1 &&
          (A.onKeyPress("f1", () => (ie.inspect = !ie.inspect)),
          A.onKeyPress("f2", () => ie.clearLog()),
          A.onKeyPress("f8", () => (ie.paused = !ie.paused)),
          A.onKeyPress("f7", () => {
            ie.timeScale = wt(He(ie.timeScale - 0.2, 0, 2), 1);
          }),
          A.onKeyPress("f9", () => {
            ie.timeScale = wt(He(ie.timeScale + 0.2, 0, 2), 1);
          }),
          A.onKeyPress("f10", () => ie.stepFrame())),
        r.burp && A.onKeyPress("b", () => pt());
    }
    n(Or, "initEvents"), Gr(), Or();
    let it = {
      VERSION: Zn,
      loadRoot: xe,
      loadProgress: H,
      loadSprite: Ue,
      loadSpriteAtlas: ht,
      loadSound: tr,
      loadBitmapFont: bt,
      loadFont: Ke,
      loadShader: $t,
      loadShaderURL: er,
      loadAseprite: Rt,
      loadPedit: St,
      loadBean: rr,
      loadJSON: ge,
      load: Me,
      getSprite: Mt,
      getSound: Pt,
      getFont: Tt,
      getBitmapFont: ut,
      getShader: dt,
      getAsset: Bt,
      Asset: Te,
      SpriteData: X,
      SoundData: le,
      width: we,
      height: Ae,
      center: Kt,
      dt: Fe,
      time: A.time,
      screenshot: A.screenshot,
      record: ss,
      isFocused: ns,
      setCursor: A.setCursor,
      getCursor: A.getCursor,
      setCursorLocked: A.setCursorLocked,
      isCursorLocked: A.isCursorLocked,
      setFullscreen: A.setFullscreen,
      isFullscreen: A.isFullscreen,
      isTouchscreen: A.isTouchscreen,
      onLoad: hr,
      onLoading: fs,
      onResize: ps,
      onGamepadConnect: A.onGamepadConnect,
      onGamepadDisconnect: A.onGamepadDisconnect,
      onError: gs,
      onCleanup: ws,
      camPos: fi,
      camScale: pi,
      camRot: gi,
      shake: mi,
      toScreen: Rr,
      toWorld: Mr,
      setGravity: bi,
      getGravity: Si,
      setBackground: Ri,
      getBackground: Mi,
      getGamepads: A.getGamepads,
      add: jt,
      make: sr,
      destroy: os,
      destroyAll: Sn,
      get: Dr,
      readd: bn,
      pos: Ht,
      scale: Yt,
      rotate: Pi,
      color: Ti,
      opacity: Bi,
      anchor: nr,
      area: ki,
      sprite: or,
      text: Ni,
      polygon: Ui,
      rect: Li,
      circle: Oi,
      uvquad: Gi,
      outline: qi,
      body: Hi,
      doubleJump: Yi,
      shader: Ki,
      timer: ar,
      fixed: ji,
      stay: Tr,
      health: Qi,
      lifespan: zi,
      z: Fi,
      move: Di,
      offscreen: Ci,
      follow: Ii,
      state: Ji,
      fadeIn: Xi,
      mask: Wi,
      drawon: Zi,
      tile: Ir,
      agent: is,
      on: Ge,
      onUpdate: wn,
      onDraw: An,
      onAdd: Pr,
      onDestroy: wi,
      onClick: Vn,
      onCollide: Ai,
      onCollideUpdate: Vi,
      onCollideEnd: vi,
      onHover: yi,
      onHoverUpdate: xi,
      onHoverEnd: Ei,
      onKeyDown: A.onKeyDown,
      onKeyPress: A.onKeyPress,
      onKeyPressRepeat: A.onKeyPressRepeat,
      onKeyRelease: A.onKeyRelease,
      onMouseDown: A.onMouseDown,
      onMousePress: A.onMousePress,
      onMouseRelease: A.onMouseRelease,
      onMouseMove: A.onMouseMove,
      onCharInput: A.onCharInput,
      onTouchStart: A.onTouchStart,
      onTouchMove: A.onTouchMove,
      onTouchEnd: A.onTouchEnd,
      onScroll: A.onScroll,
      onHide: A.onHide,
      onShow: A.onShow,
      onGamepadButtonDown: A.onGamepadButtonDown,
      onGamepadButtonPress: A.onGamepadButtonPress,
      onGamepadButtonRelease: A.onGamepadButtonRelease,
      onGamepadStick: A.onGamepadStick,
      mousePos: Gt,
      mouseDeltaPos: A.mouseDeltaPos,
      isKeyDown: A.isKeyDown,
      isKeyPressed: A.isKeyPressed,
      isKeyPressedRepeat: A.isKeyPressedRepeat,
      isKeyReleased: A.isKeyReleased,
      isMouseDown: A.isMouseDown,
      isMousePressed: A.isMousePressed,
      isMouseReleased: A.isMouseReleased,
      isMouseMoved: A.isMouseMoved,
      isGamepadButtonPressed: A.isGamepadButtonPressed,
      isGamepadButtonDown: A.isGamepadButtonDown,
      isGamepadButtonReleased: A.isGamepadButtonReleased,
      getGamepadStick: A.getGamepadStick,
      charInputted: A.charInputted,
      loop: Rn,
      wait: as,
      play: ft,
      volume: Dt,
      burp: pt,
      audioCtx: ee.ctx,
      Line: xt,
      Rect: Ve,
      Circle: vs,
      Polygon: zt,
      Vec2: E,
      Color: $,
      Mat4: ke,
      Quad: pe,
      RNG: Cs,
      rand: Zt,
      randi: ii,
      randSeed: ks,
      vec2: M,
      rgb: W,
      hsl2rgb: In,
      quad: oe,
      choose: Us,
      chance: Ns,
      lerp: Ye,
      tween: Cr,
      easings: cr,
      map: We,
      mapc: Ds,
      wave: Jr,
      deg2rad: Ne,
      rad2deg: Et,
      clamp: He,
      testLineLine: yt,
      testRectRect: Ls,
      testRectLine: Os,
      testRectPoint: _t,
      testCirclePolygon: Hs,
      testLinePoint: qs,
      testLineCircle: si,
      drawSprite: ir,
      drawText: Sr,
      formatText: Qe,
      drawRect: me,
      drawLine: d,
      drawLines: V,
      drawTriangle: R,
      drawCircle: q,
      drawEllipse: j,
      drawUVQuad: Ce,
      drawPolygon: ue,
      drawFormattedText: ze,
      drawMasked: Ut,
      drawSubtracted: Lt,
      pushTransform: ae,
      popTransform: se,
      pushTranslate: _,
      pushScale: De,
      pushRotate: re,
      pushMatrix: mt,
      usePostEffect: gt,
      makeCanvas: Ct,
      debug: ie,
      scene: _i,
      go: $i,
      onSceneLeave: es,
      addLevel: rs,
      getData: ts,
      setData: Br,
      download: vr,
      downloadJSON: Xs,
      downloadText: ai,
      downloadBlob: ei,
      plug: Fr,
      ASCII_CHARS: Rs,
      canvas: A.canvas,
      addKaboom: hs,
      LEFT: E.LEFT,
      RIGHT: E.RIGHT,
      UP: E.UP,
      DOWN: E.DOWN,
      RED: $.RED,
      GREEN: $.GREEN,
      BLUE: $.BLUE,
      YELLOW: $.YELLOW,
      MAGENTA: $.MAGENTA,
      CYAN: $.CYAN,
      WHITE: $.WHITE,
      BLACK: $.BLACK,
      quit: As,
      Event: Ie,
      EventHandler: Jt,
      EventController: vt,
    };
    if ((r.plugins && r.plugins.forEach(Fr), r.global !== !1))
      for (let e in it) window[e] = it[e];
    return r.focus !== !1 && A.canvas.focus(), it;
  }, "default");
  var mn = 50,
    uo = 750,
    co = 240;
  gn();
  loadSprite("bean", "sprites/bean.png");
  scene("game", () => {
    setGravity(1600);
    let r = add([sprite("bean"), pos(80, 40), area(), body()]);
    add([
      rect(width(), mn),
      outline(4),
      pos(0, height()),
      anchor("botleft"),
      area(),
      body({ isStatic: !0 }),
      color(127, 200, 255),
    ]);
    function t() {
      r.isGrounded() && r.jump(uo);
    }
    onKeyPress("space", t), onClick(t);
    function h() {
      add([
        rect(48, rand(32, 96)),
        area(),
        outline(4),
        pos(width(), height() - mn),
        anchor("botleft"),
        color(255, 180, 255),
        move(LEFT, co),
        "tree",
      ]),
        wait(rand(1, 1.5), h);
    }
    h(),
      r.onCollide("tree", () => {
        go("lose", c), burp(), addKaboom(r.pos);
      });
    let c = 0,
      f = add([text(c), pos(24, 24)]);
    onUpdate(() => {
      c++, (f.text = c);
    });
  });
  scene("lose", (r) => {
    add([
      sprite("bean"),
      pos(width() / 2, height() / 2 - 80),
      scale(2),
      anchor("center"),
    ]),
      add([
        text(r),
        pos(width() / 2, height() / 2 + 80),
        scale(2),
        anchor("center"),
      ]),
      onKeyPress("space", () => go("game")),
      onClick(() => go("game"));
  });
  go("game");
})();
