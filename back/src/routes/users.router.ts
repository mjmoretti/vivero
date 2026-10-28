import { Request, Response, Router } from "express";
import validateUserRegister from "../middlewares/userRegister.middleware";
import validateUserLogin from "../middlewares/userLogin.middleware";
import { login, registerUser, updateUserImage, updateUserData } from "../controllers/user.controller";
import checkLogin from "../middlewares/checkLogin.middleware";
import { OrderRepository } from "../repositories/order.repository";
import upload from "../middlewares/upload.middleware";

const usersRouter = Router();

usersRouter.post("/register", upload.single("image"), validateUserRegister, registerUser);

usersRouter.post("/login", validateUserLogin, login);

usersRouter.patch("/image", upload.single("image"), checkLogin, updateUserImage);

usersRouter.patch("/data", checkLogin, updateUserData);

usersRouter.get("/orders", checkLogin, async (req: Request, res: Response) => {
  const { userId } = req.body;
  const orders = await OrderRepository.find({
    relations: [
      "orderDetails",
      "orderDetails.product",
    ],
    where: { user: { id: userId } },
  });
  res.send(orders);
});

export default usersRouter;
