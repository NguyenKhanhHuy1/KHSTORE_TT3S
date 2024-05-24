import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
const createNew = async (req, res, next) => {

  const correctCondition = Joi.object({
    categoryName: Joi.string().required().min(1).max(255).trim().strict().messages({
      'any.required': 'categoryName is a required',
      'string.empty': 'categoryName cannot be an empty field',
      'string.min': 'categoryName length must be at least 1 characters long',
      'string.max': 'categoryName length must be less than or equal to 255 characters long',
      'string.trim': 'categoryName must not have leading or trailing whitespace'
    }),
    Description: Joi.string().required().min(1).max(255).trim().strict().messages({
      'any.required': 'Description is a required',
      'string.empty': 'Description cannot be an empty field',
      'string.min': 'Description length must be at least 1 characters long',
      'string.max': 'Description length must be less than or equal to 255 characters long',
      'string.trim': 'Description must not have leading or trailing whitespace'
    })
  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()


  } catch (error) {

    const errMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errMessage)
    next(customError)
  }
}


export const categoryValidation = {
  createNew
}