import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});




export const uploadPDFToCloudinary = (pdfBuffer, publicId) => {

    return new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "image",
                public_id: publicId,
                format: "pdf"
            },

            (error, result) => {

                if (error) {
                    console.error(
                        "Cloudinary upload error:",
                        error
                    );

                    reject(error);
                    return;
                }

                console.log(
                    "Cloudinary PDF upload successful:",
                    result.secure_url
                );

                resolve(result);
            }
        );

        uploadStream.end(pdfBuffer);
    });
};

export default cloudinary;