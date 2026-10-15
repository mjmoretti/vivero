import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import { loginUserService, registerUserService, updateUserImageService } from "../services/user.service";
import { uploadImageService } from "../services/cloudinary.service";

export const registerUser = catchedController(
  async (req: Request & { file?: Express.Multer.File }, res: Response) => {
    const { email, password, name, address, phone } = req.body;
    
    let imageUrl: string | null = null;
    if (req.file) {
      imageUrl = await uploadImageService(req.file.path);
    }

    const newUser = await registerUserService({
      email,
      password,
      name,
      address,
      phone,
      image: imageUrl,
    });
    res.status(201).send(newUser);
  }
);

export const login = catchedController(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginUserService({ email, password });
  res.status(200).send({
    login: true,
    user: user.user,
    token: user.token,
  });
});

export const updateUserImage = catchedController(
  async (req: Request & { file?: Express.Multer.File }, res: Response) => {
    const { userId } = req.body;

    if (!req.file) {
      res.status(400).send({ message: "No se recibió ninguna imagen" });
      return;
    }

    const imageUrl = await uploadImageService(req.file.path);
    const updatedUser = await updateUserImageService(userId, imageUrl);
    res.status(200).send(updatedUser);
  }
);