import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { categoryController } from '~/controllers/categoryController'
import { categoryValidation } from '~/validations/categoryValidation'


const Router = express.Router()

Router.route('/')
  .get( categoryController.getAllCategories)
  .post(categoryController.creartNew)


Router.route('/:id')
  .get(categoryController.getDetails)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory)

Router.route('/search/:searchValue')
  .get(categoryController.Search)

export const categoriesRoute = Router