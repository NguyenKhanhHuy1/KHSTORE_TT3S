import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
import { NUMBER, OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { productModel } from './productModel'


const CATEGORY_COLLECTION_NAME = 'Categories'

const CATEGORY_COLLECTION_SCHEMA = Joi.object({
  categoryName: Joi.string().required().min(1).max(255).trim().strict(),
  Description: Joi.string().allow(''),

  ProductIds:  Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([])
})

const validateBeforeCreate = async (data) => {
  return await CATEGORY_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const getAllCategories = async () => {
  try {
    const allCustomers = await GET_DB().collection(CATEGORY_COLLECTION_NAME).find().sort({ categoryName: 1 }).toArray()
    return allCustomers
  } catch (error) {
    throw new Error(error)
  }
}

const Search = async (searchValue) => {
  try {
    const allcategories = await GET_DB().collection(CATEGORY_COLLECTION_NAME).find(
      { categoryName: { $regex: searchValue, $options: 'i' } }
    ).sort({ categoryName: 1 }).toArray()
    return allcategories
  } catch (error) {
    throw new Error(error)
  }
}

const creartNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    return await GET_DB().collection(CATEGORY_COLLECTION_NAME).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}
const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(CATEGORY_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}
const getDetails = async (id) => {
  try {
    const result = await GET_DB().collection(CATEGORY_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const updateCategory = async (id, data) => {
  try {
    const validData = await validateBeforeCreate(data)
    return await GET_DB().collection(CATEGORY_COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) }, // Filter criteria: customer ID
      { $set: validData }
    )
  } catch (error) {
    throw new Error(error)
  }
}
const deleteCategory = async (id) => {
  try {
    const result = await GET_DB().collection(CATEGORY_COLLECTION_NAME).deleteOne(
      { _id: new ObjectId(id) }
    )

    return result
  } catch (error) {
    throw new Error(error.message)
  }
}
const pushProductIds = async (newProducts) => {
  try {
    const result = await GET_DB().collection(CATEGORY_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(newProducts.categoryId) },
      {
        $push: {
          ProductIds: { _id: new ObjectId(newProducts._id) }
        }
      },
      { returnDocument: 'after' }
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}
const pullProductIds = async (newProducts) => {
  try {
    const result = await GET_DB().collection(CATEGORY_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(newProducts.categoryId) },
      {
        $pull: {
          ProductIds: { _id: new ObjectId(newProducts._id) }
        }
      },
      { returnDocument: 'after' }
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}


export const categoryModel = {
  CATEGORY_COLLECTION_NAME,
  CATEGORY_COLLECTION_SCHEMA,
  creartNew,
  findOneById,
  getDetails,
  getAllCategories,
  deleteCategory,
  updateCategory,
  pushProductIds,
  pullProductIds,
  Search
}