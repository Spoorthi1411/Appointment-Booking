import express from 'express'
import { appointmentsService, employeesList, loginEmployee, appointmentCancel, appointmentComplete} from '../controllers/BusinessListController.js'
import authService from '../middleware/authService.js'

const employeeRouter = express.Router()

employeeRouter.get('/list',employeesList)
employeeRouter.post('/login',loginEmployee)
employeeRouter.get('/appointments',authService,appointmentsService)
employeeRouter.post('/complete-appointment',authService,appointmentComplete)
employeeRouter.post('/cancel-appointment',authService,appointmentCancel)


export default employeeRouter