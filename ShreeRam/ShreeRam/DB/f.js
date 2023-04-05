globalThis.f = {
    use: {
        io(socket, next) {
            // debug('socket.handshake session data is %j.', socket.handshake.session);
            next();
        },
        app(req, res, next) {
            // debug('Express `req.session` data is %j.', req.session);
            next();
        }
    },
    socket: {
        login: function (socket) {
            debug('Received login message');
            socket.handshake.session.user = {
                username: 'OSK'
            };
            debug('socket.handshake session data is %j.', socket.handshake.session);

            // socket.handshake.session.save();
            //emit logged_in for debugging purposes of this example
            socket.emit('logged_in', socket.handshake.session);
        },
        checksession: function (socket) {
            debug('Received checksession message');
            debug('socket.handshake session data is %j.', socket.handshake.session);
            socket.emit('checksession', socket.handshake.session);
        },
        logout: function (socket) {
            debug('Received logout message');
            delete socket.handshake.session.user;
            // socket.handshake.session.save();
            //emit logged_out for debugging purposes of this example
            debug('socket.handshake session data is %j.', socket.handshake.session);
            socket.emit('logged_out', socket.handshake.session);
        },
        connect: function (socket) {
            r.connected_sockets++
            console.log('connected_sockets', r.connected_sockets);
            socket.emit('sessiondata', socket.handshake.session);

        },
        msg: function (socket, data, c_back) {
         console.log('socket',socket);   
        }
    },
    app: {
        login: function (req, res, next) {
            debug('Requested /login');
            req.session.user = {
                username: 'OSK'
            };
            //req.session.save();
            res.redirect('/');
        },
        logout: function (req, res, next) {
            debug('Requested /logout');
            delete req.session.user;
            //req.session.save();
            res.redirect('/');
        }
    }
}

