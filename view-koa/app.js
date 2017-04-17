const Koa = require('koa');
//引入koa-bodyparser
const bodyParser = require('koa-boduparser');
//导入controller middleware:
const controller = require('./controller');

const templating = require('./templating');

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

//log request URL;第一个middleware记录URL以及页面执行时间；
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var 
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

//第二个middleware处理静态文件；
if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', _dirname + '/static'));
}

//parse request body:第三个middleware解析POST请求；
app.use(bodyParser());

//第四个middleware负责给ctx加上render()来使用Nunjucks;
app.use(templating('view', {
    noCache: !isProduction,
    watch: !isProduction
}));

//add controllers:最后一个midderware处理URL路由；
app.use(controller());

let staticFiles = require('./static-files');
app.use(staticFiles('/static/',_dirname+'/static'));

app.listen(3000);
console.log('app started at port 3000...');