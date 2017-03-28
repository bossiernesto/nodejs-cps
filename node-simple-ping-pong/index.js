const colored_console = require('./colored_console.js')
const port = 3001;
const timeout = 6000;

var port_server2 = 3011;

var server = require('http').createServer().listen(port, function () {
    colored_console.log_info("Server 1 listening on port " + port);
});

var io = require('socket.io').listen(server).set("log level", 0);

io.sockets.on("connection", function (socket) {
    var device = socket.request.connection.remoteAddress;
    colored_console.log_success('Server 1: Incoming connection from ' + device + ' at ');
    socket.on("echo", function (msg, callback) {
        colored_console.log_info(msg);
        callback(msg);
    });
});


function sendHeartbeat() {
    colored_console.log_info("Sending heartbeat to clients");
    client.emit("echo", "Hello World from Server 1", function (message) {
        colored_console.log_success('Echo received: ', message);
    });
}

var ioc = require('socket.io-client');
var client = ioc.connect("http://localhost:" + port_server2);

client.once("connect", function () {
    colored_console.log_success('Client: Connected to port ' + port_server2);
    setInterval(sendHeartbeat, timeout)
});
