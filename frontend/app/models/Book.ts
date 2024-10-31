export type Book = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  downloadUrl: string;
  userId: string;
};
// Compare this snippet from frontend/app/models/index.ts:
