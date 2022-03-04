/*
 * @Author: BGG
 * @Date: 2022-03-04 15:42:30
 * @LastEditors: BGG
 * @LastEditTime: 2022-03-04 17:14:41
 * @Description:  Promise/A+ 规范实现
 */

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected'

const TYPE_ERROR = 'Chaining cycle detected for promise #<Promise>'

class MyPromise {

  constructor (executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  /** 实例属性 */

  // 状态
  status = PENDING
  // 解决值（成功之后的值）
  value = null
  // 拒绝原因（失败之后的原因）
  reason = null

  // 存储成功回调函数
  onFulfilledCallbacks = []
  // 存储失败回调函数
  onRejectedCallbacks = []

  /** 更改完成后的状态 */
  resolve = value => {
    /** 只有等待状态才能修改状态 */
    if (this.status === PENDING) {
      const { onFulfilledCallbacks } = this

      this.status = FULFILLED
      this.value = value

      // 判断成功回调是否存在，存在则调用
      while (onFulfilledCallbacks.length) {
        onFulfilledCallbacks.shift()(value)
        // const x = onFulfilledCallbacks.shift()(value)
        // resolvePromise(x, resolve, reject)
      }
    }
  }
  
  /** 更改失败后的状态 */
  reject = reason => {
    /** 只有等待状态才能修改状态 */
    if (this.status === PENDING) {
      const { onRejectedCallbacks } = this

      this.status = REJECTED
      this.reason = reason

      // 判断失败回调是否存在，存在则调用
      while (onRejectedCallbacks.length) {
        onRejectedCallbacks.shift()(value)
      }
    }
  }

  then (onFulfilled, onRejected) {
    // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
    const promise2 = new MyPromise((resolve, reject) => {
      const {
        status,
        reason,
        onFulfilledCallbacks,
        onRejectedCallbacks
      } = this

      // 状态为执行中
      if (status === FULFILLED) {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的结果
            const x = onFulfilled(this.value)

            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (status === REJECTED) {
        onRejected(reason)
      } else if (status === PENDING) {
        onFulfilled && onFulfilledCallbacks.push(onFulfilled)
        onRejected && onRejectedCallbacks.push(onRejected)
      }
    })

    return promise2
  }
}

function resolvePromise (promise2, x, resolve, reject) {
  // 是否返回自己，是则抛出类型错误并返回
  if (promise2 === x) {
    return reject(new TypeError(TYPE_ERROR))
  }
  // x 是否为 MyPromise 实例对象
  if (x instanceof MyPromise) {
    // 执行x，调用 then 方法，目的是将其状态变为 fulfilled 或 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化后
    x.then(resolve, reject)
  } else {
    // 普通值（或未返回）
    resolve(x)
  }
}

module.exports = MyPromise
