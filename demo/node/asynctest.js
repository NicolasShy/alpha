const async = require('async')


async function fun1 () {
    console.log("*")
}

async function fun2 () {
    console.log("+")
}

async.forever(fun1)
async.forever(fun2)