import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
import { categoryModel } from './categoryModel'
import { supplierModel } from './supplierModel'

const PRODUCT_COLLECTION_NAME ='Products'

const PRODUCT_COLLECTION_SCHEMA = Joi.object({
  productName:Joi.string().required().min(1).max(255).trim().strict(),
  productDescription: Joi.string().allow('').min(1).max(255).trim().strict(),
  unit: Joi.string().required().min(1).max(50).trim().strict(),
  price: Joi.number().required().min(1),
  photo: Joi.string().min(1).max(10000).trim().strict(),
  categoryId: Joi.string().required().min(1).max(255).trim().strict(),
  supplierId: Joi.string().required().min(1).max(255).trim().strict()

})
const validateBeforeCreate = async (data) => {
  return await PRODUCT_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const newData = {
      ...validData,
      categoryId: new ObjectId(validData.categoryId),
      supplierId: new ObjectId(validData.supplierId)
    }
    return await GET_DB().collection(PRODUCT_COLLECTION_NAME).insertOne(newData)
  } catch (error) {
    throw new Error(error)
  }
}
const updateProduct = async (id, data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const newData = {
      ...validData,
      categoryId: new ObjectId(validData.categoryId),
      supplierId: new ObjectId(validData.supplierId)
    }
    return await GET_DB().collection(PRODUCT_COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) }, // Filter criteria: customer ID
      { $set: newData }
    )
  } catch (error) {
    throw new Error(error)
  }
}
const getAllProducts = async () => {
  try {
    const allProducts = await GET_DB().collection(PRODUCT_COLLECTION_NAME).aggregate([
      { $lookup: {
        from: categoryModel.CATEGORY_COLLECTION_NAME,
        localField: 'categoryId',
        foreignField: '_id',
        as: 'Category'
      } },
      { $lookup: {
        from: supplierModel.SUPPLIER_COLLECTION_NAME,
        localField: 'supplierId',
        foreignField: '_id',
        as: 'Supplier'
      } },
      { $sort: { productName: 1 } }
    ]).toArray()
    return allProducts
  } catch (error) {
    throw new Error(error)
  }
}
const Search = async (searchValue, categoryId, supplierId) => {
  try {
    const matchQuery = {}

    if (searchValue) {
      matchQuery.productName = { $regex: searchValue, $options: 'i' }
    }
    if (categoryId) {
      matchQuery.categoryId = new ObjectId(categoryId)
    }
    if (supplierId) {
      matchQuery.supplierId = new ObjectId(supplierId)
    }

    const allProducts = await GET_DB().collection(PRODUCT_COLLECTION_NAME).aggregate([
      {
        $match: matchQuery
      },
      { $lookup: {
        from: categoryModel.CATEGORY_COLLECTION_NAME,
        localField: 'categoryId',
        foreignField: '_id',
        as: 'Category'
      } },
      { $lookup: {
        from: supplierModel.SUPPLIER_COLLECTION_NAME,
        localField: 'supplierId',
        foreignField: '_id',
        as: 'Supplier'
      } },
      {
        $sort: { productName: 1 }
      }
    ]).toArray()
    return allProducts
  } catch (error) {
    console.error('Error in Search model:', error)
    throw error
  }
}
const getDetails = async (id) => {
  try {
    const result = await GET_DB().collection(PRODUCT_COLLECTION_NAME).aggregate([
      { $match: {
        _id: new ObjectId(id)
      } },
      { $lookup: {
        from: categoryModel.CATEGORY_COLLECTION_NAME,
        localField: 'categoryId',
        foreignField: '_id',
        as: 'Category'
      } },
      { $lookup: {
        from: supplierModel.SUPPLIER_COLLECTION_NAME,
        localField: 'supplierId',
        foreignField: '_id',
        as: 'Supplier'
      } }
    ]).toArray()
    return result[0] || {}
  } catch (error) {
    throw new Error(error)
  }
}
const getProductsBySupplierId = async (supplierId) => {
  try {
    const products = await GET_DB().collection(PRODUCT_COLLECTION_NAME).find({ supplierId: new ObjectId(supplierId) }).toArray()
    return products
  } catch (error) {
    throw new Error(error.message)
  }
}
const getProductsByCategoryId = async (categoryId) => {
  try {
    const products = await GET_DB().collection(PRODUCT_COLLECTION_NAME).find({ categoryId: new ObjectId(categoryId) }).toArray()
    return products
  } catch (error) {
    throw new Error(error.message)
  }
}

const deleteProduct = async (id) => {
  try {
    const result = await GET_DB().collection(PRODUCT_COLLECTION_NAME).deleteOne(
      { _id: new ObjectId(id) }
    )
    return result
  } catch (error) {
    throw new Error(error.message)
  }
}
const deleteProductbyCategoryId = async (id) => {
  try {
    const result = await GET_DB().collection(PRODUCT_COLLECTION_NAME).deleteMany(
      { categoryId: new ObjectId(id) }
    )
    return result
  } catch (error) {
    throw new Error(error.message)
  }
}
const deleteProductbySupplierId = async (id) => {
  try {
    const result = await GET_DB().collection(PRODUCT_COLLECTION_NAME).deleteMany(
      { supplierId: new ObjectId(id) }
    )
    return result
  } catch (error) {
    throw new Error(error.message)
  }
}
export const productModel = {
  PRODUCT_COLLECTION_NAME,
  PRODUCT_COLLECTION_SCHEMA,
  createNew,
  getDetails,
  getAllProducts,
  updateProduct,
  deleteProduct,
  deleteProductbyCategoryId,
  deleteProductbySupplierId,
  getProductsBySupplierId,
  getProductsByCategoryId,
  Search


}