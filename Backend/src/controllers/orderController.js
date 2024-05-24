import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { orderService } from '~/services/orderService'

const createNew = async (req, res, next) => {
  try {
    const createOrder = await orderService.createNew(req.body)

    
    res.status(StatusCodes.CREATED).json(createOrder)
  } catch (error) {
    next(error)
  }
}
const getAllOrders = async (req, res, next) => {
  try {
    const allOrders = await orderService.getAllOrders()
    res.status(StatusCodes.OK).json(allOrders)
  } catch (error) {
    next(error)
  }
}
const getDetails = async (req, res, next) => {
  try {
    const orderId = req.params.id
    const orderdetail = await orderService.getDetails(orderId)
    res.status(StatusCodes.OK).json(orderdetail)
  } catch (error) {
    next(error)
  }
}
const updateOrder = async (req, res, next) => {
  try {
    const OrderId = req.params.id
    await orderService.updateOrder(OrderId, req.body)
    res.status(StatusCodes.NO_CONTENT).send()
  } catch (error) {
    next(error)
  }
}



export const orderController = {
  createNew,
  getAllOrders,
  getDetails,
  updateOrder

}