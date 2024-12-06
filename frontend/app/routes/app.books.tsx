// BookshelfPage.tsx

import {
  json,
  LoaderFunction,
  MetaFunction,
  ActionFunction,
} from '@remix-run/node';
import { getSessionData } from '~/.server';
import { UserApi } from '~/.server/endpoints';
import SubmitFile from '~/components/SubmitFile/SubmitFile';
import { useUser, useBooks } from '~/hooks';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const meta: MetaFunction = () => {
  return [{ title: 'BookShelf | Send My Reads' }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const { token } = await getSessionData(request);
  const books = await UserApi.getBooks(token);

  return json(
    { books },
    {
      headers: {
        'Cache-Control': 'private, max-age=3600', // 1 hour
      },
    },
  );
};

const UploadFileSchema = z.object({
  file: zfd.file(z.any()),
});

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.clone().formData();

  const parsedData = UploadFileSchema.safeParse({
    file: formData.get('file'),
  });

  if (!parsedData.success) {
    return json({ errors: parsedData.error.format() }, { status: 400 });
  }

  try {
    const file = parsedData.data.file;
    console.log('Uploading file', file.name);

    return json({ success: true });
  } catch (error) {
    return json(
      { error: 'An error occurred during file upload' },
      { status: 500 },
    );
  }
};

export default function BookshelfPage() {
  const user = useUser();
  const books = useBooks();

  if (!user) return null;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Bookshelf</h1>
        <SubmitFile />
      </div>
      {books?.map((book) => (
        <div key={book.id}>{book.title}</div>
      ))}
    </div>
  );
}
