// app.js

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(session);

// Importing routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const MONGODB_URI = 'mongodb+srv://ashawale3194:NYJZ9nd8tyDL2Bn0@cluster0.3ktsbqn.mongodb.net/chatApp?retryWrites=true&w=majority&appName=Cluster0';

// Initializing Express app
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Connecting to MongoDB
const store = new mongoDbStore({
  uri:MONGODB_URI,
  collection:"sessions"
})

// Setting view engine to EJS
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:"my secret",
  resave:false,
  saveUninitialized:false,
  store:store
}));
// Routes
app.use(indexRouter);
app.use(authRouter);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Joining a room
  socket.on('joinRoom', roomId => {
      socket.join(roomId);
      console.log(`username joined room ${roomId}`);
  });

  // Leaving a room
  socket.on('leaveRoom', (roomId) => {
      socket.leave(roomId);
      console.log(`User left room ${roomId}`);
  });

  // Broadcasting messages to room participants
  socket.on('chatMessage', (roomId, message, username) => {
       console.log(message);
      io.to(roomId).emit('message', { username: username, message: message }); // Emit message to all clients in the room along with the username
  });

  socket.on('disconnect', () => {
      console.log('User disconnected');
  });
});

// Starting the server

mongoose.connect(MONGODB_URI,
 { useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>{
     console.log('MongoDB connected');
     server.listen(3000, () => {
        console.log('Server is running on port 3000');
      });
    })
.catch(err => console.error(err));