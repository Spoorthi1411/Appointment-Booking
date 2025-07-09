import express from 'express'
import { addService } from '../controllers/admincontroller.js'
import upload from '../middleware/multer.js'

const adminRouter = express.Router()

adminRouter.post('/add-service',upload.single('image'),addService)

export default adminRouter
