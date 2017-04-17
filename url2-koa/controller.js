const fs = require('fs');

//add url-route in /controllers:

function addMapping(router, mapping){
     for (var url in mapping) {
        if (url.startsWith('GET')) {
            //如果url类似"GET xxx":
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        }else if (url.startsWith('POST')) {
            //如果url类似'GET xxx':
            var path = url.substring(5);
            router.post(path,mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        }else{
            //无效的URL:
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    var files = fs.readdirSync(_dirname +　'/controllers');
    var js_files = files.filter((f)=>{
        return f.endsWith('.js');
    });
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers',
        //如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')();
    addControllers(router, controller_dir);
    return router.routes();
};