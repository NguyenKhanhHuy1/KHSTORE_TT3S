/* eslint-disable no-useless-catch */
import { supplierModel } from '~/models/supplierModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { productModel } from '~/models/productModel'
import { categoryModel } from '~/models/categoryModel'

const getAllSuppliers = async () => {
  try {
    const allSuppliers = await supplierModel.getAllSuppliers()
    return allSuppliers
  } catch (error) {
    throw error
  }
}
const Search = async (searchValue) => {
  try {
    const allEmployees = await supplierModel.Search(searchValue)
    return allEmployees
  } catch (error) {
    throw error
  }
}

const createNew = async (reqBody) => {
  try {
    const newSupplier = {
      ...reqBody
    }
    const createSupplier = await supplierModel.creartNew(newSupplier)
    const getNewSupplier = await supplierModel.getDetails(createSupplier.insertedId)
    return getNewSupplier
  } catch (error) {
    throw error
  }
}

const getDetails = async (supplierId) => {
  try {
    const supplier = await supplierModel.getDetails(supplierId)
    if (!supplier) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'supplier not found')
    }
    return supplier
  } catch (error) {
    throw error
  }
}
const updateSupplier = async (id, reqBody) => {
  try {
    const newSupplier = {
      ...reqBody
    }
    const updateSupplier = await supplierModel.updateSupplier(id, newSupplier)
    console.log(updateSupplier)
    return { message: 'Supplier updated successfully' }
  } catch (error) {
    throw error
  }
}
const deleteSupplier = async (supplierId) => {
  try {
    const result = await supplierModel.deleteSupplier(supplierId)

    const products = await productModel.getProductsBySupplierId(supplierId);

    await productModel.deleteProductbySupplierId(supplierId)

    console.log(products)
    for (const product of products) {
      await categoryModel.pullProductIds(product);
    }
    console.log(result)
    return result
  } catch (error) {
    throw error
  }
}

export const supplierService = {
  getAllSuppliers,
  createNew,
  getDetails,
  updateSupplier,
  deleteSupplier,
  Search

}