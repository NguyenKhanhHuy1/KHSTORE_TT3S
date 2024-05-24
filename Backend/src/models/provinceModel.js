import Joi, { date } from 'joi'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'

const PROVINCE_COLLECTION_NAME= 'Provinces'

const PROVINCE_COLLECTION_SCHEMA = Joi.object({
  provinceName: Joi.string().required().min(1).max(255).trim().strict()
})

const validateBeforeCreate = async (data) => {
  return await PROVINCE_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    return await GET_DB().collection(PROVINCE_COLLECTION_NAME).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}

const getAllProvinces = async () => {
  try {
    const allProvince = await GET_DB().collection(PROVINCE_COLLECTION_NAME).find().toArray()
    return allProvince
  } catch (error) {
    throw new Error(error)
  }
}

export const provinceModel = {
  PROVINCE_COLLECTION_NAME,
  PROVINCE_COLLECTION_SCHEMA,
  createNew,
  getAllProvinces
}