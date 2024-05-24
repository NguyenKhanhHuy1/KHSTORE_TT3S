import express from 'express'
import { StatusCodes } from 'http-status-codes'
import multer from 'multer'
import path from 'path'
import { employeeController } from '~/controllers/employeeController'
import { employeeValidation } from '~/validations/employeeValidation'
// eslint-disable-next-line no-undef



const Router = express.Router()

Router.route('/')
  .get(employeeController.getAllEmployees)
  .post( employeeController.createNew)


Router.route('/:id')
  .get(employeeController.getDetails)
  .put(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee)

Router.route('/search/:searchValue')
  .get(employeeController.Search)

export const employeeRoute = Router