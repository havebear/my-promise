const MyPromsie = require('./my-promise')

const promise = new MyPromsie((resolve, reject) => {
  resolve('success')
  reject('err')
})

promise.then(
  res => {
    console.log('resolve', res)
  },
  err => {
    console.log('reject', err)
  }
)
