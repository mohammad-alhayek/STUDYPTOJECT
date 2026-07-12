import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().min(6).required(),

  full_name: Joi.string()
    .pattern(/^[A-Za-z\u0600-\u06FF\s]+$/)
    .min(3)
    .required()
    .messages({
      "string.pattern.base": "Name can only contain letters and spaces",
    }),
});
