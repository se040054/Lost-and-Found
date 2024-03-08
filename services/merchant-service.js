const { Merchant, User } = require('../models')
const fileHelper = require('../helpers/file-helper')

const merchantService = {
  postMerchant: async (req, cb) => {
    try {
      const possessionMerchant = await Merchant.count({ where: { userId: req.user.id } })
      if (possessionMerchant >= 5) throw new Error('持有商家已達上限(5個)')
      const { name, address, phone } = req.body
      const logo = req.file ? await fileHelper.fileToJpeg(req.file) : null
      const newMerchant = await Merchant.create({
        name,
        logo,
        address,
        phone,
        userId: req.user.id
      })
      return cb(null, newMerchant)
    }
    catch (err) {
      return cb(err)
    }
  },
  getMerchant: (req, cb) => {
    return Merchant.findByPk(req.params.id, { raw: true })
      .then(merchant => {
        if (!merchant) throw new Error('找不到此商家')
        return cb(null, merchant)
      })
      .catch(err => cb(err))
  }
}

module.exports = merchantService