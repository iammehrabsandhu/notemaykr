import  express  from "express";
import axios from "axios";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import blogs from "./models/blogModel.js";
import Users from "./models/userModel.js";
import cors from "cors";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port=3000;
const DB_URL=process.env.DB_URL;
const JWTkey=process.env.JWT_SECRET;

mongoose.connect(`${DB_URL}`)
.then(()=>{console.log("sucessful connect with mongodb");})
.catch((error)=>{console.log(error);});
const db=mongoose.connection;


app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    next(); 

})

app.use(cors({
    credentials: true, 
    origin: true, // Reflect the requests's origin
}));
const vToken=async(req,res,next)=>{
    const Btoken=req.headers['authorization']; 
    const token =Btoken && Btoken.split(' ')[1];
    await jwt.verify(token,`${JWTkey}`,(err,user)=>{
        if(err){res.sendStatus(401);}
        else{console.log('verified');}
    })
    
    next();

}

app.use((req,res,next)=>{
    if (req.path !== '/checkUser' && req.path !== '/newUser') {
        vToken(req, res, next);
    } else {
        next();
    }
})

app.post("/checkUser",async(req,res)=>{
    const{username,password}=req.body;
    const vuser = await Users.findOne({username});
    if(!vuser){res.status(409).send("Not a verified user");}
    else{
        const passcheck = await bcrypt.compare(password,vuser.password);
        if(!passcheck){res.status(401).send("hash check failed");}
        
        else{
            const token = jwt.sign({username:vuser.username},`${JWTkey}`);
            console.log(`given ${token}`);
            res.cookie('token',token,{sameSite:"none",secure:true,httpOnly:false});
            res.status(201).send("cookie sent!"); 
        }
    }
})
app.post("/newUser",async(req,res)=>{
    const {username,password}=req.body;
    const Exuser = await Users.findOne({username});
    if(Exuser){res.status(401).send("already exists");}
    else{
       const hashedP = await bcrypt.hash(password,10);
       const neuser= new Users({username:username, password:hashedP});
       await neuser.save();
       res.status(201).json(neuser);
    }
})
app.post("/blogs",async(req,res)=>{
    const blog = await blogs.create(req.body)
    res.status(200).json(req.body);
})

app.get("/PrivBlogs",async(req,res)=>{
    const user=req.query.user;
    const posts = await blogs.find({author:user});
    res.json(posts);
})
app.get("/PublicBlogs",async(req,res)=>{
    const posts = await blogs.find({public:true});
    console.log("get");
    res.json(posts);
})
app.delete("/deleteID",async(req,res)=>{
    console.log("deleteissued");
    const idD=req.body.id;
    const del = await blogs.findOneAndDelete({_id:idD});
    res.status(200).json(idD);
})
app.patch("/edit",async(req,res)=>{
    const updated = await blogs.findOneAndUpdate(
        {_id:req.body._id},
        {$set:{
        title:req.body.title,
        content:req.body.content}
    })
    res.status(200).json(updated);
})
app.listen(3000,()=>{console.log(`running on dat ${port}`)});



