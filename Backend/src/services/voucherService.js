/* eslint-disable no-useless-catch */
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { VoucherModel } from '~/models/voucherModel'

const createNew = async (reqBody) => {
  try {
    const newdata = {
      ...reqBody
    }
    const createdata = await VoucherModel.creartNew(newdata)
    return createdata
  } catch (error) {
    throw error
  }
}
const getDetails = async (vouchercode) => {
  try {
    const data = await VoucherModel.getDetails(vouchercode)
    if (!data) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'voucher not found')
    }
    return data
  } catch (error) {
    throw error
  }
}


export const voucherService = {
  createNew,
  getDetails

}