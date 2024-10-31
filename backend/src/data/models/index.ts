import { User, Book } from '@prisma/client';

type AuthUser = Omit<User, 'password'>;

export { AuthUser, Book };
