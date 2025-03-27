export type AuthUser = {
  uid: string;
  email: string;
  name?: string;
  token?: string;
};

export type AuthCredentials = { email: string; password: string };
