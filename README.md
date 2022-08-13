# AfriaSdk
🔮 Afria's Software Development Kit for the web ⚒️

## Installing
- Add the SDK to your project by running `yarn add @afria/sdk` or `npm install @afria/sdk`

## Usage

- Convert large integer values represented as exponential, strings, or big numbers into human-readable large numbers

```js
Import { Methods as AfriaMethods } from '@afria/sdk'


const exponent = 8.21e16

UnwantedMethods.parseStringifiedNumber(exponent) // 82100000000000000
```

- Convert large numbers into prefixed S.I Numbers. Ex 1000000 = 1M

```js
Import { Methods as AfriaMethods } from '@afria/sdk'


const bigMoney = 8.21e9

AfriaMethods.toSI(bigMoney) // 8.21B
```

