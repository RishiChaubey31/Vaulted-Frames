const express = require('express');
const app=express();

app.post('/register',(req,res)=>{
    const {email,password}=req.body; 
    try{
        
    }catch(error){
        res.status(500).json({success:false,message:"Server error"});
    }
});


