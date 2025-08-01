import BusinessListModel from "../models/BusinessListModel.js"

const changeAvailability = async (req,res) => {
    try {
        const {employeeId} = req.body

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
export {changeAvailability,employeesList}