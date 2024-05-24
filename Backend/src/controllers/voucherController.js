import { StatusCodes } from 'http-status-codes'
import { voucherService } from '~/services/voucherService'
import ApiError from '~/utils/ApiError'


const createNew = async (req, res, next) => {
  try {
    const createSupplier = await voucherService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createSupplier)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const vouchercode = req.params.id
    const getdate = new Date()
    const voucher = await voucherService.getDetails(vouchercode)
    if (getdate < voucher.foundingDate || getdate > voucher.deadlineDate) {
      return res.status(StatusCodes.CONFLICT).json({ error: 'Voucher đã hết hạn' });
    }
    res.status(StatusCodes.OK).json(voucher)
  } catch (error) {
    next(error)
  }
}


export const voucherController = {
    createNew,
    getDetails

}