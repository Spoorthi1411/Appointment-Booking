import express from 'express'
import { appointmentsService, employeesList, loginEmployee} from '../controllers/BusinessListController.js'
import authService from '../middleware/authService.js'

const employeeRouter = express.Router()

employeeRouter.get('/list',employeesList)
employeeRouter.post('/login',loginEmployee)
employeeRouter.get('/appointments',authService,appointmentsService)

export default employeeRouter