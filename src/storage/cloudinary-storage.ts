import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

export const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: 'tasks',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    public_id: file.originalname,
  }),
});
