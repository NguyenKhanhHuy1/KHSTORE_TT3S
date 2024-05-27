/* eslint-disable no-console */

import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { NUMBER, OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { ObjectId } from 'mongodb'
import { orderDetailModel } from './orderDetailModel'
import { employeeModel } from './employeeModel'
import { productModel } from './productModel'


const ORDER_COLLECTION_NAME = 'Orders'

const ORDER_COLLECTION_SCHEMA = Joi.object({
  customerName: Joi.string().required().min(1).max(255).trim().strict(),
  customerPhone: Joi.string().required().min(6).max(15).pattern(NUMBER),
  employeeId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  orderTime: Joi.date().required(),
  endTime: Joi.date().allow(null),
  status: Joi.string().required(),
  sumprice: Joi.number().required(),
  discount: Joi.number(),
  finalprice: Joi.number().required(),
  orderDetailIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),
  reason: Joi.string().min(1).max(1000)

})
const validateBeforeCreateOrder = async (data) => {
  return await ORDER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreateOrder(data)
    const newdata = {
      ...validData,
      employeeId: new  ObjectId(validData.employeeId)
    }
    const Order = await GET_DB().collection(ORDER_COLLECTION_NAME).insertOne(newdata)
    const newOrder =  await GET_DB().collection(ORDER_COLLECTION_NAME).findOne(Order.insertedId)
    return newOrder
  } catch (error) {
    throw new Error(error)
  }
}
const getAllOrders = async () => {
  try {
    const allOrders = await GET_DB().collection(ORDER_COLLECTION_NAME).aggregate([
      { $lookup: {
        from: employeeModel.EMPLOYEE_COLLECTION_NAME,
        localField: 'employeeId',
        foreignField: '_id',
        as: 'Employee'
      } },
      { $sort: { orderTime: -1 } }
    ]).toArray()
    return allOrders
  } catch (error) {
    throw new Error(error)
  }
}
const Search = async (searchValue, status, start, end) => {
  try {
    const matchQuery = {}
    if (searchValue) {
      matchQuery.customerName = { $regex: searchValue, $options: 'i' }
    }
    if (status) {
      matchQuery.status = status
    }
    if (start && end) {
      const endOfDay = new Date(end);
      endOfDay.setDate(endOfDay.getDate() + 1);
      matchQuery.orderTime = { $gte: new Date(start), $lte: new Date(endOfDay) }; // Truy vấn từ start đến end
    } else if (end) {
      const endOfDay = new Date(end);
      endOfDay.setDate(endOfDay.getDate() + 1);
      matchQuery.orderTime = { $lte: new Date(endOfDay) }; // Truy vấn từ trước đến end
    } else if (start) {
      matchQuery.orderTime = { $gte: new Date(start), $lte: new Date() }; // Truy vấn từ start đến hiện tại
    } 
    const allOrders = await GET_DB().collection(ORDER_COLLECTION_NAME).aggregate([
      {
        $match: matchQuery
      },
      { $lookup: {
        from: employeeModel.EMPLOYEE_COLLECTION_NAME,
        localField: 'employeeId',
        foreignField: '_id',
        as: 'Employee'
      } },
      { $sort: { orderTime: -1 } }
    ]).toArray()
    return allOrders
  } catch (error) {
    console.error('Error in Search model:', error)
    throw error
  }
}
const getDetails = async (id) => {
  try {
    // const result = await GET_DB().collection(ORDER_COLLECTION_NAME).findOne({
    //   _id: new ObjectId(id)
    // })
    const result = await GET_DB().collection(ORDER_COLLECTION_NAME).aggregate([
      { $match: {
        _id: new ObjectId(id)
      } },
      { $lookup: {
        from: orderDetailModel.ORDERDETAIL_COLLECTION_NAME,
        localField: '_id',
        foreignField: 'orderId',
        as: 'OrderDetails'
      } },
      { $lookup: {
        from: productModel.PRODUCT_COLLECTION_NAME,
        localField: 'OrderDetails.productId',
        foreignField: '_id',
        as: 'Products'
      } },
      { $lookup: {
        from: employeeModel.EMPLOYEE_COLLECTION_NAME,
        localField: 'employeeId',
        foreignField: '_id',
        as: 'Employee'
      } }

    ]).toArray()
    console.log(result)
    return result[0] || {}
  } catch (error) {
    throw new Error(error)
  }
}
const updateOrder = async (id, data) => {
  try {
    const validData = await validateBeforeCreateOrder(data)
    const newdata = {
      ...validData,
      employeeId: new  ObjectId(validData.employeeId)
    }
    return await GET_DB().collection(ORDER_COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) }, // Filter criteria: customer ID
      { $set: newdata }
    )
  } catch (error) {
    throw new Error(error)
  }
}
const pushOrderdetailIds = async (getnewOrderDetails) => {
  try {
    const result = await GET_DB().collection(ORDER_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(getnewOrderDetails.orderId) },
      {
        $push: {
          orderDetailIds: { _id: new ObjectId(getnewOrderDetails._id) }
        }
      },
      { returnDocument: 'after' }
    )

    return result.value || null
  } catch (error) {
    throw new Error(error)
  }
}

export const orderModel = {
  ORDER_COLLECTION_NAME,
  ORDER_COLLECTION_SCHEMA,
  createNew,
  getAllOrders,
  getDetails,
  updateOrder,
  pushOrderdetailIds,
  Search
}