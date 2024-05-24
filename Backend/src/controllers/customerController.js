import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { customerService } from '~/services/customerService'

const getAllCustomers = async (req, res, next) => {
  try {
    const customers = await customerService.getAllCustomers()
    res.status(StatusCodes.OK).json(customers)
  } catch (error) {
    next(error)
  }
}

const createNew = async (req, res, next) => {
  try {
    const createCustomer = await customerService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createCustomer)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const customerId = req.params.id
    const customer = await customerService.getDetails(customerId)
    res.status(StatusCodes.OK).json(customer)
  } catch (error) {
    next(error)
  }
}

const updateCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.id
    await customerService.updateCustomer(customerId, req.body)
    res.status(StatusCodes.NO_CONTENT).send()
  } catch (error) {
    next(error)
  }
}

const deleteCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.id
    await customerService.deleteCustomer(customerId)
    res.status(StatusCodes.NO_CONTENT).send()
  } catch (error) {
    next(error)
  }
}


export const customerController = {
  createNew,
  getDetails,
  getAllCustomers,
  updateCustomer,
  deleteCustomer
}