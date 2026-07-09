import RefreshToken from "../model/refreshTokenModel.js";

export const createRefreshToken = async (data) => {
  return await RefreshToken.create(data);
};

export const deleteRefreshToken = async (token) => {
  return await RefreshToken.destroy({
    where: {
      token: token,
    },
  });
};
