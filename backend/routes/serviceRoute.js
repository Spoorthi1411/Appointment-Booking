import express from 'express'
import { appointmentsService, employeesList, loginEmployee, appointmentCancel, appointmentComplete, serviceDashboard, serviceProfile, updateServiceProfile} from '../controllers/BusinessListController.js'
import authService from '../middleware/authService.js'

const employeeRouter = express.Router()

employeeRouter.get('/list',employeesList)
employeeRouter.post('/login',loginEmployee)
employeeRouter.get('/appointments',authService,appointmentsService)
employeeRouter.post('/complete-appointment',authService,appointmentComplete)
employeeRouter.post('/cancel-appointment',authService,appointmentCancel)
employeeRouter.get('/dashboard', authService, serviceDashboard)
employeeRouter.get('/profile',authService, serviceProfile)
employeeRouter.post('/update-profile',authService,updateServiceProfile)

export default employeeRouter