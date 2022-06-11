const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports.validateUpdateShoppingCart = (req, res, next) => {
  const schema = Joi.object({
    product: Joi.objectId().required(),
    action: Joi.string().valid("add", "remove").required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  next();
};
