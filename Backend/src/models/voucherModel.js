import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'


const VOUCHER_COLLECTION_NAME = 'Vouchers'

const VOUCHER_COLLECTION_SCHEMA =Joi.object({
  voucherName: Joi.string().required().min(1).max(1000).trim().strict(),
  voucherCode: Joi.string().required().min(1).max(1000).trim().strict(),
  discount: Joi.number().required(),
  foundingDate: Joi.date().required(),
  deadlineDate: Joi.date().required()

})
const validateBeforeCreate = async (data) => {
  return await VOUCHER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}
const creartNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const newdata = {
      ...validData
    }
    return await GET_DB().collection(VOUCHER_COLLECTION_NAME).insertOne(newdata)
  } catch (error) {
    throw new Error(error)
  }
}
const getDetails = async (voucherCode) => {
  try {
    const result = await GET_DB().collection(VOUCHER_COLLECTION_NAME).findOne({
      voucherCode: voucherCode
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}


export const VoucherModel = {
  VOUCHER_COLLECTION_NAME,
  VOUCHER_COLLECTION_SCHEMA,
  creartNew,
  getDetails
}