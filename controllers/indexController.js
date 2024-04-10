const Room = require('../models/room');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

exports.getHome = (req,res,next)=>{
  if(req.session.isLoggedIn){
    res.render('home',{pageTitle:'Home',path:'/home',isAuth:req.session.isLoggedIn});
    
  } else{
    res.redirect('/');
  } 
  
}

exports.getIndex = (req,res,next)=>{
  if(req.session.isLoggedIn){
    res.redirect('/home');
  }else{
    res.render('index',{pageTitle:"ChatApp",path:'/',isAuth:req.session.isLoggedIn});
  }
  
}



exports.getCreateRoom = (req,res,next)=>{
    
  if(req.session.isLoggedIn){
    res.render('createRoom',{pageTitle:"Create Room",path:'/createRoom',isAuth:req.session.isLoggedIn});
    
  }else{
    res.redirect('/home');
  }

}
 
exports.getJoinRoom = (req,res,next)=>{
 
    res.render('joinRoom',{pageTitle:"Join Room",path:"joinRoom",isAuth:req.session.isLoggedIn});
 
}

exports.postJoinRoom = async (req, res,next) => {
   const name = req.body.roomName;
   const passkey = req.body.passkey;
   const username = req.body.username;
    Room.findOne({name:name,passkey:passkey})
   .then(room=>{
    console.log("Res ::",room);
    console.log("Room ID : ",room._id);
    if (!room) {
        return res.status(404).send('Room not found or incorrect passkey');
      }
      
      res.redirect(`/room/${room._id}?username=${username}`); 
   }).catch(err=>{
    console.log(err);
    return res.status(404).redirect('/error/notF');

   })
//    console.log(room);
  
  }

exports.JoinRoom = async (req, res) => {
    try {
      const roomId = req.params.roomId;
      const username = req.query.username;
      const room = await Room.findById(new ObjectId(roomId));
      if (!room) {
        return res.status(404).redirect('/error/notF');
      }
      
        res.render('room', { room, username:username,path:'/room/:${roomId}',isAuth:req.session.isLoggedIn});  
      
        // Render the room view with the room data
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }

exports.postCreateRoom =   async (req, res) => {
    try {
      const { name, passkey,username } = req.body;
       // Assuming authentication is implemented and user is logged in
      const room = new Room({ name: name, passkey: passkey, host: username });
      await room.save();
      res.redirect(`/room/${room._id}?username=${username}`); // Redirect to the newly created room
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }

  exports.getError = (req,res,next)=>{
    const errTyp = req.params.errTyp;
    if(errTyp==='notF'){
      if(req.session.isLoggedIn){
        res.render('error',
        {errMsg:"Room Not Found !",
         pageTitle:"404",
         path:'/error/notF',
         isAuth:req.session.isLoggedIn});
      }else{
        res.redirect('/home');
        }
    }

}
