import axios from "axios";
import fs from "fs";
import path from "path";
import logger from "../utils/logger";

export class ImagesService {
    static async downloadImage(imageUrl: string): Promise<string> {
        try {
            const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
            const buffer = Buffer.from(response.data, "binary");

            const tempDir = path.join(__dirname, "..", "..", "temp");
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir);
            }

            const imagePath = path.join(tempDir, `ticket_${Date.now()}.jpg`);
            fs.writeFileSync(imagePath, buffer);

            return imagePath;
        } catch (error: any) {
            logger.error(`Error downloading image: ${error.message}`);
            throw new ImageDownloadError("Failed to download image from Telegram");
        }
    }

    static async deleteImage(imagePath: string): Promise<void> {
        try {
            fs.unlinkSync(imagePath);

        } catch (error: any) {
            logger.error(`Error deleteing image: ${error.message}`);
            throw new ImageDownloadError("Failed to delete image");
        }
    }
}

class ImageDownloadError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ImageDownloadError";
    }
}