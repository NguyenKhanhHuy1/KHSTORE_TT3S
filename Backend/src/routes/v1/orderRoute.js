import express from 'express'

import { orderController } from '~/controllers/orderController'
import path from 'path'
// eslint-disable-next-line no-undef



const Router = express.Router()

Router.route('/')
  .get(orderController.getAllOrders)
  .post( orderController.createNew)

Router.route('/search').get(orderController.Search)

Router.route('/:id')
  .get(orderController.getDetails)
  .put(orderController.updateOrder)
//   .delete(productController.deleteProduct)

export const orderRoute = Router