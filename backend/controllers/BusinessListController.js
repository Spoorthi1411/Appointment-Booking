import BusinessListModel from "../models/BusinessListModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"


const changeAvailability = async (req,res) => {
    try {
        const employeeId = req.user.id;
        const employeeData = await BusinessListModel.findById(employeeId)
        await BusinessListModel.findByIdAndUpdate(employeeId,{available: !employeeData.available})
        res.json({success:true, message: 'Availability changed'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const employeesList = async(req,res)=>{
    try {
        const employees = await BusinessListModel.find({}).select(['-password','-email'])
        res.json({success:true,employees})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    
    }
}

// API for employee login
const loginEmployee = async (req,res) => {
    try {
        const { email, password } = req.body
        const employee = await BusinessListModel.findOne({email})

        if(!employee){
            return res.json({success:false,message:'Invalid Credentials'})
        }

        const isMatch = await bcrypt.compare(password, employee.password)

        if(isMatch){
            const token = jwt.sign({id:employee._id},process.env.JWT_SECRET)

            res.json({success:true,token})
        }else{
            req.json({success:false,message:'Invalid credentials'})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//API to get appointments for service panel
const appointmentsService = async (req,res) =>{
    try {
        const employeeId = req.user.id;
        const appointments= await appointmentModel.find({employeeId})

        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {changeAvailability,employeesList,loginEmployee,appointmentsService}