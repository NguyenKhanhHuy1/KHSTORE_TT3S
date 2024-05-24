import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { customerValidation } from '~/validations/customerValidation'
import { customerController } from '~/controllers/customerController'

const Router = express.Router()

Router.route('/')
    .get(customerController.getAllCustomers)
    .post(customerValidation.createNew, customerController.createNew)


Router.route('/:id')
    .get(customerController.getDetails)
    .put(customerController.updateCustomer)
    .delete(customerController.deleteCustomer)

export const customerRoute = Router