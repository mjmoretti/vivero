import cloudinary from "../config/cloudinary";

export const uploadImageService = async (filePath: string): Promise<string> => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "vivero-agronomia",
  });
  return result.secure_url;
};

export const deleteImageService = async (publicId: string): Promise<void> => {
  await cloudinary.uploader.destroy(publicId);
};