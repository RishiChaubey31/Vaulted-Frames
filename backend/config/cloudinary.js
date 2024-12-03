import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from the .env file

// Configure Cloudinary with separate components from the .env file
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default cloudinary; // Export the configured Cloudinary instance
