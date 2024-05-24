import express from 'express'

import path from 'path'
import { orderdetailController } from '~/controllers/orderdetailController'
// eslint-disable-next-line no-undef



const Router = express.Router()

Router.route('/')
  .post( orderdetailController.createNew)


Router.route('/:id')
  .get(orderdetailController.getDetails)
//   .delete(productController.deleteProduct)

export const orderdetailRoute = Router