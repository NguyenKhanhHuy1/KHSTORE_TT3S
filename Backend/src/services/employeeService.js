/* eslint-disable no-useless-catch */
import { employeeModel } from '~/models/employeeModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const getAllEmployees = async () => {
  try {
    const allEmployees = await employeeModel.getAllEmployees()
    return allEmployees
  } catch (error) {
    throw error
  }
}
const Search = async (searchValue) => {
  try {
    const allEmployees = await employeeModel.Search(searchValue)
    return allEmployees
  } catch (error) {
    throw error
  }
}
const createNew = async (reqBody) => {
  try {
    const newEmployee = {
      ...reqBody
    }
    const createEmployee = await employeeModel.createNew(newEmployee)

    return createEmployee
  } catch (error) {
    throw error
  }
}
const getEmployeeByGmail = async (gmail) => {
  try {
    const employee = await employeeModel.getEmployeeByGmail(gmail)
    if (!employee) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'employee not found')
    }
    return employee
  } catch (error) {
    throw error
  }
}
const getDetails = async (productId) => {
  try {
    const employee = await employeeModel.getDetails(productId)
    if (!employee) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'employee not found')
    }
    return employee
  } catch (error) {
    throw error
  }
}
const updateEmployee = async (id, reqBody) => {
  try {
    const newEmployee = {
      ...reqBody
    }
    const updateEmployee = await employeeModel.updateEmployee(id, newEmployee)
    console.log(updateEmployee)
    return { updateEmployee: 'employee updated successfully' }
  } catch (error) {
    throw error
  }
}
const deleteEmployee = async (employeeId) => {
  try {
    const result = await employeeModel.deleteEmployee(employeeId)
    console.log(result)
    return result
  } catch (error) {
    throw error
  }
}
const login = async (email, password) => {
  try {
    const employee = await employeeModel.login(email, password)
    if (!employee) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials')
    }
    return employee
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
  }
}

const changepassword = async (id, newpassword) => {
  try {
    const employee = await employeeModel.changepassword(id, newpassword)
    if (!employee) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials')
    }
    return employee
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
  }
}
export const employeeService = {
  getAllEmployees,
  getDetails,
  createNew,
  updateEmployee,
  deleteEmployee,
  login,
  changepassword,
  getEmployeeByGmail,
  Search
}