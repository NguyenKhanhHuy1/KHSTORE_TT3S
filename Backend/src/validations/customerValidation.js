import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    customerName: Joi.string().required().min(1).max(255).trim().strict().messages({
      'any.required': 'customerName is a required',
      'string.empty': 'customerName cannot be an empty field',
      'string.min': 'customerName length must be at least 1 characters long',
      'string.max': 'customerName length must be less than or equal to 255 characters long',
      'string.trim': 'customerName must not have leading or trailing whitespace'
    }),
    contactName: Joi.string().required().min(1).max(255).trim().strict().messages({
      'any.required': 'contactName is a required',
      'string.empty': 'contactName cannot be an empty field',
      'string.min': 'contactName length must be at least 1 characters long',
      'string.max': 'contactName length must be less than or equal to 255 characters long',
      'string.trim': 'contactName must not have leading or trailing whitespace'
    }),
    province: Joi.string().required().min(1).max(255).trim().strict().messages({
      'any.required': 'province is a required',
      'string.empty': 'province cannot be an empty field',
      'string.min': 'province length must be at least 1 characters long',
      'string.max': 'province length must be less than or equal to 255 characters long',
      'string.trim': 'province must not have leading or trailing whitespace'
    }),
    address: Joi.string().required().min(1).max(255).trim().strict().messages({
      'any.required': 'address is a required',
      'string.empty': 'address cannot be an empty field',
      'string.min': 'address length must be at least 1 characters long',
      'string.max': 'address length must be less than or equal to 255 characters long',
      'string.trim': 'address  must not have leading or trailing whitespace'
    }),
    phone: Joi.string().required().min(1).max(255).trim().strict().messages({
      'any.required': 'phone is a required',
      'string.empty': 'phone cannot be an empty field',
      'string.min': 'phone length must be at least 1 characters long',
      'string.max': 'phone length must be less than or equal to 255 characters long',
      'string.trim': 'phone  must not have leading or trailing whitespace'
    }),
    email: Joi.string().required().min(1).max(50).trim().strict().messages({
      'any.required': 'email is a required',
      'string.empty': 'email cannot be an empty field',
      'string.min': 'email length must be at least 1 characters long',
      'string.max': 'email length must be less than or equal to 50 characters long',
      'string.trim': 'email  must not have leading or trailing whitespace'
    })
  })
  try {

    //chi đinh abortEarly false de truong hop co nhieu loi thi tra ve tat ca
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    ///chay dung thi next controller
    next()


  } catch (error) {

    const errMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errMessage)
    next(customError)
  }

}
export const customerValidation = {
  createNew
}