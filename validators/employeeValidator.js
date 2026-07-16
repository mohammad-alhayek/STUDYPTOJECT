import Joi from "joi";

export const employeeSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().min(6).optional(),

  full_name: Joi.string()
    .pattern(/^[A-Za-z\u0600-\u06FF\s]+$/)
    .min(3)
    .required()
    .messages({
      "string.pattern.base": "VALIDATION_NAME_LETTERS",
      "string.empty": "VALIDATION_NAME_REQUIRED",
      "any.required": "VALIDATION_NAME_REQUIRED",
    }),

  phone: Joi.string()
    .pattern(/^\+9627[789]\d{7}$/)
    .required()
    .messages({
      "string.pattern.base": "VALIDATION_JORDANIAN_PHONE",
      "string.empty": "VALIDATION_PHONE_REQUIRED",
      "any.required": "VALIDATION_PHONE_REQUIRED",
    }),

  // بدل department
  company_id: Joi.string().uuid().required().messages({
    "any.required": "COMPANY_ID_REQUIRED",
    "string.guid": "INVALID_COMPANY_ID",
  }),

  department_id: Joi.string().uuid().required().messages({
    "any.required": "DEPARTMENT_ID_REQUIRED",
    "string.guid": "INVALID_DEPARTMENT_ID",
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
