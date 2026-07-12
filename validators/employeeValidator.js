import Joi from "joi";

export const employeeSchema = Joi.object({
  email: Joi.string().email().optional(),

  password: Joi.string().min(6).optional(),

  full_name: Joi.string()
    .pattern(/^[A-Za-z\u0600-\u06FF\s]+$/)
    .min(3)
    .required()
    .messages({
      "string.pattern.base": "VALIDATION_NAME_LETTERS", // 🌟 مفتاح بديل للنص
      "string.empty": "VALIDATION_NAME_REQUIRED",
      "any.required": "VALIDATION_NAME_REQUIRED",
    }),

  phone: Joi.string()
    .pattern(/^\+9627[789]\d{7}$/)
    .required()
    .messages({
      "string.pattern.base": "VALIDATION_JORDANIAN_PHONE", // 🌟 مفتاح بديل للنص
      "string.empty": "VALIDATION_PHONE_REQUIRED",
      "any.required": "VALIDATION_PHONE_REQUIRED",
    }),

  department: Joi.string().required().messages({
    "any.required": "VALIDATION_DEPARTMENT_REQUIRED",
    "string.empty": "VALIDATION_DEPARTMENT_REQUIRED",
  }),

  salary: Joi.number().positive().required().messages({
    "number.base": "VALIDATION_SALARY_NUMBER",
    "number.positive": "VALIDATION_SALARY_POSITIVE",
    "any.required": "VALIDATION_SALARY_REQUIRED",
  }),

  hire_date: Joi.date().required().messages({
    "any.required": "VALIDATION_HIRE_DATE_REQUIRED",
  }),

  address: Joi.string().required().messages({
    "any.required": "VALIDATION_ADDRESS_REQUIRED",
    "string.empty": "VALIDATION_ADDRESS_REQUIRED",
  }),
});
