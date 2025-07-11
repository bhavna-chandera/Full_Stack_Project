import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been uploaded successfully
    console.log("File is uploaded successfully to Cloudinary", response.url);
    return response;
  } catch (error) {
    // console.error("Error uploading to Cloudinary:", error);
    // throw new Error("Failed to upload file to Cloudinary");
    fs.unlinkSync(localFilePath); // delete the locally saved temporary file from local storage (if any corrupted or other file exists) as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
