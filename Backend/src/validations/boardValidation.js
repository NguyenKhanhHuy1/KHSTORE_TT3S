
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is a required',
      'string.empty': 'Title cannot be an empty field',
      'string.min': 'Title length must be at least 3 characters long',
      'string.max': 'Title length must be less than or equal to 50 characters long',
      'string.trim': 'Title must not have leading or trailing whitespace'


    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })
  try {


    //chi đinh abortEarly false de truong hop co nhieu loi thi tra ve tat ca
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    ///chay dung thi next controller
    next()


  } catch (error) {
    // console.log(error)
    // console.log(new Error(error))
    const errMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errMessage)
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //     errors: new Error(error).message
    // })
    next(customError)
  }

}
export const boardValidation = {
  createNew
}