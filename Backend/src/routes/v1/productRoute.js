import express from 'express'
import { StatusCodes } from 'http-status-codes'
import multer from 'multer'
import { productController } from '~/controllers/productController'
import { productValidation } from '~/validations/productValidation'
import path from 'path'
// eslint-disable-next-line no-undef



const Router = express.Router()

Router.route('/')
  .get(productController.getAllProducts)
  .post( productController.createNew)

Router.route('/search').get(productController.Search)

Router.route('/:id')
  .get(productController.getDetails)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct)



export const productRoute = Router