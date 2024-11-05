import { useLoaderData } from '@remix-run/react';
import { Book } from '~/models';

type LoaderData = {
  books: Book[] | null;
};

export const useBooks = () => {
  const response = useLoaderData<LoaderData>();
  return response?.books || null;
};
