import validator from "validator"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from"cloudinary"
import BusinessListModel from "../models/BusinessListModel.js"


//API for adding service
const addService=async(req,res)=>{
    try{
        const { name,email, password, serviceName, description,  fees } = req.body
        const imageFile=req.imageFile
        
        //checking for all data to add doctor
        if(!name || !email|| !password|| !serviceName|| !description|| !fees ){
            return res.json({success:false,message:"missing details"})
        }


        //validating email format
        if(validator.isEmail(email)){
            return res.json({success:false,message:"enter valid email"})
        }

        //validating strong password
        if(password.length<8){
            return res.json({success:false,message:"enter strong password"})
        }


        //hashing service password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        //upload image to cloudinary
        const imageUpload=await cloudinary.uploader.upload(imageFile,{resource_type:"image"})
        const imageUrl=imageUpload.secure_url

        const serviceData={
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            serviceName,
            description,
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

export {addService}