import express from 'express'
import { provinceController } from '~/controllers/provinceController'


const Router = express.Router()

Router.route('/')
  .get(provinceController.getAllProvinces)
  .post(provinceController.createNew)

export const provinceRouter = Router