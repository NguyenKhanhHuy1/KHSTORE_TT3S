import express from 'express'
import { voucherController } from '~/controllers/voucherController'

const Router = express.Router()

Router.route('/')
  .post(voucherController.createNew)
  Router.route('/:id')
  .get(voucherController.getDetails)



export const voucherRoute = Router