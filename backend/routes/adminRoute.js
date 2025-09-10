import express from 'express'
import { addService,allEmployees,loginAdmin,appointmentsAdmin,appointmentCancel, adminDashboard,} from '../controllers/admincontroller.js'
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js'
import {changeAvailability } from '../controllers/BusinessListController.js'

const adminRouter = express.Router()

adminRouter.post('/add-service',authAdmin,upload.single('image'),addService)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-employees',authAdmin,allEmployees)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter
