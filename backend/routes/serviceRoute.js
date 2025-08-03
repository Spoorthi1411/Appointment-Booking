import express from 'express'
import { employeesList, loginEmployee} from '../controllers/BusinessListController.js'

const employeeRouter = express.Router()

employeeRouter.get('/list',employeesList)
employeeRouter.post('/login',loginEmployee)

export default employeeRouter