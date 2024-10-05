import path from "path";
import fs from "fs";
import express from "express";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.delete("/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "../../uploads", imageName);
  console.log("Image Path:", imagePath);

  fs.unlink(imagePath, (err) => {
    if (err) {
      if (err.code === "ENOENT") {
        // Image not found
        return res.status(404).json({ message: "Image not found" });
      }
      // Other errors
      return res.status(500).json({ message: "Error deleting image" });
    }
    // Successfully deleted
    res.status(200).json({ message: "Image deleted successfully" });
  });
});

export default router;
