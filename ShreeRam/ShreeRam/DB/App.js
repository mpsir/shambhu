var debug = require('debug')('express-socket.io-session:example'),
	app = require('express')(),
	server = require('http').createServer(app),
	io = require('socket.io')(server),
	session = require('express-session')({
		secret: 'my-secret',
		resave: true,
		saveUninitialized: true
	}),
	sharedsession = require('../');

app.use(session);

io.use(
	sharedsession(session, {
		autoSave: true
	})
);

app.use('*', function(req, res, next) { f.use.app(req, res, next) });

io.use(function(socket, next) { f.use.io(socket, next) });

// console.log('__dirname', __dirname, path.dirname('/'));

app.use(require('express').static(__dirname + '/www'));

app.use('/login', function(req, res, next) { f.app.login(req, res, next) });
app.use('/logout', function(req, res, next) { f.app.logout(req, res, next) });

io.on('connection', function(socket) {
    f.socket.connect(socket)	
	socket.on('login', function() { f.socket.login(socket) });
	socket.on('msg', function(data, c_back) { f.socket.msg(socket, data, c_back) });
	socket.on('checksession', function() { f.socket.checksession(socket) });
	socket.on('logout', function() { f.socket.logout(socket) });
});

server.listen(8080);
