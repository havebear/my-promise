/*
 * @Author: BGG
 * @Date: 2022-03-04 15:42:30
 * @LastEditors: BGG
 * @LastEditTime: 2022-03-04 16:27:01
 * @Description:  Promise/A+ 规范实现
 */

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected'

class MyPromise {

  constructor (executor) {
    executor(this.resolve, this.reject)
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
    const { status, value, reason } = this

    // switch (status) {
    //   case FULFILLED:
    //     onFulfilled(value)
    //     break
    //   case REJECTED:
    //     onRejected(reason)
    //     break
    //   case PENDING:
    //     this.onFulfilledCallbacks = onFulfilled
    //     this.onRejectedCallbacks = onRejected
    //     break
    // }

    if (status === FULFILLED) {
      onFulfilled(value)
    } else if (status === REJECTED) {
      onRejected(reason)
    } else if (status === PENDING) {
      onFulfilled && this.onFulfilledCallbacks.push(onFulfilled)
      onRejected && this.onRejectedCallbacks.push(onRejected)
    }
  }
}

module.exports = MyPromise
