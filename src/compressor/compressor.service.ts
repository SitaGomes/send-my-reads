import { Injectable } from '@nestjs/common';

import {
  createReadStream,
  readdirSync,
  statSync,
  unlinkSync,
  createWriteStream,
} from 'node:fs';
import { extname, join } from 'node:path';
import { Extract } from 'unzipper';
import * as archiver from 'archiver';

@Injectable()
export class CompressorService {
  private outputEpubPath: string = join(
    process.cwd(),
    '/src/compressor/temp/output.epub',
  );
  private extractedPath: string = join(
    process.cwd(),
    '/src/compressor/temp/extrated-epub',
  );
  private imageSizeThreshold: number = 1.2 * 1024 * 1024;

  isImageDeletable(file: string) {
    const restrictedImageNames = ['cover', 'front', 'back'];
    return !restrictedImageNames.some((name) =>
      file.toLowerCase().includes(name),
    );
  }

  isImage(file: string) {
    const imageExtensions = ['.jpg', '.jpeg', '.png'];
    const extension = extname(file).toLowerCase();
    return imageExtensions.includes(extension);
  }

  processImages(directoryPath: string) {
    const files = readdirSync(directoryPath);

    files.forEach((file) => {
      const filePath = join(directoryPath, file);
      const stats = statSync(filePath);

      if (stats.isDirectory()) {
        this.processImages(filePath);
      } else if (
        stats.isFile() &&
        this.isImage(file) &&
        stats.size > this.imageSizeThreshold &&
        this.isImageDeletable(file)
      ) {
        unlinkSync(filePath);
        console.log(`Removed large image: ${filePath}`);
      }
    });
  }

  compressEpub(inputEpubPath: string) {
    console.log('Compressing EPUB...');
    const inputPath = join(process.cwd(), inputEpubPath);
    createReadStream(inputPath)
      .pipe(Extract({ path: this.extractedPath }))
      .on('close', () => {
        console.log('EPUB extracted successfully.');

        this.processImages(this.extractedPath);

        const output = createWriteStream(this.outputEpubPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => {
          console.log('New EPUB created successfully.');
        });

        archive.pipe(output);
        archive.directory(this.extractedPath, false);
        archive.finalize();
      });
  }
}
