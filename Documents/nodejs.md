##### accept bash arguments

```js
var arguments = process.argv.splice(2);
```

##### set environment

```bash
export NODE_ENV=test
echo $NODE_ENV
```

### pm2

```bash
# update environment
ENV_VAR=somethingnew pm2 restart app --update-env
```

### Promise

```node
// 为什么需要使用Promise
// nodejs是异步的，如果需要链式调用就需要写回调函数，回调函数内嵌套回调函数就会导致代码层次非常深，“链式”调用顺序却难以显现出来

const fs = require('fs');
// 顺序读取三个文件并打印
fs.readFile('./files/1.txt','utf8',function(err,data){
  if(err){
    throw err;
  }
  console.log(data);
  fs.readFile('./files/2.txt','utf8',function(err,data){
    console.log(data);
    fs.readFile('./files/3.txt','utf8',function(err,data){
      console.log(data);
    })
  })
})

// 改写成Promise封装过的
const readFilePromise = new Promise(function (resolve, reject) {
  fs.readFile('./files/1.txt', 'utf8', function (err, data) {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  })
});

// 传入path参数的封装
let getFileByPath = (path) => {
	return new Promise(function (resolve,reject) {
    fs.readFile(path, 'utf8', function (err, data) {
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    })
  });
}

// 每执行一个，通过then指定resolve和reject
getFileByPath('./files/1.txt')
.then(function(data){
  console.log("file1获取成功："+data);
  return getFileByPath('./files/2.txt');   // 标记1
},function(err){
  console.log("file1获取失败："+err);
  return getFileByPath('./files/2.txt');	 // 标记1
})   																			 // 无论如何这里都是返回的标记1，任务是去读取第二个文件
.then(function(data){
  console.log("成功："+data);
  return getFileByPath('./files/3.txt');
},function(err){
  console.log("失败："+err);
  return getFileByPath('./files/3.txt');
})																				 // 以此类推
.then(function(data){
  console.log("成功："+data);
},function(err){
  console.log("失败："+err);
});

// catch 的使用针对链式执行，不指定reject函数的情况，给一个统一的处理方案
// 任何reject的情况都会终止链式执行

getFileByPath('./files/1.txt')
.then(data => {
	console.log('file1 success:', data)
	return getFileByPath('./files/2.txt')
})
.then(data => {
	console.log('file2 success:', data)
	return getFileByPath('./files/3.txt')
})
.then(data => {
	console.log('file3 success:', data)
})
.catch(e => {
	console.log('catch:', e)
})

// thhen+catch+finally结构
readFilePromise.then(data => {
  console.log('成功：' + data);
}).catch(err => {
	// 写法方面可以换成then的第二个参数reject这样去实现
  console.log('err');
}).finally(() => {
  console.log('最终完成后做的内容');
})

// Promise.all方法
var promise1 = getFileByPath('./files/1.txt');
var promise2 = getFileByPath('./files/2.txt');
var promise3 = getFileByPath('./files/3.txt');

//执行多个异步任务，成功时返回成功列表，失败时返回reject()函数的执行内容.
Promise.all([promise3,promise1,promise2]).then(function(data){
  console.log(data); 
},function(err){
  console.log('错误了：'+err);
})
```



#### Nodejs Document Work

##### async_hooks

```node
// get access by using this
const async_hooks = require('async_hooks');

// create a hook
const asyncHook = async_hooks.createHook({ init, before, after, destroy, promiseResolve });
// init, before, after, destroy, promiseResolve these are different event come with callback functions

asyncHook.enable(); // start the track

asyncHook.disable(); // 

async_hooks.executionAsyncId() // 获取当前的asyncId
async_hooks.triggerAsyncId() // 获取触发的此回调的资源的Id

```



##### Buffer

```bash
# create all buffer filled with zero
node --zero-fill-buffers
```



```node
const buf1 = Buffer.alloc(10);

// create a length 10 buffer filled with hex 1
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');

const buf = Buffer.from('hello world', 'ascii');
console.log(buf.toString('hex'));
// 打印: 68656c6c6f20776f726c64
console.log(buf.toString('base64'));
// 打印: aGVsbG8gd29ybGQ=
console.log(buf.toString('ascii'));
// 打印：hello world

// 创建一个非内存池的 Buffer 实例并拷贝相关的比特位出来。过度的内存之后的最后手段。
Buffer.allocUnsafeSlow(size)

// 以该编码方式解码出来的内容长度
Buffer.byteLength(string[, encoding])

```

### http



#### Agent 类

http.Agent 负责管理http客户端连接持久性和重用。

##### agent.keepSocketAlive

当 `socket` 与请求分离并且可以由 `Agent` 保留时调用。如果此方法返回一个假值，则将销毁套接字而不是将其保留以用于下一个请求。

##### agent.destroy()

启用了keepAlive的代理在不再使用时显式关闭代理。否则在服务器终止套接字之前，套接字可能会挂起很长时间。

##### agent.freeSockets

获取包含当启用 `keepAlive` 时代理正在等待使用的套接字数组。



#### http.ClientRequest 类

'connection' 事件

建立新的 TCP 流时会触发此事件。 `socket` 通常是 [`net.Socket`](http://nodejs.cn/s/wsJ1o1) 类型的对象。 通常用户无需访问此事件。 特别是，由于协议解析器附加到套接字的方式，套接字将不会触发 `'readable'` 事件。 也可以通过 `request.connection` 访问 `socket`。

