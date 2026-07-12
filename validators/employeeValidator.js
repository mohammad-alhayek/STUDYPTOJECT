import Joi from "joi";

export const employeeSchema = Joi.object({
  email: Joi.string().email().optional(),

  password: Joi.string().min(6).optional(),

  full_name: Joi.string()
    .pattern(/^[A-Za-z\u0600-\u06FF\s]+$/)
    .min(3)
    .required()
    .messages({
      "string.pattern.base": "Name can only contain letters and spaces",
    }),

  phone: Joi.string()
    .pattern(/^\+9627[789]\d{7}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be a valid Jordanian mobile number (e.g. +96279XXXXXXX).",
    }),

  department: Joi.string().required(),

  salary: Joi.number().positive().required(),

  hire_date: Joi.date().required(),

  address: Joi.string().required(),
});
