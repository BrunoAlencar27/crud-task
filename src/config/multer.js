import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { AppError } from '../common/errors/appError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/webp'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    cb(
      new AppError(400, `file type must be an image, got '${file.mimetype}'`),
      false,
    );
    return;
  }

  cb(null, true);
}

export { storage, fileFilter };
