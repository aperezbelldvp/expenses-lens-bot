import axios from "axios";
import fs from "fs";
import path from "path";
import logger from "../utils/logger";

export class DownloadImageService {
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

            logger.info(`Image saved: ${imagePath}`);
            return imagePath;
        } catch (error: any) {
            logger.error(`Error downloading image: ${error.message}`);
            throw new ImageDownloadError("Failed to download image from Telegram");
        }
    }
}

class ImageDownloadError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ImageDownloadError";
    }
}