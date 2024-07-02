import {
  createReadStream,
  readdirSync,
  statSync,
  unlinkSync,
  createWriteStream,
} from 'node:fs';
import path from 'node:path';
import { Extract } from 'unzipper';
import archiver from 'archiver';

const inputEpubPath = './temp/input.epub';
const extractedPath = './temp/extrated-epub';
const outputEpubPath = './temp/output.epub';

const imageSizeThreshold = 1.2 * 1024 * 1024; // 1.2MB

function processImages(directoryPath: string) {
  const files = readdirSync(directoryPath);

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stats = statSync(filePath);

    if (stats.isDirectory()) {
      processImages(filePath);
    } else if (
      stats.isFile() &&
      isImage(file) &&
      stats.size > imageSizeThreshold &&
      isImageDeletable(file)
    ) {
      unlinkSync(filePath);
      console.log(`Removed large image: ${filePath}`);
    }
  });
}

function isImageDeletable(file: string) {
  const restrictedImageNames = ['cover', 'front', 'back'];
  return !restrictedImageNames.some((name) =>
    file.toLowerCase().includes(name),
  );
}

function isImage(file: string) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const extension = path.extname(file).toLowerCase();
  return imageExtensions.includes(extension);
}

createReadStream(inputEpubPath)
  .pipe(Extract({ path: extractedPath }))
  .on('close', () => {
    console.log('EPUB extracted successfully.');

    processImages(extractedPath);

    const output = createWriteStream(outputEpubPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log('New EPUB created successfully.');
    });

    archive.pipe(output);
    archive.directory(extractedPath, false);
    archive.finalize();
  });
