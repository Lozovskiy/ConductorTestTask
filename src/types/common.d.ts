
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