import { json, LoaderFunction, MetaFunction } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import { getSessionData } from '~/.server';
import { UserApi } from '~/.server/endpoints';
import { Button } from '~/components/basic';
import { ROUTES } from '~/constants';
import { useUser, useBooks } from '~/hooks';

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

export default function BookshelfPage() {
  const user = useUser();
  const books = useBooks();
  const navigate = useNavigate();

  const handleUploadBook = () => navigate(ROUTES.UPLOAD_BOOK);

  if (!user) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-start">Bookshelf</h1>
      <Button onClick={handleUploadBook}>Upload book</Button>
      {books?.map((book) => (
        <div key={book.id}>{book.title}</div>
      ))}
    </div>
  );
}
