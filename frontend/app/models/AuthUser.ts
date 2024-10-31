export type AuthUser = {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthenticatorAuthUser = {
  user: AuthUser;
  token: string;
};

// Compare this snippet from frontend/app/models/index.ts:
