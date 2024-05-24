import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { supplierService } from '~/services/supplierService'
const getAllSuppliers = async (req, res, next) => {
  try {
    const suppliers = await supplierService.getAllSuppliers()
    res.status(StatusCodes.OK).json(suppliers)
  } catch (error) {
    next(error)
  }
}
const Search = async (req, res, next) => {
  try {
    const searchValue = req.params.searchValue
    const suppliers = await supplierService.Search(searchValue)
    res.status(StatusCodes.OK).json(suppliers)
  } catch (error) {
    next(error)
  }
}

const createNew = async (req, res, next) => {
  try {
    const createSupplier = await supplierService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createSupplier)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const supplierId = req.params.id
    const supplier = await supplierService.getDetails(supplierId)
    res.status(StatusCodes.OK).json(supplier)
  } catch (error) {
    next(error)
  }
}

const updateSupplier = async (req, res, next) => {
  try {
    const supplierId = req.params.id
    await supplierService.updateSupplier(supplierId, req.body)
    res.status(StatusCodes.NO_CONTENT).send()
  } catch (error) {
    next(error)
  }
}

const deleteSupplier = async (req, res, next) => {
  try {
    const supplierId = req.params.id
    await supplierService.deleteSupplier(supplierId)
    res.status(StatusCodes.NO_CONTENT).send()
  } catch (error) {
    next(error)
  }
}


export const supplierController = {
  createNew,
  getDetails,
  getAllSuppliers,
  deleteSupplier,
  updateSupplier,
  Search
}