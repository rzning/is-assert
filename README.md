# is-assert

Type check and assert

类型检查和断言

## Install

```sh
$ npm install is-assert

# OR

$ yarn add is-assert
```

## Usage

```js
import { assert, isNum, isStr } from 'is-assert'

function demo(name, value) {
  assert(isStr(name, true), 'name 必须为字符串。')
  assert(isNum(value), 'value 必须为数字。')
  // ...
}
```

```js
import { assertVar } from 'is-assert'

function demo2(name, value) {
  assertVar(name).isStr(true)
  assertVar(value).isNum()
  // ...
}
```
