///You can only resolve or reject  not both
///you can resolve an object if you need more data
///then can receive the error callback but you should use the explicit catch method
///Promises are most of the time created by the library
//We only attach handlers
const promise = new Promise((resolve, reject) => {

    setTimeout(() => {
        resolve('this is the resolve data')
        //reject('Something went wrong')
    }, 1500)
})

console.log('Before')

promise.then((data) => {
    console.log('1',data)
}).catch(e => {
    console.log('e',e)
})


console.log('After')