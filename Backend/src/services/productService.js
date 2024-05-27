/* eslint-disable no-useless-catch */
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { productModel } from '~/models/productModel'
import { categoryModel } from '~/models/categoryModel'
import { supplierModel } from '~/models/supplierModel'


const getAllProducts = async () => {
  try {
    const allProducts = await productModel.getAllProducts()
    return allProducts
  } catch (error) {
    throw error
  }
}
const Search = async (searchValue, categoryId, supplierId, soft) => {
  try {
    const allProducts = await productModel.Search(searchValue, categoryId, supplierId, soft);
    return allProducts;
  } catch (error) {
    console.error('Error in Search service:', error);
    throw error;
  }
};
const createNew = async (reqBody) => {
  try {
    const newProduct = {
      ...reqBody
    }
    const createProduct = await productModel.createNew(newProduct)
    const getnewProduct = await productModel.getDetails(createProduct.insertedId)
    if (getnewProduct) {
      await categoryModel.pushProductIds(getnewProduct)
      await supplierModel.pushProductIds(getnewProduct)
    }
    return getnewProduct
  } catch (error) {
    throw error
  }
}
const updateProduct = async (id, reqBody) => {
  try {
    const targetProduct = await productModel.getDetails(id)
    if (!targetProduct) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'product not found')
    }
    const newProduct = {
      ...reqBody
    }
    const updateProduct = await productModel.updateProduct(id, newProduct)
    if (targetProduct.categoryId != reqBody.categoryId) {
      await categoryModel.pullProductIds(targetProduct)
    }
    if (targetProduct.supplierId != reqBody.supplierId) {
      await supplierModel.pullProductIds(targetProduct)
    }
    console.log(updateProduct)
    return { message: 'product updated successfully' }
  } catch (error) {
    throw error
  }
}

const getDetails = async (productId) => {
  try {
    const product = await productModel.getDetails(productId)
    if (!product) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'product not found')
    }

    return product
  } catch (error) {
    throw error
  }
}

const deleteProduct = async (id) => {
  try {
    const targetProduct = await productModel.getDetails(id)
    if (!targetProduct) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'product not found')
    }
    const result = await productModel.deleteProduct(id)
    await categoryModel.pullProductIds(targetProduct)
    await supplierModel.pullProductIds(targetProduct)
    console.log(result)
    return result
  } catch (error) {
    throw error
  }
}


export const productService = {
  getAllProducts,
  createNew,
  getDetails,
  updateProduct,
  deleteProduct,
  Search

}