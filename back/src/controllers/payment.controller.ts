import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import { createPreferenceService } from "../services/payment.service";

export const createPreference = catchedController(
  async (req: Request, res: Response) => {
    const { items, orderId } = req.body;
    const url = await createPreferenceService(items, orderId);
    res.status(200).send({ url });
  }
);