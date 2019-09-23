const express = require('express');
const app     = express();
const server  = require('http').createServer(app);
const io      = require('socket.io')(server);

// 设置模板引擎
app.set('views',  './view');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// 设置静态文件托管目录
app.use(express.static('node_modules'));

app.get('/', (request, response) => {
    response.render('index.html');
});

//监听客户端链接,回调函数会传递本次链接的socket
io.on('connection', socket => {
    // 监听客户端发送的信息
    socket.on("sentToServer", message => {
        // 给客户端返回信息
        io.emit("sendToClient", {message});
    });
});

// 监听连接断开事件
socket.on("disconnect", () => {
    console.log("连接已断开...");
});

server.listen(3000);