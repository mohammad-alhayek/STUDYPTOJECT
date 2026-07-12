export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const errorKey = error.details[0].message;

      return res.status(400).json({
        status: "fail",
        message: req.__(errorKey),
      });
    }

    next();
  };
};
