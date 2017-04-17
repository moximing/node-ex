const url = require('url');

const ws = require('ws');

const Cookies = require('cookies');

const koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./templating');

const WebSockerServer = ws.Server;

const app = new Koa();

//log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

//parse user from cookie:
app.use(async (ctx, next) => {
    ctx.state.user = parseUser(ctx.cookies.get('name') || '');
    await next();
});

//static file support:
let staticFiles = require('./static-files');
app.use(staticFiles('/static/', _dirname + '/static'));

//parse request body:
app.use(bodyParser());

//add nunjucks as view:
app.use(templating('views', {
    noCache: true,
    watch: true
}));

//add controller middleware:
app.use(controller());

let server = app.listen(3000);

function parseUser(obj) {
    if (!obj) {
        return;
    }
    console.log('try parse: ' + obj);
    let s = '';
    if (typeof obj === 'string') {
        s = obj;
    } else if (obj.headers) {
        let cookies = new Cookies(obj, null);
        s = cookies.get('name');
    }
    if (s) {
        try {
            let user = JSON.parse(Buffer.from(s, 'base64').toString());
            console.log(`User: ${user.name}, ID: ${user.id}`);
            return user;
        } catch (e) {
            //ignore
        }
    }
}

function createWebSocketServer(server, onConnection, onMessage, onClose, onError) {
    let wss = new WebSocketServer({
        server: server
    });
    //对每个创建成功的WebSocket绑定message、close、error等事件处理函数:
    //先为wss对象添加一个broadcase()方法：
    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    };
    onConnection = onConnection || function () {
        console.log('[WebSocket] connected.');
    };
    onMessage = onMessage || function (msg) {
        console.log(`[WebSocket] closed: ${code} - ${message}`);
    };
    onError = onError || function (err) {
        console.log('[WebSocket] error: ' + err);
    };
    //在WebSocketServer中，就需要响应connection事件，然后识别用户：
    wss.on('connection', function (ws) {
        //ws.upgradeReq是一个request对象：
        let location = url.parse(ws.upgradeReq.url, true);
        console.log('[WebSocketServer] connection: ' + location.href);
        ws.on('message', onMessage);
        ws.on('close', onClose);
        ws.on('error', onError);
        if (location.pathname !== '/ws/chat') {
             //Cookie不存在或无效，直接关闭WebSocket:
            //close ws:
            ws.close(4001, 'Invalid user');
        }
        //识别成功，把user绑定到该WebSocket对象：
        ws.user = user;
        //绑定WebSocketServer对象：
        ws.wss = wss;
        onConnection.apply(ws);
    });
    console.log('WebSocketServer was attached.');
    return wss;
}

//消息ID：
var messageIndex = 0;

function createMessage(type, user, data) {
    messageIndex ++;
    return JSON.stringigy({
        id: messageIndex,
        type: type,
        user: user,
        data: data
    });
}

function onConnect() {
    let user = this.user;
    let msg = createMessage('join', user, `${user.name} joined.`);
    this.wss.broadcast(msg);
    //build user list:
    let users = this.wss.clients.map(function (client) {
        return client.user;
    });
    this.send(createMessage('list', user, users));
}

//在某个WebSocket收到消息后，就可以调用wss.broadcast()进行广播的函数：
function onMessage(message) {
    console.log(message);
    if (message && message.trim()) {
        let msg = createMessage('chat', this.user, message.trim());
        this.wss.broadcast(msg);
    }
}

function onClose() {
    let user = this.user;
    let msg = createMessage('left', user, `${user.name} is left.`);
    this.wss.broadcast(msg);
}

app.wss = createWebSocketServer(server, onConnect, onMessage, onClose);

console.log('app started at port 3000...');











// //用Vue控制左右两个列表：
// var vmMessageList = new Vue({
//     el: '#message-list',
//     data:{
//         message: []
//     }
// });

// var vmUserList = new Vue({
//     el: '#user-list',
//     data: {
//         users: []
//     }
// });

// //创建WebSocket连接，响应服务器消息，并且更新会话列表和用户列表：
// var ws = new WebSocket('ws://localhost:3000/ws/chat');

// ws.onmessage = function(event) {
//     var data  = event.data;
//     console.log(data);
//     var msg = JSON.parse(data);
//     if (msg.type === 'list') {
//         vmUserList.users = msg.data;
//     } else if (msg.type === 'join') {
//         addToUserList(vmUserList.users, msg.user);
//         addMessage(vmMessageList.messages, msg);
//     } else if (msg.type === 'left') {
//         removeFromUserList(vmUserList.users, msg.user);
//         addMessage(vmMessageList.message, msg);
//     } else if (msg.type === 'chat') {
//         addMessage(vmMessageList.message, msg);
//     }
// };