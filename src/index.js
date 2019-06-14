const express = require('express'),
    mongoose = require('mongoose'),
    routes = require('./routes'),
    path = require('path'),
    cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://criszu:cris123@teste-pv7yh.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

app.use((req, res, next) => {
    req.io = io;

    next();
});

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use(routes);

server.listen(4500, function () {
    console.log("Server rodando");
});