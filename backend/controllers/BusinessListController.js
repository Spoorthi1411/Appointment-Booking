import BusinessListModel from "../models/BusinessListModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"


const changeAvailability = async (req,res) => {
    try {
        const {employeeId} = req.body;

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
            res.json({success:false,message:'Invalid credentials'})
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
//API to markappointment completed for service panel
const appointmentComplete= async(req,res)=>{
    try {
        const {appointmentId} = req.body
        const employeeId = req.user.id;
        

        const appointmentData = await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.employeeId.toString() === employeeId.toString()){
            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true});
            return res.json({success:true,message:'Appointment completed'})
        }else{
            return res.json({success:false,message:'Mark Fail'})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
//API to cancel appointment for service panel
const appointmentCancel= async(req,res)=>{
    try {
        const {appointmentId} = req.body
        const employeeId = req.user.id;
        
        const appointmentData = await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.employeeId.toString() === employeeId.toString()){
            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true});
            return res.json({success:true,message:'Appointment cancelled'})
        }else{
            return res.json({success:false,message:'Cancellation failed'})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
//API to get dashboard data for doctor panel
const serviceDashboard= async(req, res)=>{

    try {
        const employeeId=req.user.id;

        const appointments= await appointmentModel.find({employeeId})

        let earnings=0

        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earnings+= item.amount
            }
        })

        let customers= []

        appointments.map((item)=>{
            if(!customers.includes(item.userId)){
                customers.push(item.userId)
            }
        })

        const dashData={
            earnings,
            appointments: appointments.length,
            customers: customers.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }


        res.json({success:true, dashData})




    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

//Api to get employee profile for servide panel
const serviceProfile=async (req,res) => {
    try {
        
        const employeeId=req.user.id;
        const profileData =await BusinessListModel.findById(employeeId).select('-password')

        res.json({success:true, profileData})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to update service profile data from service panel

const updateServiceProfile = async (req,res) => {
    try {
        const { fees ,available,description}=req.body
        const employeeId=req.user.id;

        await BusinessListModel.findByIdAndUpdate(employeeId, {fees, available,description})

        res.json({success:true,message:'Profile updated'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}



export {updateServiceProfile, serviceProfile, changeAvailability,employeesList,loginEmployee,appointmentsService,appointmentCancel,appointmentComplete, serviceDashboard}