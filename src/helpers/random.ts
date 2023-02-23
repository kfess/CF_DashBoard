export class Random {
  x: number;
  y: number;
  z: number;
  w: number;

  constructor(seed = 88675123) {
    this.x = 123456789;
    this.y = 362436069;
    this.z = 521288629;
    this.w = seed;
  }

  /** XorShift */
  next() {
    const t = this.x ^ (this.x << 11);
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    return (this.w = this.w ^ (this.w >>> 19) ^ (t ^ (t >>> 8)));
  }

  /** 指定した整数の範囲内で、seed 付き乱数を発生させる */
  nextInt(min: number, max: number) {
    const r = Math.abs(this.next());
    return min + (r % (max - min + 1));
  }

  /** 指定した整数の範囲内で、seed 付き乱数のセットを発生 */
  nextSet(count: number, min: number, max: number) {
    const randomSet = new Set<number>();
    let loopCount = 0;
    while (randomSet.size < count && loopCount < 1000) {
      loopCount += 1;
      randomSet.add(this.nextInt(min, max));
    }
    return randomSet;
  }
}
