import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'user_uploads', // Folder name in Cloudinary
    format: async (req, file) => file.mimetype.split('/')[1], // Extract file type
    public_id: (req, file) => file.originalname.split('.')[0], // Use original filename
  },
});

const upload = multer({ storage });

export { cloudinary, upload };
