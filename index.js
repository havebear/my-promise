const MyPromsie = require('./my-promise')

const promise = new MyPromsie((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 2000)
})

promise.then(
  res => {
    console.log('resolve', res)
  },
  err => {
    console.log('reject', err)
  }
)
