import express from 'express'
import { employeesList } from '../controllers/BusinessListController.js'

const employeeRouter = express.Router()

employeeRouter.get('/list',employeesList)

export default employeeRouter