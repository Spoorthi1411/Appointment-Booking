import express from 'express'
import { addService,allEmployees,loginAdmin } from '../controllers/admincontroller.js'
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js'

const adminRouter = express.Router()

adminRouter.post('/add-service',authAdmin,upload.single('image'),addService)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-employees',authAdmin,allEmployees)

export default adminRouter
