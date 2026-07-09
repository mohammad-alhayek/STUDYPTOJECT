import * as authService from '../service/authService.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const token = await authService.login(email, password);

  res.json({
    message: req.__("LOGIN_SUCCESS"),
    data: tokens,
  });
});

    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
};
export const register = async (req, res) => {
    try {
        const user = req.body;

        const result = await authService.register(user);

  res.json({
    message: req.__("LOGOUT_SUCCESS"),
  });
});

    } catch (error) {
        console.log(error);
        console.log(error.original);

  const result = await authService.register(user);

  res.status(201).json({
    message: req.__("REGISTERED_SUCCESSFULLY"),
    data: result,
  });
});
