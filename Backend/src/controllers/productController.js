import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { productService } from '~/services/productService'
import fs from 'fs'
import path from 'path'

const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await productService.getAllProducts()
    res.status(StatusCodes.OK).json(allProducts)
  } catch (error) {
    next(error)
  }
}
const Search = async (req, res, next) => {
  try {
    const searchValue = req.query.searchValue;
    const categoryId = req.query.categoryId;
    const supplierId = req.query.supplierId;

    const allProducts = await productService.Search(searchValue, categoryId, supplierId);
    res.status(StatusCodes.OK).json(allProducts);
  } catch (error) {
    console.error('Error in Search controller:', error);
    next(error);
  }
};

const createNew = async (req, res, next) => {
  try {
    // Nhận dữ liệu ảnh dưới dạng base64 từ client
    const Photo = req.body.photo
    if (Photo && Photo.includes('data:image/')) {
      // Giải mã base64
      const base64Image = Photo.split(';base64,').pop()
      const imageBuffer = Buffer.from(base64Image, 'base64')
      // Tạo tên file và đường dẫn lưu trữ
      const imageName = 'image_' + Date.now() + '.png'
      // eslint-disable-next-line no-undef
      const imagePath = path.join('/KhanhHuy_Private/Project_3S/Frontend/src/assets/images', 'products', imageName)
      // Lưu dữ liệu ảnh vào file
      fs.writeFile(imagePath, imageBuffer, (err) => {
        if (err) {
          console.error(err)
        }
      })
      req.body.photo = imageName
    }
    else {
      req.body.photo = 'noProduct.jpg'
    }


    const createProduct = await productService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createProduct)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const productId = req.params.id
    const product = await productService.getDetails(productId)
    res.status(StatusCodes.OK).json(product)
  } catch (error) {
    next(error)
  }
}

const updateProduct = async (req, res, next) => {
  try {
    // Nhận dữ liệu ảnh dưới dạng base64 từ client
    const Photo = req.body.photo
    //kiem tra photo truyen len la dang base64 hay la namephoto
    if (Photo && Photo.includes('data:image/')) {
      const base64Image = Photo.split(';base64,').pop()
      const imageBuffer = Buffer.from(base64Image, 'base64')
      const imageName = 'image_' + Date.now() + '.png'
      // eslint-disable-next-line no-undef
      const imagePath = path.join('/KhanhHuy_Private/Project_3S/Frontend/src/assets/images', 'products', imageName)
      fs.writeFile(imagePath, imageBuffer, (err) => {
        if (err) {
          console.error(err)
        }
      })
      req.body.photo = imageName
    }

    const productId = req.params.id
    await productService.updateProduct(productId, req.body)
    res.status(StatusCodes.NO_CONTENT).send()
  } catch (error) {
    next(error)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id
    await productService.deleteProduct(productId)
    res.status(StatusCodes.NO_CONTENT).send()
  } catch (error) {
    next(error)
  }
}


export const productController = {
  createNew,
  getDetails,
  getAllProducts,
  deleteProduct,
  updateProduct,
  Search
}