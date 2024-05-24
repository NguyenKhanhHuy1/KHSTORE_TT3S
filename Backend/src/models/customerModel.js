
import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'

//define Conllection (Name & Schema)
const CUSTOMER_COLLECTION_NAME = 'Customer'

const CUSTOMER_COLLECTION_SCHEMA = Joi.object({
  customerName: Joi.string().required().min(1).max(255).trim().strict(),
  contactName: Joi.string().required().min(1).max(255).trim().strict(),
  province: Joi.string().required().min(1).max(255).trim().strict(),
  address: Joi.string().required().min(1).max(255).trim().strict(),
  phone: Joi.string().required().min(1).max(255).trim().strict(),
  email: Joi.string().required().min(1).max(50).trim().strict()
})

const validateBeforeCreate = async (data) => {
  return await CUSTOMER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const getAllCustomers = async () => {
  try {
    const allCustomers = await GET_DB().collection(CUSTOMER_COLLECTION_NAME).find().toArray()
    return allCustomers
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    return await GET_DB().collection(CUSTOMER_COLLECTION_NAME).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}
const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(CUSTOMER_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}
const getDetails = async (id) => {
  try {
    const result = await GET_DB().collection(CUSTOMER_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const updateCustomer = async (id, data) => {
  try {
    const validData = await validateBeforeCreate(data)
    return await GET_DB().collection(CUSTOMER_COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) }, // Filter criteria: customer ID
      { $set: validData }
    )
  } catch (error) {
    throw new Error(error)
  }
}
const deleteCustomer = async (id) => {
  try {
    const result = await GET_DB().collection(CUSTOMER_COLLECTION_NAME).deleteOne(
      { _id: new ObjectId(id) } // Tiêu chí lọc: ID của khách hàng
    )
    return result
  } catch (error) {
    throw new Error(error.message)
  }
}


export const customerModel = {
  CUSTOMER_COLLECTION_NAME,
  CUSTOMER_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails,
  getAllCustomers,
  updateCustomer,
  deleteCustomer
}