import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as archiver from 'archiver';
import { Extract } from 'unzipper';
import { Readable } from 'stream';
import { join, extname } from 'path';
import * as os from 'os';
import * as crypto from 'crypto';

@Injectable()
export class ToolkitService {
  private tempDir: string;
  private outputEpubPath: string;
  private extractedPath: string;
  private imageSizeThreshold: number = 1.2 * 1024 * 1024;

  constructor() {
    this.tempDir = os.tmpdir();
    const randomString = crypto.randomBytes(8).toString('hex');
    this.outputEpubPath = join(this.tempDir, `output_${randomString}.epub`);
    this.extractedPath = join(this.tempDir, `extracted-epub_${randomString}`);
  }

  private isImageDeletable(file: string) {
    const restrictedImageNames = ['cover', 'front', 'back'];
    return !restrictedImageNames.some((name) =>
      file.toLowerCase().includes(name),
    );
  }

  private isImage(file: string) {
    const imageExtensions = ['.jpg', '.jpeg', '.png'];
    const extension = extname(file).toLowerCase();
    return imageExtensions.includes(extension);
  }

  private processImages(directoryPath: string) {
    const files = fs.readdirSync(directoryPath);

    files.forEach((file) => {
      const filePath = join(directoryPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        this.processImages(filePath);
      } else if (
        stats.isFile() &&
        this.isImage(file) &&
        stats.size > this.imageSizeThreshold &&
        this.isImageDeletable(file)
      ) {
        fs.unlinkSync(filePath);
        console.log(`Removed large image: ${filePath}`);
      }
    });
  }

  async compressEpub(inputEpubBuffer: Buffer): Promise<Buffer> {
    console.log('Compressing EPUB...');

    return new Promise((resolve, reject) => {
      const inputStream = Readable.from(inputEpubBuffer);
      inputStream
        .pipe(Extract({ path: this.extractedPath }))
        .on('close', () => {
          console.log('EPUB extracted successfully.');
          this.processImages(this.extractedPath);

          const archive = archiver('zip', { zlib: { level: 9 } });
          const output = fs.createWriteStream(this.outputEpubPath);

          output.on('close', () => {
            console.log('New EPUB created successfully.');
            const compressedEpub = fs.readFileSync(this.outputEpubPath);
            resolve(compressedEpub);

            // Clean up temporary files
            fs.unlinkSync(this.outputEpubPath);
            fs.rmSync(this.extractedPath, { recursive: true, force: true });
          });

          archive.on('error', (err) => {
            reject(err);
          });

          archive.pipe(output);
          archive.directory(this.extractedPath, false);
          archive.finalize();
        })
        .on('error', (error) => {
          console.error('Error extracting EPUB:', error);
          reject('Error extracting EPUB');
        });
    });
  }
}
