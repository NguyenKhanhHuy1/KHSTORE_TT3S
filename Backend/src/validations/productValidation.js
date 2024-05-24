import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    productName: Joi.string().required().min(1).max(255).trim().strict().messages({
      'any.required': 'productName is a required',
      'string.empty': 'productName cannot be an empty field',
      'string.min': 'productName length must be at least 1 characters long',
      'string.max': 'productName length must be less than or equal to 255 characters long',
      'string.trim': 'productName must not have leading or trailing whitespace'
    }),
    productDescription: Joi.string().required().min(1).max(255).trim().strict().messages({
      'any.required': 'productDescription is a required',
      'string.empty': 'productDescription cannot be an empty field',
      'string.min': 'productDescription length must be at least 1 characters long',
      'string.max': 'productDescription length must be less than or equal to 255 characters long',
      'string.trim': 'productDescription must not have leading or trailing whitespace'
    }),
    unit: Joi.string().required().min(1).max(255).trim().strict().messages({
      'any.required': 'unit is a required',
      'string.empty': 'unit cannot be an empty field',
      'string.min': 'unit length must be at least 1 characters long',
      'string.max': 'unit length must be less than or equal to 255 characters long',
      'string.trim': 'unit must not have leading or trailing whitespace'
    }),
    price: Joi.number().required().min(1).max(255).trim().strict().messages({
      'any.required': 'price is a required',
      'string.empty': 'price cannot be an empty field',
      'string.min': 'price length must be at least 1 characters long',
      'string.max': 'price length must be less than or equal to 255 characters long',
      'string.trim': 'price  must not have leading or trailing whitespace'
    }),
    photo: Joi.string().required().min(1).max(255).trim().strict().messages({
      'any.required': 'photo is a required',
      'string.empty': 'photo cannot be an empty field',
      'string.min': 'photo length must be at least 1 characters long',
      'string.max': 'photo length must be less than or equal to 255 characters long',
      'string.trim': 'photo  must not have leading or trailing whitespace'
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
export const productValidation = {
  createNew
}