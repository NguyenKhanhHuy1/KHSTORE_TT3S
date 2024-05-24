/* eslint-disable no-const-assign */
import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
import { provinceModel } from './provinceModel'
import { productModel } from './productModel'

//define Conllection (Name & Schema)
const SUPPLIER_COLLECTION_NAME = 'Suppliers'

const SUPPLIER_COLLECTION_SCHEMA = Joi.object({
  supplierName: Joi.string().required().min(1).max(255).trim().strict(),
  contactName: Joi.string().allow('').min(1).max(255).trim().strict(),
  // province: Joi.string().required().min(1).max(255).trim().strict(),
  provinceId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  address: Joi.string().allow('').min(1).max(255).trim().strict(),
  phone: Joi.string().required().min(1).max(255).trim().strict(),
  email: Joi.string().required().min(1).max(50).trim().strict(),
  ProductIds:  Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([])
})

const validateBeforeCreate = async (data) => {
  return await SUPPLIER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const getAllSuppliers = async () => {
  try {
    const allCustomers = await GET_DB().collection(SUPPLIER_COLLECTION_NAME).aggregate([
      { $lookup: {
        from: provinceModel.PROVINCE_COLLECTION_NAME,
        localField: 'provinceId',
        foreignField: '_id',
        as: 'Province'
      } }
    ]).toArray()
    return allCustomers
  } catch (error) {
    throw new Error(error)
  }
}
const Search = async (searchValue) => {
  try {
    const allsuppliers = await GET_DB().collection(SUPPLIER_COLLECTION_NAME).aggregate([
      {
        $match: {
          supplierName: { $regex: searchValue, $options: 'i' }
        }
      },
      {
        $lookup: {
          from: provinceModel.PROVINCE_COLLECTION_NAME,
          localField: 'provinceId',
          foreignField: '_id',
          as: 'Province'
        }
      },
      {
        $sort: { supplierName: 1 }
      }
    ]).toArray();
    return allsuppliers
  } catch (error) {
    throw new Error(error)
  }
}

const creartNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)

    const newdata = {
      ...validData,
      provinceId: new ObjectId(validData.provinceId)
    }


    return await GET_DB().collection(SUPPLIER_COLLECTION_NAME).insertOne(newdata)
  } catch (error) {
    throw new Error(error)
  }
}

const getDetails = async (id) => {
  try {
    const result = await GET_DB().collection(SUPPLIER_COLLECTION_NAME).aggregate([
      { $match: {
        _id: new ObjectId(id)
      } },
      { $lookup: {
        from: provinceModel.PROVINCE_COLLECTION_NAME,
        localField: 'provinceId',
        foreignField: '_id',
        as: 'Province'
      } }
    ]).toArray()
    return result[0] || {}
  } catch (error) {
    throw new Error(error)
  }
}

const updateSupplier = async (id, data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const newdata = {
      ...validData,
      provinceId: new ObjectId(validData.provinceId)
    }
    return await GET_DB().collection(SUPPLIER_COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) }, // Filter criteria: customer ID
      { $set: newdata }
    )
  } catch (error) {
    throw new Error(error)
  }
}
const deleteSupplier = async (id) => {
  try {
    const result = await GET_DB().collection(SUPPLIER_COLLECTION_NAME).deleteOne(
      { _id: new ObjectId(id) }
    )

    return result
  } catch (error) {
    throw new Error(error.message)
  }
}
const pushProductIds = async (newProducts) => {
  try {
    const result = await GET_DB().collection(SUPPLIER_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(newProducts.supplierId) },
      {
        $push: {
          ProductIds: { _id: new ObjectId(newProducts._id) }
        }
      },
      { returnDocument: 'after' }
    )
    return result.value || null
  } catch (error) {
    throw new Error(error)
  }
}
const pullProductIds = async (newProducts) => {
  try {
    const result = await GET_DB().collection(SUPPLIER_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(newProducts.supplierId) },
      {
        $pull: {
          ProductIds: { _id: new ObjectId(newProducts._id) }
        }
      },
      { returnDocument: 'after' }
    )
    return result.value || null
  } catch (error) {
    throw new Error(error)
  }
}


export const supplierModel = {
  SUPPLIER_COLLECTION_NAME,
  SUPPLIER_COLLECTION_SCHEMA,
  creartNew,
  getDetails,
  getAllSuppliers,
  deleteSupplier,
  updateSupplier,
  pushProductIds,
  pullProductIds,
  Search

}