/* eslint-disable no-useless-catch */
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { orderDetailModel } from '~/models/orderDetailModel'
import { orderModel } from '~/models/orderModel'


const createNew = async (reqBody) => {
  try {
    const newOrderDetail = {
      ...reqBody
    }
    const createOrderDetails = await orderDetailModel.createNew(newOrderDetail)
    const getnewOrderDetails = await orderDetailModel.getOrderDetails(createOrderDetails.insertedId)
    if (getnewOrderDetails) {
      await orderModel.pushOrderdetailIds(getnewOrderDetails)
    }
    return getnewOrderDetails
  } catch (error) {
    throw error
  }
}

const getDetails = async (id) => {
  try {
    const orderDetail = await orderDetailModel.getOrderDetails(id)
    if (!orderDetail) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'orderdetail not found')
    }
    return orderDetail
  } catch (error) {
    throw error
  }
}

export const orderDetailService = {
  createNew,
  getDetails


}