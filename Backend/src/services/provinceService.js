/* eslint-disable no-useless-catch */
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { provinceModel } from '~/models/provinceModel'

const getAllProvinces = async() => {
  try {
    const allProvinces = await provinceModel.getAllProvinces()
    return allProvinces
  } catch (error) {
    throw error
  }
}

const createNew = async(reqBody) => {
  try {
    const newProvince = {
      ...reqBody
    }
    const createProvince = await provinceModel.createNew(newProvince)
    return createProvince
  } catch (error) {
    throw error
  }
}
export const provinceService = {
  createNew,
  getAllProvinces
}