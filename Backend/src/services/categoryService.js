/* eslint-disable no-useless-catch */
import { categoryModel } from '~/models/categoryModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { productModel } from '~/models/productModel'
import { supplierModel } from '~/models/supplierModel'


const getAllCategories = async () => {
  try {
    const allcategories = await categoryModel.getAllCategories()
    return allcategories
  } catch (error) {
    throw error
  }
}
const Search = async (searchValue) => {
  try {
    const allcategories = await categoryModel.Search(searchValue)
    return allcategories
  } catch (error) {
    throw error
  }
}

const createNew = async (reqBody) => {
  try {
    const newCategory = {
      ...reqBody
    }
    const createCategory = await categoryModel.creartNew(newCategory)
    console.log(createCategory)

    const getNewCategory = await categoryModel.findOneById(createCategory.insertedId)
    console.log(getNewCategory)
    return getNewCategory
  } catch (error) {
    throw error
  }
}

const getDetails = async (categoryId) => {
  try {
    const category = await categoryModel.getDetails(categoryId)
    if (!category) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'category not found')
    }
    return category
  } catch (error) {
    throw error
  }
}

const updateCategory = async (id, reqBody) => {
  try {
    const newCategory = {
      ...reqBody
    }
    const updateCategory = await categoryModel.updateCategory(id, newCategory)
    console.log(updateCategory)
    return { message: 'category updated successfully' }
  } catch (error) {
    throw error
  }
}
const deleteCategory = async (categoryId) => {
  try {
    const result = await categoryModel.deleteCategory(categoryId)
    const products = await productModel.getProductsByCategoryId(categoryId)
    
    await productModel.deleteProductbyCategoryId(categoryId)
    for (const product of products) {
      await supplierModel.pullProductIds(product);
    }

    console.log(result)
    return result
  } catch (error) {
    throw error
  }
}

export const categoryService = {
  createNew,
  getDetails,
  getAllCategories,
  updateCategory,
  deleteCategory,
  Search
}