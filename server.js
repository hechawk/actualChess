let http = require('http');
let express = require('express')
let socketio = require('socket.io')

let app = express();
let server = http.createServer(app);
let io = socketio(server);

app.use(express.static(__dirname + '/client'));

io.on('connection', onConnection)

server.listen('3000', () => console.log("We up boys"))

function onConnection(socket){
    console.log("yeeee");
}
