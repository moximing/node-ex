'use strict';

// var s = 'Hello';

// function greet(name) {
//     console.log(s + ',' + name + '!');
// }

// var a = 'Bye';
// function bye(name) {
//     console.log(a + ',' + name +'!');
// }

// module.exports = {
//     greet : greet,
//     bye : bye
// }; 



//第一个HTTP服务器程序
 
//导入http模块:
var http = require('http');
//创建http server,并传入回调函数：
var server = http.createServer(function(request,response){
    //回调函数接受request和response对象，
    //获得HTTP请求的method和url:
    console.log(request.method + ':' + request.url);
    //将HTTP响应200写入response,同时设置Content-Type:text/html:
    response.writeHead(200,{'Content-Type' : 'text/html'});
    //将HTTP响应的HTML内容写入response;
    reponse.end('<h1>Hello world!</h1>');
})

//让服务器监听8080端口：
server.listen(8080);

console.log('Server is running ar http://127.0.0.1:8080/');
