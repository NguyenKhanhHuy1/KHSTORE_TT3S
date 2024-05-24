
import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { ObjectId } from 'mongodb'
import { productModel } from './productModel'


const ORDERDETAIL_COLLECTION_NAME = 'OrderDetails'

const ORDERDETAIL_COLLECTION_SCHEMA = Joi.object({
  orderId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  quantity: Joi.number().required().min(1),
  price: Joi.number().required().min(1),
  productId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)

})
const validateBeforeCreateOrder = async (data) => {
  return await ORDERDETAIL_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreateOrder(data)
    const newOrderDetail = {
      ...validData,
      orderId: new ObjectId(validData.orderId),
      productId: new ObjectId(validData.productId)
    }
    return await GET_DB().collection(ORDERDETAIL_COLLECTION_NAME).insertOne(newOrderDetail)
  } catch (error) {
    throw new Error(error)
  }
}
const getOrderDetails = async (orderId) => {
  try {
    const orderDetails = await GET_DB().collection(ORDERDETAIL_COLLECTION_NAME).aggregate([
      { $match: {
        _id: new ObjectId(orderId)
      } },
      { $lookup: {
        from: productModel.PRODUCT_COLLECTION_NAME,
        localField: 'productId',
        foreignField: '_id',
        as: 'Product'
      } }
    ]).toArray()
    return orderDetails[0] || {}
  } catch (error) {
    throw new Error(error)
  }
}

export const orderDetailModel = {
  ORDERDETAIL_COLLECTION_NAME,
  ORDERDETAIL_COLLECTION_SCHEMA,
  createNew,
  getOrderDetails
}