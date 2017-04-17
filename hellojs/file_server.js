// 'use strict';

// var
//     fs = require('fs'),
//     url = require('url'),
//     path = require('path'),
//     http = require('http');

// // 从命令行参数获取root目录，默认是当前目录:
// var root = path.resolve(process.argv[2] || '.');

// console.log('Static root dir: ' + root);

// // 创建服务器:
// var server = http.createServer(function (request, response) {
//     // 获得URL的path，类似 '/css/bootstrap.css':
//     var pathname = url.parse(request.url).pathname;
//     // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
//     var filepath = path.join(root, pathname);
//     // 获取文件状态:
//     fs.stat(filepath, function (err, stats) {
//         if (!err && stats.isFile()) {
//             // 没有出错并且文件存在:
//             console.log('200 ' + request.url);
//             // 发送200响应:
//             response.writeHead(200);
//             // 将文件流导向response:
//             fs.createReadStream(filepath).pipe(response);
//         } else {
//             // 出错了或者文件不存在:
//             console.log('404 ' + request.url);
//             // 发送404响应:
//             response.writeHead(404);
//             response.end('404 Not Found');
//         }
//     });
// });

// server.listen(8080);

// console.log('Server is running at http://127.0.0.1:8080/');



//文件服务器练习：修改成搜索目录则自动搜索HTML文件...
//看不懂。。。包括上面的也是似懂非懂。
'use strict';

var 
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

var filenames = ['default.html', 'index.html'];

var root = path.resolve('.'); // 使用当前目录
console.log('Static root dir: ' + root);
var server = http.createServer(function(request, response) {
    var pathname  = url.parse(request.url).pathname;
    var filePath = path.join(root, pathname );

    fs.stat(filePath, function(err, stat) {
        if (err) {
            console.log('不存在该文件');
            failure(response, '<h2>404 Not Found</h2>');
        } else {
            if (stat.isFile()) {
                console.log('请求的是文件');
                success(response, filePath);
            } else if (stat.isDirectory()) {
                console.log('请求的是目录');
                // 寻找该目录下的 index.html 或者 default.html
                isDir(response, filePath);
            }
        }
    });
});

function isDir(response, dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            failure(response, '<h1>404 该目录不存在</h1>');
        } else {
            console.log(files);
            var names = files.filter(function (x) {
                return x === 'index.html' || x === 'default.html';
            });
            if (names.length !== 0) {
                success(response, path.join(dir, names[0]));
            } else {
                failure(response, '<h1>404 不存在首页</h1>');
            }
        }
    });
}

function success(response, filePath) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream(filePath).pipe(response);
}

function failure(response, errString) {
    response.writeHead(404, {'Content-Type': 'text/html', 'charset': 'utf-8'});
    response.end(errString);
}

server.listen(8080);