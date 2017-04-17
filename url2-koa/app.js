const Koa = require('koa');
//引入koa-bodyparser
const bodyParser = require('koa-boduparser');
//导入controller middleware:
const controller = require('./controller');

const app = new Koa();

//log request URL;
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

//parse request body:
app.use(bodyParser());

//add controllers:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');