import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "VALIDATION_EMAIL_INVALID",
    "string.empty": "VALIDATION_EMAIL_REQUIRED",
    "any.required": "VALIDATION_EMAIL_REQUIRED",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "VALIDATION_PASSWORD_MIN_6",
    "string.empty": "VALIDATION_PASSWORD_REQUIRED",
    "any.required": "VALIDATION_PASSWORD_REQUIRED",
  }),

  full_name: Joi.string()
    .pattern(/^[A-Za-z\u0600-\u06FF\s]+$/)
    .min(3)
    .required()
    .messages({
      "string.pattern.base": "VALIDATION_NAME_LETTERS",
      "string.min": "VALIDATION_NAME_MIN_3",
      "string.empty": "VALIDATION_NAME_REQUIRED",
      "any.required": "VALIDATION_NAME_REQUIRED",
    }),
});
