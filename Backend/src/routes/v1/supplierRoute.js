import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { supplierController } from '~/controllers/supplierController'
import { supplierValidation } from '~/validations/supplierValidation'

const Router = express.Router()

Router.route('/')
  .get(supplierController.getAllSuppliers)
  .post( supplierController.createNew)


Router.route('/:id')
  .get(supplierController.getDetails)
  .put(supplierController.updateSupplier)
  .delete(supplierController.deleteSupplier)

Router.route('/search/:searchValue')
  .get(supplierController.Search)

export const supplierRoute = Router