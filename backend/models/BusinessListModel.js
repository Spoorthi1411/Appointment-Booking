import mongoose from "mongoose";

const BusinessListSchema= new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    image:{type:String, required:true},
    serviceName:{type:String, required:true},
    description:{type:String, required:true},
    available:{type:Boolean, required:true},
    fees:{type:Number, required:true},
    date:{type:Number, required:true},
    slots_booked: {type:Object,default:{}}
},{minimize:false})

const BusinessListModel=mongoose.models.BusinessList || mongoose.model('BusinessList',BusinessListSchema)

export default BusinessListModel
