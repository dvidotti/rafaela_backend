const Portfolio = require("../../models/Portfolio")

const handleError = (err) => {
  return {message: err.message, success: false}
}

module.exports.getPortfolio = async (req, res,next) => {
  try {
    const portfolio = await Portfolio.find({})
    const portfolioId = portfolio[0]._id
    const portfolioPopulated = await Portfolio.findById(portfolioId).populate({
      path: 'portfolio',
      populate: {path: 'images cover headImg'}
    })
    res.status(201).json({
      success: true,
      data: portfolioPopulated
    })
  } catch(err) {
      const errors = handleError(err)
      res.status(400).json({errors})
    }
}

module.exports.updatePortfolio = async (req, res, next) => {
  let {portfolio, portfolioId} = req.body;
  try {
    const portfolioFromDB = await Portfolio.findByIdAndUpdate(
      portfolioId, {$set: {portfolio: portfolio}}, {new: true}
    );
    res.status(201).json(portfolioFromDB)
  } catch {
      const errors = handleError(err)
      res.status(400).json({errors})
    }
}