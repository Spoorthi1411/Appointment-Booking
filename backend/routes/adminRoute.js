import express from 'express'
import { addService,loginAdmin } from '../controllers/admincontroller.js'
import upload from '../middleware/multer.js'

const adminRouter = express.Router()

adminRouter.post('/add-service',upload.single('image'),addService)
adminRouter.post('/login',loginAdmin)

export default adminRouter
