/* eslint-disable no-useless-catch */
import { customerModel } from '~/models/customerModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const getAllCustomers = async () => {
  try {
    const allCustomers = await customerModel.getAllCustomers()
    return allCustomers
  } catch (error) {
    throw error
  }
}

const createNew = async (reqBody) => {
  try {
    const newCustomer = {
      ...reqBody
      // slug: slugify(reqBody.title)
    }
    const createCustomer = await customerModel.createNew(newCustomer)
    console.log(createCustomer)

    const getNewCustomer = await customerModel.findOneById(createCustomer.insertedId)
    console.log(getNewCustomer)
    return getNewCustomer
  } catch (error) {
    throw error
  }
}

const getDetails = async (customerId) => {
  try {
    const customer = await customerModel.getDetails(customerId)
    if (!customer) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'customer not found')
    }
    return customer
  } catch (error) {
    throw error
  }
}

const updateCustomer = async (id, reqBody) => {
  try {
    const newCustomer = {
      ...reqBody
    }
    const updateCustomer = await customerModel.updateCustomer(id, newCustomer)
    console.log(updateCustomer)
    return { message: 'Customer updated successfully' }
  } catch (error) {
    throw error
  }
}
const deleteCustomer = async (customerId) => {
  try {
    const result = await customerModel.deleteCustomer(customerId)
    console.log(result)
    return result
  } catch (error) {
    throw error
  }
}

export const customerService = {
  createNew,
  getDetails,
  getAllCustomers,
  updateCustomer,
  deleteCustomer
}