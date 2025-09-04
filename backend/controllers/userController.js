import validator from 'validator'
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import BusinessListModel from '../models/BusinessListModel.js';
import appointmentModel from '../models/appointmentModel.js';

//API to register user
const registerUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.json({success:false,message:"Missing Details"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success:false,message:"enter a strong password"})
        }

        //Hashing user password
        const salt = await bcrypt.genSalt(10)
        const HashPassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password : HashPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

        res.status(201).json({success:true,token})

    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
//API for user login
const loginUser = async (req,res)=>{
    try {
        const {email,password} =req.body
        const user= await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:'User does not exist'})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        } else{
            res.json({success:false,message:"Invalid Credentials"})
        }



    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//ApI to get user profile data
const getProfile=async(req,res)=>{
    try {
        const userData = await userModel.findById(req.userId).select('-password')
        res.json({success:true,userData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to update user profile
const updateProfile = async(req,res)=>{
    try {
        const userId = req.userId
        const {name,phone,address,dob,gender} = req.body
        const imageFile = req.file

        if(!name || !phone || !dob || !gender){
            return res.json({success:false,message:"Data missing"})
        }

        await userModel.findByIdAndUpdate(userId, {name,phone,address:JSON.parse(address),dob,gender})

        if(imageFile){
            const imageUpload = cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageUrl = (await imageUpload).secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageUrl})
        }

        res.json({success:true,message:"Profile Updated"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to book appointment
const bookAppointment = async(req,res)=>{
    try {
        
        const {userId,employeeId,slotDate,slotTime} = req.body

        const employeeData = await BusinessListModel.findById(employeeId).select('-password')

        if(!employeeData.available){
            return res.json({success:false,message:'Service provider not available'})
        }

        let slots_booked = employeeData.slots_booked

        //checking for slots availability
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false,message:'Slot not available'})
            }
            else{
                slots_booked[slotDate].push(slotTime)
            }
        }
        else{
            slots_booked[slotDate]=[]
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete employeeData.slots_booked

        const appointmentData = {
            userId,
            employeeId,
            userData,
            employeeData,
            amount:employeeData.fees,
            slotTime,
            slotDate,
            date:Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        //save new slots data in employee's data
        await BusinessListModel.findByIdAndUpdate(employeeId,{slots_booked})
        
        res.json({success:true,message:'Appointment Booked'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//API to get user appointments for frontend my-services page
const listServices = async (req,res) => {
    try {
        
        const userId = req.userId
        const services = await appointmentModel.find({userId})

        res.json({success : true , services})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {registerUser,loginUser,getProfile,updateProfile,bookAppointment,listServices}