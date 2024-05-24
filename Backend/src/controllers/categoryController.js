import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { categoryService } from '~/services/categoryService'


const getAllCategories = async (req, res, next) => {
  try {
    const categorys = await categoryService.getAllCategories()
    res.status(StatusCodes.OK).json(categorys)
  } catch (error) {
    next(error)
  }
}
const Search = async (req, res, next) => {
  try {
    const searchValue = req.params.searchValue
    const categorys = await categoryService.Search(searchValue)
    res.status(StatusCodes.OK).json(categorys)
  } catch (error) {
    next(error)
  }
}

const creartNew = async (req, res, next) => {
  try {
    const newcategory = await categoryService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(newcategory)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const categoryId = req.params.id
    const category = await categoryService.getDetails(categoryId)
    res.status(StatusCodes.OK).json(category)
  } catch (error) {
    next(error)
  }
}
const updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id
    await categoryService.updateCategory(categoryId, req.body)
    res.status(StatusCodes.NO_CONTENT).send()
  } catch (error) {
    next(error)
  }
}

const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id
    await categoryService.deleteCategory(categoryId)
    res.status(StatusCodes.NO_CONTENT).send()
  } catch (error) {
    next(error)
  }
}

export const categoryController = {
  getAllCategories,
  creartNew,
  getDetails,
  updateCategory,
  deleteCategory,
  Search
}