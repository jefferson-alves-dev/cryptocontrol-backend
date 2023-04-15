import jwt from 'jsonwebtoken';

const generateAccessTokenAndRefreshToken = async (userId: string) => {
  const accessToken = await generateAccessToken(userId);
  const refreshToken = await generateRefreshToken(userId);
  return { accessToken, refreshToken };
};

const generateAccessToken = async (userId: string) => {
  return jwt.sign({ userId }, String(process.env.JWT_ACCESS_TOKEN_SECRET_KEY), {
    expiresIn: `${process.env.JWT_EXPIRES_ACCESS_TOKEN}`,
  });
};

const generateRefreshToken = async (userId: string) => {
  return jwt.sign(
    { userId },
    String(process.env.JWT_REFRESH_TOKEN_SECRET_KEY),
    {
      expiresIn: `${process.env.JWT_EXPIRES_REFRESH_TOKEN}`,
    }
  );
};

const validateAccessToken = async (accessToken: string) => {
  try {
    return jwt.verify(
      accessToken,
      String(process.env.JWT_ACCESS_TOKEN_SECRET_KEY)
    );
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return 'expired';
    } else {
      return false;
    }
  }
};

const validateRefreshToken = async (refreshToken: string) => {
  try {
    return jwt.verify(
      refreshToken,
      String(process.env.JWT_REFRESH_TOKEN_SECRET_KEY)
    );
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return 'expired';
    } else {
      return false;
    }
  }
};

// .

const validateToken = async (
  token: string
): Promise<boolean | 'expired' | 'invalid'> => {
  try {
    jwt.verify(token, String(process.env.JWT_ACCESS_TOKEN_SECRET_KEY));
    return true;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return 'expired';
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return 'invalid';
    }
    return false;
  }
};

const decodeToken = async (token: string) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return false;
  }
};

export default {
  generateAccessToken,
  validateAccessToken,
  validateRefreshToken,
  generateRefreshToken,
  generateAccessTokenAndRefreshToken,
  decodeToken,
  validateToken,
};
