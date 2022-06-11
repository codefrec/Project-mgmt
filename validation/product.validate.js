const Joi = require("joi");
const fs = require("fs");

module.exports.validateProduct = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(255),
    description: Joi.string().allow(""),
    quantity: Joi.number().min(0),
    price: Joi.number().min(0),
    product_image: Joi.any(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    if (req.file) {
      try {
        fs.existsSync(req.file.path) && fs.unlinkSync(req.file.path);
      } catch (err) {}
    }
    return res.status(400).send({ message: error.details[0].message });
  }

  next();
};
