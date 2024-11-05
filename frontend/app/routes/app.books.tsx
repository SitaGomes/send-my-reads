import { json, LoaderFunction, MetaFunction } from '@remix-run/node';
import { getSessionData } from '~/.server';
import { UserApi } from '~/.server/endpoints';
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
      <h1>{user.username}&apos;s Bookshelf</h1>
      {books?.map((book) => (
        <div key={book.id}>{book.title}</div>
      ))}
    </div>
  );
}
