
import express from 'express'

import { customerRoute } from './customerRoute'
import { categoriesRoute } from './categoryRoute'
import { supplierRoute } from './supplierRoute'
import { productRoute } from './productRoute'
import { provinceRouter } from './provinceRoute'
import { employeeRoute } from './employeeRoute'
import { employeeController } from '~/controllers/employeeController'
import { orderRoute } from './orderRoute'
import { orderdetailRoute } from './orderdetailRoute'
import { voucherRoute } from './voucherRoute'
import { authenticateToken } from '../../middlewares/tokenMiddleware'


const Router = express.Router()

Router.use('/customers', authenticateToken, customerRoute)

Router.use('/categories', authenticateToken, categoriesRoute)

Router.use('/suppliers', authenticateToken, supplierRoute)

Router.use('/products', authenticateToken, productRoute)

Router.use('/provinces', authenticateToken, provinceRouter)
Router.use('/employees', authenticateToken, employeeRoute)

Router.use('/login', employeeController.login)

Router.use('/changepassword/:id', authenticateToken, employeeController.changepassword)

Router.use('/orders', authenticateToken, orderRoute),
Router.use('/orderdetails', authenticateToken, orderdetailRoute)

Router.use('/vouchers', authenticateToken, voucherRoute)


export const APIs_V1 = Router