import Joi from "joi";

export const employeeSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().min(6).optional(),

  full_name: Joi.string()
    .pattern(/^[A-Za-z\u0600-\u06FF\s]+$/)
    .min(3)
    .required()
    .messages({
      "string.pattern.base": "Name can only contain letters and spaces",
    }),

  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),

  department: Joi.string().required(),

  salary: Joi.number().positive().required(),

  hire_date: Joi.date().required(),

  address: Joi.string().required(),
});
