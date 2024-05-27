/* eslint-disable no-useless-catch */
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { orderModel } from '~/models/orderModel'
import { cloneDeep} from 'lodash'


const createNew = async (reqBody) => {
  try {
    const newOrder = {
      ...reqBody
    }
    const createOrder = await orderModel.createNew(newOrder)
    return createOrder
  } catch (error) {
    throw error
  }
}
const getAllOrders = async (reqBody) => {
  try {
    const allOrders = await orderModel.getAllOrders()
    return allOrders
  } catch (error) {
    throw error
  }
}
const Search = async (searchValue, status, start, end) => {
  try {
    const allProducts = await orderModel.Search(searchValue, status, start, end);
    return allProducts;
  } catch (error) {
    console.error('Error in Search service:', error);
    throw error;
  }
};
const getDetails = async (id) => {
  try {
    const orderDetail = await orderModel.getDetails(id)
    if (!orderDetail) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'orderdetail not found')
    }
    const resOrders = cloneDeep(orderDetail)
    resOrders.OrderDetails.forEach(OrderDetail => {
      OrderDetail.Products = resOrders.Products.filter(product => product._id.toString() === OrderDetail.productId.toString())
    })
    delete resOrders.Products
    return resOrders
  } catch (error) {
    throw error
  }
}
const updateOrder = async (id, reqBody) => {
  try {
    const newOrder = {
      ...reqBody
    }
    const updateOrder = await orderModel.updateOrder(id, newOrder)
    console.log(updateOrder)
    return { message: 'Order updated successfully' }
  } catch (error) {
    throw error
  }
}
export const orderService = {
  createNew,
  getAllOrders,
  getDetails,
  updateOrder,
  Search

}