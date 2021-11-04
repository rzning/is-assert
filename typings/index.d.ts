/**
 * 是否为字符串
 * @param {unknown} value
 * @param {boolean} [nonempty]
 * @returns {value is string}
 */
export function isStr(value: unknown, nonempty?: boolean): value is string
/**
 * 是否为数字
 * @param {unknown} value
 * @param {boolean} [nonzero]
 * @returns {value is number}
 */
export function isNum(value: unknown, nonzero?: boolean): value is number
/**
 * 是否为字符串或数字
 * @param {unknown} value
 * @param {boolean} [nonempty]
 * @returns { value is string | number }
 */
export function isNumOrStr(
  value: unknown,
  nonempty?: boolean
): value is string | number
/**
 * 是否为 Symbol
 * @param {unknown} value
 * @returns {value is symbol}
 */
export function isSymbol(value: unknown): value is symbol
/**
 * 是否为函数
 * @param {unknown} value
 * @returns { value is Function }
 */
export function isFunc(value: unknown): value is Function
/**
 * 是否为对象
 * @param {unknown} value
 * @returns {value is Record<PropertyKey, any>}
 */
export function isObj(value: unknown): value is Record<PropertyKey, any>
/**
 * 是否为数组
 * @param {unknown} value
 * @param {boolean} [nonempty]
 * @returns {value is unknown[]}
 */
export function isArr(value: unknown, nonempty?: boolean): value is unknown[]
/**
 * 是否为空数组
 * @param {unknown} value
 * @returns {value is []}
 */
export function isEmptyArr(value: unknown): value is []
/**
 * 是否为字符串数组
 * @param {unknown} value
 * @param {boolean} [nonempty]
 * @param {boolean} [itemNonempty]
 * @returns {value is string[]}
 */
export function isStrArr(
  value: unknown,
  nonempty?: boolean,
  itemNonempty?: boolean
): value is string[]
/**
 * 是否为属性键
 * @param {unknown} value
 * @returns {value is PropertyKey}
 */
export function isPropertyKey(value: unknown): value is PropertyKey
/**
 * 是否为属性键数组
 * @param {unknown} value
 * @param {boolean} [nonempty]
 * @returns {value is PropertyKey[]}
 */
export function isPropertyKeys(
  value: unknown,
  nonempty?: boolean
): value is PropertyKey[]
/**
 * 是否为包含指定属性的对象
 * @type {<T extends PropertyKey>(
 *  value: unknown,
 *  keys: T | T[],
 *  propNonempty?: boolean
 * ) => value is { [key in T]: typeof value[key] }}
 */
export function isObjWith<T extends PropertyKey>(
  value: unknown,
  keys: T | T[],
  propNonempty?: boolean
): value is { [key in T]: unknown }
/**
 * 是否为对象数组
 * @type {<T extends PropertyKey>(
 *  value: unknown,
 *  keys: T | T[],
 *  nonempty?: boolean
 * ) => value is { [key in T]: any}[]}
 */
export function isObjArr<T extends PropertyKey>(
  value: unknown,
  keys?: T | T[],
  nonempty?: boolean
): value is { [key in T]: any }[]
/**
 * 判断目标对象是否含有指定方法
 * @type {<T extends string>(
 *   obj: unknown,
 *   funcName: T
 * ) => obj is { [key in T]: (...args: any[]) => any }}
 */
export function hasFunc<T extends string>(
  obj: unknown,
  funcName: T
): obj is { [key in T]: (...args: any[]) => any }
/**
 * @param {boolean} condition
 * @param {string} [message]
 */
export function assert(condition: boolean, message?: string): void
/**
 * @param {unknown} value
 * @param {string} [message]
 */
export function assertVar(
  value: unknown,
  message?: string
): {
  /**
   * 必须为字符串
   * @param {boolean} [nonempty]
   */
  isStr(nonempty?: boolean): void
  /**
   * 必须为数字
   * @type {(nonzero?: boolean) => void}
   */
  isNum: (nonzero?: boolean) => void
  /**
   * 必须为字符串或数字
   * @type {(nonempty?: boolean) => void}
   */
  isNumOrStr: (nonempty?: boolean) => void
  /**
   * 必须为函数
   * @type {() => void}
   */
  isFunc: () => void
  /**
   * 必须为对象
   * @type {() => void}
   */
  isObj: () => void
  /**
   * 必须为数组
   * @type {(nonempty?: boolean) => void}
   */
  isArr: (nonempty?: boolean) => void
  /**
   * 必须为空数组
   * @type {() => void}
   */
  isEmptyArr: () => void
  /**
   * 必须为字符串数组
   * @type {(nonempty?: boolean, itemNonempty?: boolean) => void}
   */
  isStrArr: (nonempty?: boolean, itemNonempty?: boolean) => void
  /**
   * 必须为对象数组
   * @type {(keys?: string | string[], nonempty?: boolean) => void}
   */
  isObjArr: (keys?: string | string[], nonempty?: boolean) => void
  /**
   * 必须为包含指定属性的对象
   * @type {(keys: string | string[], propNonempty?: boolean) => void}
   */
  isObjWith: (keys: string | string[], propNonempty?: boolean) => void
  /**
   * 必须为含有指定方法的对象
   * @param {string} funcName
   */
  hasFunc(funcName: string): void
}
declare namespace _default {
  export { isStr }
  export { isNum }
  export { isNumOrStr }
  export { isSymbol }
  export { isFunc }
  export { isObj }
  export { isArr }
  export { isEmptyArr }
  export { isStrArr }
  export { isPropertyKey }
  export { isPropertyKeys }
  export { isObjArr }
  export { isObjWith }
  export { hasFunc }
  export { assert }
  export { assertVar }
}
export default _default
