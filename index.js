const MyPromsie = require('./my-promise')

// const promise = new MyPromsie((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success')
//   }, 2000)
// })

const promise = new MyPromsie((resolve, reject) => {
  resolve('success')
})

// promise.then(
//   res => {
//     console.log(1)
//     console.log('resolve', res)
//   },
//   err => {
//     console.log('reject', err)
//   }
// )

// promise.then(
//   res => {
//     console.log(2)
//     console.log('resolve', res)
//   }
// )

// promise.then(
//   res => {
//     console.log(3)
//     console.log('resolve', res)
//   }
// )

function other () {
  return new Promise((resolve, reject) => {
    resolve('other')
  })
}

/** 链式调用 */
// promise.then(res => {
//   console.log(1)
//   console.log('resolve', res)
//   return other()
// }).then(res => {
//   console.log(2)
//   console.log('resolve', res)
// })

promise.then(res => {
  console.log(1)
  console.log('resolve', res)
  return promise
})
