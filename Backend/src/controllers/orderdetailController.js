import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { orderService } from '~/services/orderService'
import { orderDetailService } from '~/services/orderdetailService'

const createNew = async (req, res, next) => {
  try {
    const createOrder = await orderDetailService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createOrder)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const orderId = req.params.id
    const orderdetail = await orderDetailService.getDetails(orderId)
    res.status(StatusCodes.OK).json(orderdetail)
  } catch (error) {
    next(error)
  }
}




export const orderdetailController = {
  createNew,

  getDetails,


}