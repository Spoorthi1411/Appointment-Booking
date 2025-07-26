import validator from "validator"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from"cloudinary"
import BusinessListModel from "../models/BusinessListModel.js"
import path from 'path';
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";


//API for adding service
const addService=async(req,res)=>{
    try{
        console.log("req.body:", req.body);
        console.log("email field value:", req.body.email);
        console.log("req.file:", req.file);
        const { name ,email , password, serviceName, description,  fees , available } = req.body
        const imagePath = req.file?.path;
    if (!imagePath) {
      return res.json({ success: false, message: "No image file uploaded" });
    }

    
        
        //checking for all data to add doctor
        if(!name || !email|| !password|| !serviceName|| !description|| !fees || available === undefined){
            return res.json({success:false,message:"missing details"})
        }


        //validating email format
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"enter valid email"})
        }

        //validating strong password
        if(password.length<8){
            return res.json({success:false,message:"enter strong password"})
        }


        //hashing service password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        // Upload to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imagePath, {
        resource_type: "image",
        });
        if (!imageUpload || !imageUpload.secure_url) {
            return res.json({ success: false, message: "Cloudinary upload failed" });
        }

    const imageUrl = imageUpload.secure_url;

        const serviceData={
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            serviceName,
            description,
            available,
            fees,
            date:Date.now()
        }

            const newService= new BusinessListModel(serviceData)
            await newService.save()

            res.json({success:true,message:"service added"})

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// api for admin login
const loginAdmin = async(req,res)=>{
    try{

        const {email,password} = req.body

        if(email=== process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        } else{
            res.json({success:false,message:"Invalid credentials"})
        }

    } catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


// API to get all services list for admin pannel
const allEmployees = async (req,res)=>{
    try {
        const employees = await BusinessListModel.find({}).select('-password')
        res.json({success:true,employees})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {addService,loginAdmin,allEmployees}
