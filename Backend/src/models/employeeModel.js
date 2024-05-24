
import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { provinceModel } from './provinceModel'

//define Conllection (Name & Schema)
const EMPLOYEE_COLLECTION_NAME = 'Employees'

const EMPLOYEE_COLLECTION_SCHEMA = Joi.object({
  employeeName: Joi.string().required().min(1).max(255).trim().strict(),
  birthDate: Joi.date().allow(''),
  provinceId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  address: Joi.string().allow('').min(1).max(255).trim().strict(),
  phone: Joi.string().required().min(1).max(10000).trim().strict(),
  email: Joi.string().required().min(1).max(50).trim().strict(),
  password: Joi.string().required().min(6).max(50).trim().strict(),
  photo: Joi.string().min(1).max(50).trim().strict(),
  role: Joi.string().required().min(1).max(50).trim().strict(),
  isworking: Joi.boolean().required()
})
const PASSWORD_SCHEMA = Joi.object({
  password: Joi.string().required().min(6).max(50).trim().strict()
})
const validatePassword = async (data) => {
  return await PASSWORD_SCHEMA.validateAsync(data, { abortEarly: false })
}
const validateBeforeCreate = async (data) => {
  return await EMPLOYEE_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const getAllEmployees = async () => {
  try {
    const allEmployees = await GET_DB().collection(EMPLOYEE_COLLECTION_NAME).aggregate([
      { $lookup: {
        from: provinceModel.PROVINCE_COLLECTION_NAME,
        localField: 'provinceId',
        foreignField: '_id',
        as: 'Province'
      } }
    ]).toArray()
    return allEmployees
  } catch (error) {
    throw new Error(error)
  }
}
const Search = async (searchValue) => {
  try {
    const allEmployees = await GET_DB().collection(EMPLOYEE_COLLECTION_NAME).aggregate([
      {
        $match: {
          employeeName: { $regex: searchValue, $options: 'i' }
        }
      },
      {
        $lookup: {
          from: provinceModel.PROVINCE_COLLECTION_NAME,
          localField: 'provinceId',
          foreignField: '_id',
          as: 'Province'
        }
      },
      {
        $sort: { employeeName: 1 }
      }
    ]).toArray();
    return allEmployees
  } catch (error) {
    throw new Error(error)
  }
}
const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const newdata = {
      ...validData,
      provinceId: new ObjectId(validData.provinceId)
    }
    return await GET_DB().collection(EMPLOYEE_COLLECTION_NAME).insertOne(newdata)
  } catch (error) {
    throw new Error(error)
  }
}
const getDetails = async (id) => {
  try {
    const result = await GET_DB().collection(EMPLOYEE_COLLECTION_NAME).aggregate([
      { $match: {
        _id: new ObjectId(id)
      } },
      { $lookup: {
        from: provinceModel.PROVINCE_COLLECTION_NAME,
        localField: 'provinceId',
        foreignField: '_id',
        as: 'Province'
      } }
    ]).toArray()
    return result[0] || {}
  } catch (error) {
    throw new Error(error)
  }
}
const getEmployeeByGmail = async (gmail) => {
  try {
    const result = await GET_DB().collection(EMPLOYEE_COLLECTION_NAME).aggregate([
      { $match: {
        email: gmail
      } },
      { $lookup: {
        from: provinceModel.PROVINCE_COLLECTION_NAME,
        localField: 'provinceId',
        foreignField: '_id',
        as: 'Province'
      } }
    ]).toArray()
    return result[0] || {}
  } catch (error) {
    throw new Error(error)
  }
}

const updateEmployee = async (id, data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const newdata = {
      ...validData,
      provinceId: new ObjectId(validData.provinceId)
    }
    return await GET_DB().collection(EMPLOYEE_COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) }, // Filter criteria: customer ID
      { $set: newdata }
    )
  } catch (error) {
    throw new Error(error)
  }
}
const deleteEmployee = async (id) => {
  try {
    const result = await GET_DB().collection(EMPLOYEE_COLLECTION_NAME).deleteOne(
      { _id: new ObjectId(id) } // Tiêu chí lọc: ID của khách hàng
    )
    return result
  } catch (error) {
    throw new Error(error.message)
  }
}

const login = async (email, password) => {
  try {
    const employee = await GET_DB().collection(EMPLOYEE_COLLECTION_NAME).findOne({ email: email })
    if (!employee) {
      throw new Error('Employee not found')
    }
    if (employee.password !== password) {
      throw new Error('Incorrect password')
    }
    return employee
  } catch (error) {
    throw new Error(error.message)
  }
}


const changepassword = async (id, newpassword) => {

  try {
    const validData = await validatePassword(newpassword)
    return await GET_DB().collection(EMPLOYEE_COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) }, // Filter criteria: customer ID
      { $set: { password: validData.password } }
    )
  } catch (error) {
    throw new Error(error)
  }
}
export const employeeModel = {
  EMPLOYEE_COLLECTION_NAME,
  EMPLOYEE_COLLECTION_SCHEMA,
  createNew,
  getAllEmployees,
  getDetails,
  updateEmployee,
  deleteEmployee,
  login,
  changepassword,
  getEmployeeByGmail,
  Search

}