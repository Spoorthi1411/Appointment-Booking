import express from 'express'
import {registerUser,loginUser, getProfile,updateProfile ,bookAppointment,listServices,cancelAppointment,paymentRazorPay, verifyRazorpay} from '../controllers/userController.js'

import authUser from '../middleware/authUser.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/services',authUser,listServices)
userRouter.post('/cancel-booking',authUser,cancelAppointment)
userRouter.post('/payment-razorpay',authUser,paymentRazorPay)
userRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

export default userRouter