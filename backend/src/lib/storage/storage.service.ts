import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  FirebaseStorage,
  getDownloadURL,
} from 'firebase/storage';

@Injectable()
export class StorageService {
  private readonly storage: FirebaseStorage;
  constructor() {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    };

    this.storage = getStorage(initializeApp(firebaseConfig));
  }

  async uploadFileAndGetUrl(
    userId: string,
    file: Express.Multer.File,
  ): Promise<string> {
    const storageRef = ref(
      this.storage,
      `users/${userId}/${file.originalname}`,
    );
    const uploadTask = uploadBytesResumable(storageRef, file.buffer);

    // Wait for the upload to complete
    await uploadTask;

    // Get the download URL
    const downloadUrl = await getDownloadURL(storageRef);

    return downloadUrl;
  }

  async getBook(bookId: string) {
    const storageRef = ref(this.storage, `books/${bookId}`);
    const downloadUrl = await getDownloadURL(storageRef);

    return downloadUrl;
  }
}
