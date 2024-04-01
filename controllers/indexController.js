const Room = require('../models/room');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

exports.getIndex = (req,res,next)=>{
    res.render('index',{pageTitle:'Home'});
}

exports.getCreateRoom = (req,res,next)=>{
    res.render('createRoom',{pageTitle:"Create Room"});

}
 
exports.getJoinRoom = (req,res,next)=>{
    res.render('joinRoom',{pageTitle:"Join Room"});

}

exports.postJoinRoom = async (req, res,next) => {
   const name = req.body.roomName;
   const passkey = req.body.passkey;
    Room.findOne({name:name,passkey:passkey})
   .then(room=>{
    console.log("Res ::",room);
    console.log("Room ID : ",room._id);
    if (!room) {
        return res.status(404).send('Room not found or incorrect passkey');
      }
      
      res.redirect(`/room/${room._id}`); 
   })
//    console.log(room);
  
  }

exports.JoinRoom = async (req, res) => {
    try {
      const roomId = req.params.roomId;
      const room = await Room.findById(new ObjectId(roomId));
      if (!room) {
        return res.status(404).send('Room not found');
      }
      res.render('room', { room }); // Render the room view with the room data
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }

exports.postCreateRoom =   async (req, res) => {
    try {
      const { name, passkey } = req.body;
      const host = 'Dummy'; // Assuming authentication is implemented and user is logged in
      const room = new Room({ name, passkey, host });
      await room.save();
      res.redirect(`/room/${room._id}`); // Redirect to the newly created room
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }