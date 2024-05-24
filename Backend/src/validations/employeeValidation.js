import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    employeeName: Joi.string().required().min(1).max(255).trim().strict().messages({
      'any.required': 'employeeName is a required',
      'string.empty': 'employeeName cannot be an empty field',
      'string.min': 'employeeName length must be at least 1 characters long',
      'string.max': 'employeeName length must be less than or equal to 255 characters long',
      'string.trim': 'employeeName must not have leading or trailing whitespace'
    }),
    birthDate: Joi.string().required().min(1).max(255).trim().strict().messages({
      'any.required': 'birthDate is a required',
      'string.empty': 'birthDate cannot be an empty field',
      'string.min': 'birthDate length must be at least 1 characters long',
      'string.max': 'birthDate length must be less than or equal to 255 characters long',
      'string.trim': 'birthDate must not have leading or trailing whitespace'
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
    }),
    password: Joi.string().required().min(1).max(50).trim().strict().messages({
      'any.required': 'password is a required',
      'string.empty': 'password cannot be an empty field',
      'string.min': 'password length must be at least 1 characters long',
      'string.max': 'password length must be less than or equal to 50 characters long',
      'string.trim': 'password  must not have leading or trailing whitespace'
    }),
    photo: Joi.string().required().min(1).max(50).trim().strict().messages({
      'any.required': 'password is a required',
      'string.empty': 'password cannot be an empty field',
      'string.min': 'password length must be at least 1 characters long',
      'string.max': 'password length must be less than or equal to 50 characters long',
      'string.trim': 'password  must not have leading or trailing whitespace'
    }),
    role: Joi.string().required().min(1).max(50).trim().strict().messages({
      'any.required': 'role is a required',
      'string.empty': 'role cannot be an empty field',
      'string.min': 'role length must be at least 1 characters long',
      'string.max': 'role length must be less than or equal to 50 characters long',
      'string.trim': 'role  must not have leading or trailing whitespace'
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

export const employeeValidation = {
  createNew
}