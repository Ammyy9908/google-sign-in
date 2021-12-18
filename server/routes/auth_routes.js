const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
async function verifyUser(req,res,next){
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).send({error:"Access Denied"});
    }
    try{
        const decoded = await jwt.verify(token,'mytopsecret');
        if(!decoded){
            return res.status(401).send({error:"Access Denied! Invalid Token"});
        }
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(401).send({error:"Access Denied"});
    }
}
router.get('/user',verifyUser,async (req,res)=>{
        const user = await User.findOne({googleId:req.user._id});
        res.status(200).send(user);
}).post('/signup',async (req,res)=>{
    console.log(req.body);
    const{name,email,googleId,avatar} = req.body;


    // check if user already exists

    const user = await User.findOne({email});
    if(user){
        return res.status(400).send({error:"User already exists"});
    }
    // else make a new user entry and make a jwt token and send it to client


    const token = jwt.sign({_id:googleId}, 'mytopsecret');
    const newUser = new User({
        name,
        email,
        googleId,
        avatar,
    });
    await newUser.save().then(()=>{
        res.status(200).send({token});
    }).catch(err=>{
        res.status(400).send({error:"Error in saving user"});
    });
}).post('/login',async (req,res)=>{
    console.log(req.body);
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).send({error:"User does not exist wth this email"});
    }
    const token = jwt.sign({_id:user.googleId}, 'mytopsecret');
    res.status(200).send({token});
})

module.exports = router;