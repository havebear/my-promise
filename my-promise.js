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

  /** 更改完成后的状态 */
  resolve = value => {
    /** 只有等待状态才能修改状态 */
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
    }
  }
  
  /** 更改失败后的状态 */
  reject = reason => {
    /** 只有等待状态才能修改状态 */
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
    }
  }

  then (onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    } else if (this.status === REJECTED) {
      onRejected(REJECTED)
    }
  }
}

module.exports = MyPromise
