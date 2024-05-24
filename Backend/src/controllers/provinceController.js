import { StatusCodes } from 'http-status-codes'
import { provinceService } from '~/services/provinceService'

const getAllProvinces = async (req, res, next) => {
  try {
    const allProducts = await provinceService.getAllProvinces()
    res.status(StatusCodes.OK).json(allProducts)
  } catch (error) {
    next(error)
  }
}

const createNew = async (req, res, next) => {
  try {
    const createProvince = await provinceService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createProvince)
  } catch (error) {
    next(error)
  }
}

export const provinceController = {
  createNew,
  getAllProvinces
}