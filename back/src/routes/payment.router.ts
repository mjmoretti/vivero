import { Router } from "express";
import { createPreference } from "../controllers/payment.controller";
import checkLogin from "../middlewares/checkLogin.middleware";

const paymentRouter = Router();

paymentRouter.post("/create-preference", checkLogin, createPreference);

export default paymentRouter;