// models/room.js

const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  passkey: {
    type: String,
    required: true
  },
  host: {
    type: String,
    required: true
  },
  client:{
    type: String,
    require:true
  }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
