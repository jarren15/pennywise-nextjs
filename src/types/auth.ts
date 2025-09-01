export type SignupFormState =
  | {
      fieldErrors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
    }
  | {
      serverErrors?: string;
    }
  | undefined;

export type SigninFormState =
  | {
      fieldErrors?: {
        email?: string[];
      };
    }
  | {
      serverErrors?: string;
    }
  | undefined;

export type SessionPayload = {
  userId: string;
  expiresAt: Date;
};
