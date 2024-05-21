import jwtUtils from "../utils/jwt.utils.js";

const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        message: "Пользователь не авторизован",
      });
    }

    const decodedData = jwtUtils.verifyToken(token);

    req.userData = decodedData;

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message: `${
        error?.message ? error?.message : "Пользователь не авторизован"
      }`,
    });
  }
};

export default authMiddleware;
