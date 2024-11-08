import { json, LoaderFunction, MetaFunction } from '@remix-run/node';
import { getSessionData } from '~/.server';
import { UserApi } from '~/.server/endpoints';
import SubmitFile from '~/components/SubmitFile/SubmitFile';
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
