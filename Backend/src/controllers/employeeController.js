import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import fs from 'fs'
import path from 'path'
import { employeeService } from '~/services/employeeService'

const jwt = require('jsonwebtoken')

const getAllEmployees = async (req, res, next) => {
  try {
    const allEmployees = await employeeService.getAllEmployees()
    res.status(StatusCodes.OK).json(allEmployees)
  } catch (error) {
    next(error)
  }
}
const Search = async (req, res, next) => {
  try {
    const searchValue = req.params.searchValue
    const allEmployees = await employeeService.Search(searchValue)
    res.status(StatusCodes.OK).json(allEmployees)
  } catch (error) {
    next(error)
  }
}

const createNew = async (req, res, next) => {
  try {
    // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu hay chưa
    const existingEmployee = await employeeService.getEmployeeByGmail(req.body.email)
    if (existingEmployee && Object.keys(existingEmployee).length > 0) {
      // Nếu tài khoản đã tồn tại, trả về lỗi 409 (Conflict)
      return res.status(StatusCodes.CONFLICT).json({ error: 'Email already exists' })
    }
    const Photo = req.body.photo
    if (Photo && Photo.includes('data:image/')) {
      const base64Image = Photo.split(';base64,').pop()
      const imageBuffer = Buffer.from(base64Image, 'base64')
      const imageName = 'image_'+ Date.now() + '.png'
      const imagePath = path.join('/KhanhHuy_Private/Project_3S/Frontend/src/assets/images', 'employees', imageName)
      fs.writeFile(imagePath, imageBuffer, (err) => {
        if (err) {
          console.error(err)
        }
      })

      req.body.photo = imageName
    }
    else {
      req.body.photo = 'nophoto.png'
    }

    const createEmployee = await employeeService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createEmployee)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const employeeId = req.params.id
    const employee = await employeeService.getDetails(employeeId)
    res.status(StatusCodes.OK).json(employee)
  } catch (error) {
    next(error)
  }
}
const updateEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.id
    const employee = await employeeService.getDetails(employeeId)
    if (employee.email !== req.body.email) {
      // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu hay chưa
      const existingEmployee = await employeeService.getEmployeeByGmail(req.body.email)
      if (existingEmployee && Object.keys(existingEmployee).length > 0) {
        // Nếu tài khoản đã tồn tại, trả về lỗi 409 (Conflict)
        return res.status(StatusCodes.CONFLICT).json({ error: 'Email already exists' })
      }
    }
    // Nhận dữ liệu ảnh dưới dạng base64 từ client
    const Photo = req.body.photo
    //kiem tra photo truyen len la dang base64 hay la namephoto
    if (Photo && Photo.includes('data:image/')) {
      const base64Image = Photo.split(';base64,').pop()
      const imageBuffer = Buffer.from(base64Image, 'base64')
      const imageName = 'image_' + Date.now() + '.png'
      // eslint-disable-next-line no-undef
      const imagePath = path.join('/KhanhHuy_Private/Project_3S/Frontend/src/assets/images', 'employees', imageName)
      fs.writeFile(imagePath, imageBuffer, (err) => {
        if (err) {
          console.error(err)
        }
      })
      req.body.photo = imageName
    }


    await employeeService.updateEmployee(employeeId, req.body)
    res.status(StatusCodes.NO_CONTENT).send()
  } catch (error) {
    next(error)
  }
}

const deleteEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.id
    await employeeService.deleteEmployee(employeeId)
    res.status(StatusCodes.NO_CONTENT).send()
  } catch (error) {
    next(error)
  }
}
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Email and password are required')
    }
    const employee = await employeeService.login(email, password)
    if (!employee) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials')
    }
    const tokenData = employee
    const token = jwt.sign(tokenData, 'secret_key')

    // const { password: omit, ...employeeData } = employee
    res.status(StatusCodes.OK).json({ token })
  } catch (error) {
    next(error)
  }
}
const changepassword = async (req, res, next) => {
  try {
    const id = req.params.id
    const newpassword = req.body
    if (!id || !newpassword) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'id and password are required')
    }

    const employee = await employeeService.changepassword(id, newpassword)

    if (!employee) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials')
    }
    // const { password: omit, ...employeeData } = employee
    res.status(StatusCodes.OK).json(employee)

  } catch (error) {
    next(error)
  }

}
export const employeeController = {
  createNew,
  getDetails,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  login,
  changepassword,
  Search
}