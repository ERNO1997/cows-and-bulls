export class BuiltNumber {
  digits: number[];

  constructor(digits: number[]) {
    this.digits = digits;
  }

  private static randomDigit(max: number = 10): number {
    return Math.floor(Math.random() * max);
  }

  static random(): BuiltNumber {
    const randomDigits: number[] = [];
    while (randomDigits.length < 4) {
      const digit = this.randomDigit();
      if (randomDigits.length === 0) {
        if (digit !== 0) {
          randomDigits.push(digit);
        }
      } else {
        if (!randomDigits.includes(digit)) {
          randomDigits.push(digit);
        }
      }
    }
    return new BuiltNumber([...randomDigits]);
  }

  static empty() {
    return new BuiltNumber([-1, -1, -1, -1]);
  }
}
