const Room = require('../models/room');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

exports.getLogin = (req,res,next)=>{
    console.log(req.session.isLoggedIn);
    res.render('auth/login',{pageTitle:'Login',path:"/login",
    isAuth:false})
}


exports.postLogin = (req,res,next)=>{
    req.session.isLoggedIn = true;
    res.redirect('/home');
}

exports.postLogout = (req,res,next)=>{
    req.session.destroy((err)=>{
        console.log(err);
        res.redirect('/');

    });

}


