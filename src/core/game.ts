import type { Attempt } from "@/core/attempt";
import { BuiltNumber } from "@/core/built-number";

export class Game {
  private randomNumber: BuiltNumber;
  attempts: Attempt[];

  constructor() {
    this.randomNumber = BuiltNumber.random();
    this.attempts = [];
  }

  makeAttempt(digits: number[]): void {
    const randomNumberDigits = this.randomNumber.digits;
    let cows = 0,
      bulls = 0;
    for (const digit of digits) {
      if (randomNumberDigits.includes(digit)) {
        cows++;
      }
    }
    for (let i = 0; i < randomNumberDigits.length; i++) {
      if (randomNumberDigits[i] === digits[i]) {
        cows--;
        bulls++;
      }
    }
    this.attempts.push({ digits, cows, bulls });
  }
}
