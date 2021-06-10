// @ts-check

/**
 * 是否为字符串
 * @param {unknown} value
 * @param {boolean} [nonempty]
 * @returns {value is string}
 */
export function isStr(value, nonempty) {
  if (nonempty) {
    return value && typeof value === 'string'
  }
  return typeof value === 'string'
}

/**
 * 是否为数字
 * @param {unknown} value
 * @returns { value is number }
 */
export function isNum(value) {
  return typeof value === 'number' && !isNaN(value)
}

/**
 * 是否为函数
 * @param {unknown} value
 * @returns { value is Function }
 */
export function isFunc(value) {
  return typeof value === 'function'
}

/**
 * 是否为对象
 * @param {unknown} value
 * @returns {value is object}
 */
export function isObj(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * 是否为数组
 * @param {unknown} value
 * @param {boolean} [nonempty]
 * @returns {value is unknown[]}
 */
export function isArr(value, nonempty) {
  if (nonempty) {
    return Array.isArray(value) && value.length > 0
  }
  return Array.isArray(value)
}

/**
 * 是否为空数组
 * @param {unknown} value
 * @returns {value is []}
 */
export function isEmptyArr(value) {
  return Array.isArray(value) && value.length === 0
}

/**
 * 是否为字符串数组
 * @param {unknown} value
 * @param {boolean} [nonempty]
 * @param {boolean} [itemNonempty]
 * @returns {value is string[]}
 */
export function isStrArr(value, nonempty, itemNonempty) {
  if (Array.isArray(value)) {
    const state = value.every((n) => isStr(n, itemNonempty))
    return nonempty ? state && value.length > 0 : state
  }
  return false
}

/**
 * 是否为包含指定属性的对象
 * @type {<T extends string>(
 *  value: unknown,
 *  keys: T | T[],
 *  propNonempty?: boolean
 * ) => value is { [key in T]: typeof value[key] }}
 */
export function isObjWith(value, keys, propNonempty = false) {
  keys = isStr(keys) ? [keys] : keys
  if (!isStrArr(keys, true, true)) {
    throw new TypeError(
      'isObjWith() 第二个入参 keys 应为字符串或字符串数组，且不含有空字符串。'
    )
  }
  return (
    isObj(value) &&
    keys.every((k) => (propNonempty ? value[k] : Reflect.has(value, k)))
  )
}

/**
 * 是否为对象数组
 * @type {<T extends string>(
 *  value: unknown,
 *  keys: T | T[],
 *  nonempty?: boolean
 * ) => value is { [key in T]: unknown}[]}
 */
export function isObjArr(value, keys = [], nonempty = false) {
  keys = isStr(keys) ? [keys] : keys
  if (!isStrArr(keys, false, true)) {
    throw new TypeError(
      'isObjArr() 第二个入参 keys 应为字符串或字符串数组，且不含有空字符串。'
    )
  }
  if (isArr(value)) {
    const state = value.every((item) => {
      if (isArr(keys, true)) {
        return isObj(item) && keys.every((k) => Reflect.has(item, k))
      }
      return isObj(item)
    })
    return nonempty ? state && value.length > 0 : state
  }
  return false
}

/**
 * 判断目标对象是否含有指定方法
 * @type {<T extends string>(
 *   obj: unknown,
 *   funcName: T
 * ) => obj is { [key in T]: (...args: any[]) => any }}
 */
export function hasFunc(obj, funcName) {
  if (!isStr(funcName, true)) {
    throw new TypeError('The funcName should be a string.')
  }
  return isObjWith(obj, funcName) && isFunc(obj[funcName])
}

/**
 * @param {boolean} condition
 * @param {string} [message]
 */
export function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

/**
 * @param {unknown} value
 * @param {string} [message]
 */
export function requireVar(value, message) {
  /**
   *
   * @param {(...args: any[]) => boolean} func
   * @param {string} msg
   * @returns {(...args: unknown[]) => void}
   */
  const gen = (func, msg) => {
    return (...args) => {
      if (!func(value, ...args)) {
        throw new TypeError(message || '变量必须为' + msg)
      }
    }
  }

  return {
    /**
     * 必须为字符串
     * @param {boolean} [nonempty]
     */
    isStr(nonempty) {
      if (!isStr(value, nonempty)) {
        throw new TypeError(message || '变量必须为字符串')
      }
    },
    /**
     * 必须为数字
     * @type {() => void}
     */
    isNum: gen(isNum, '数字'),
    /**
     * 必须为函数
     * @type {() => void}
     */
    isFunc: gen(isFunc, '函数'),
    /**
     * 必须为对象
     * @type {() => void}
     */
    isObj: gen(isObj, '对象'),
    /**
     * 必须为数组
     * @type {(nonempty?: boolean) => void}
     */
    isArr: gen(isArr, '数组'),
    /**
     * 必须为空数组
     * @type {() => void}
     */
    isEmptyArr: gen(isEmptyArr, '空数组'),
    /**
     * 必须为字符串数组
     * @type {(nonempty?: boolean, itemNonempty?: boolean) => void}
     */
    isStrArr: gen(isStrArr, '字符串数组'),
    /**
     * 必须为对象数组
     * @type {(keys?: string | string[], nonempty?: boolean) => void}
     */
    isObjArr: gen(isObjArr, '对象数组'),
    /**
     * 必须为包含指定属性的对象
     * @type {(keys: string | string[], propNonempty?: boolean) => void}
     */
    isObjWith: gen(isObjWith, '含有指定属性的对象'),
    /**
     * 必须为含有指定方法的对象
     * @param {string} funcName
     */
    hasFunc(funcName) {
      if (!hasFunc(value, funcName)) {
        throw new TypeError(
          message ||
            `The parameter must be an object that contains ${funcName} method.`
        )
      }
    }
  }
}

export default {
  isStr,
  isNum,
  isFunc,
  isObj,
  isArr,
  isEmptyArr,
  isStrArr,
  isObjArr,
  isObjWith,
  hasFunc,
  assert,
  requireVar
}
