import { getExponentialParts, isExponential } from '../utils';

/**
 * Exports Helper Methods For Multiple Data Processes
 */
export default class Methods {
  /**
   * Converts a large string number into a human-readable string while maintaining precision
   * Forked from https://github.com/shrpne/from-exponential since we've updated it for typescript and added helper methods
   */
  static parseStringifiedNumber(num: number | string | Array<string>): string {
    const eParts: Array<string> = getExponentialParts(num);
    if (!isExponential(eParts)) {
      return <string>eParts[0];
    }

    const sign = eParts[0][0] === '-' ? '-' : '';
    const digits = eParts[0].replace(/^-/, '');
    const digitsParts = digits.split('.');
    const wholeDigits = digitsParts[0];
    const fractionDigits = digitsParts[1] || '';
    let e = Number(eParts[1]);

    if (e === 0) {
      return `${sign + wholeDigits}.${fractionDigits}`;
    } else if (e < 0) {
      // move dot to the left
      const countWholeAfterTransform = wholeDigits.length + e;
      if (countWholeAfterTransform > 0) {
        // transform whole to fraction
        const wholeDigitsAfterTransform = wholeDigits.substr(
          0,
          countWholeAfterTransform
        );
        const wholeDigitsTransformedToFraction = wholeDigits.substr(
          countWholeAfterTransform
        );
        return `${
          sign + wholeDigitsAfterTransform
        }.${wholeDigitsTransformedToFraction}${fractionDigits}`;
      } else {
        // not enough whole digits: prepend with fractional zeros

        // first e goes to dotted zero
        let zeros = '0.';
        e = countWholeAfterTransform;
        while (e) {
          zeros += '0';
          e += 1;
        }
        return sign + zeros + wholeDigits + fractionDigits;
      }
    } else {
      // move dot to the right
      const countFractionAfterTransform = fractionDigits.length - e;
      if (countFractionAfterTransform > 0) {
        // transform fraction to whole
        // countTransformedFractionToWhole = e
        const fractionDigitsAfterTransform = fractionDigits.substr(e);
        const fractionDigitsTransformedToWhole = fractionDigits.substr(0, e);
        return `${
          sign + wholeDigits + fractionDigitsTransformedToWhole
        }.${fractionDigitsAfterTransform}`;
      } else {
        // not enough fractions: append whole zeros
        let zerosCount = -countFractionAfterTransform;
        let zeros = '';
        while (zerosCount) {
          zeros += '0';
          zerosCount -= 1;
        }
        return sign + wholeDigits + fractionDigits + zeros;
      }
    }
  }

  static toSI(num: number | string | Array<string>): string | number {
    return Math.abs(Number(num)) >= 1.0e15
      ? Math.abs(Number(num)) / 1.0e15 + 'Q'
      : Math.abs(Number(num)) >= 1.0e12
      ? Math.abs(Number(num)) / 1.0e12 + 'T'
      : Math.abs(Number(num)) >= 1.0e9
      ? Math.abs(Number(num)) / 1.0e9 + 'B'
      : Math.abs(Number(num)) >= 1.0e6
      ? Math.abs(Number(num)) / 1.0e6 + 'M'
      : Math.abs(Number(num)) >= 1.0e3
      ? Math.abs(Number(num)) / 1.0e3 + 'K'
      : Math.abs(Number(num));
  }
}
