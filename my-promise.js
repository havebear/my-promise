/*
 * @Author: BGG
 * @Date: 2022-03-04 15:42:30
 * @LastEditors: BGG
 * @LastEditTime: 2022-03-04 16:00:11
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
  onFulfilledCallback = null
  // 存储失败回调函数
  onRjeectedCallback = null

  /** 更改完成后的状态 */
  resolve = value => {
    /** 只有等待状态才能修改状态 */
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value

      // 判断成功回调是否存在，存在则调用
      this.onFulfilledCallback && this.onFulfilledCallback(value)
    }
  }
  
  /** 更改失败后的状态 */
  reject = reason => {
    /** 只有等待状态才能修改状态 */
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason

      // 判断失败回调是否存在，存在则调用
      this.onRjeectedCallback && this.onRjeectedCallback(value)
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
    //     this.onFulfilledCallback = onFulfilled
    //     this.onRjeectedCallback = onRejected
    //     break
    // }

    if (status === FULFILLED) {
      onFulfilled(value)
    } else if (status === REJECTED) {
      onRejected(reason)
    } else if (status === PENDING) {
      this.onFulfilledCallback = onFulfilled
      this.onRjeectedCallback = onRejected
    }
  }
}

module.exports = MyPromise
