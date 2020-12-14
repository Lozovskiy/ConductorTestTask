export type UserListItemType = {
  id: number;
  avatar_url: string;
  login: string;
};

export type UserType = {
  avatar_url: string;
  name: string;
  location: string | null;
  bio: string | null;
  email: string | null;
  followers: number;
};

export type SearchResponseType<T> = {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
};

export type ReposType = {
  id: number;
  name: string;
  description: string | null;
  fork: boolean;
  stargazers_count: number
  forks: number
}

export type RepoSearchArgumentsType = {
  user: string,
  query?: string
}

// Helpers
export type ActionType = {
  type: string;
  payload?: any;
  error?: string | null;
};

export type ErrorType = {
  message: string | null;
};

export type FormSubmitActionPayloadType<T> = {
  resolve: (this: {}, ...args: any[]) => any;
  reject: (this: {}, ...args: any[]) => any;
  formData: T;
  formName?: string;
};

export type OptionsList = {
  text: string;
  value: string;
};

export type HashMapType<V, K = string> = {
  [key: K]: V;
};

export type SimpleHashMapType = HashMapType<string, string>;

declare global {
  interface Window {
    store: Store;
  }
}
