export const required = (translateKey: string) => (value: string): string | undefined => {
  return value ? undefined : translateKey;
};

export function isEmail(value: string): string | undefined {
  return !!value.match("^.+\\@\\S+\\.\\S+$") ? undefined : "Not valid email";
}

export function containsNumeric(value: string): string | undefined {
  return !!value.match("[0-9]") ? undefined : "Must contain numeric characters";
}

export function containsUppercase(value: string): string | undefined {
  return !!value.match("[A-Z]") ? undefined : "Must contain uppercase characters";
}

export function containsLowerCase(value: string): string | undefined {
  return !!value.match("[a-z]") ? undefined : "Must contain lowercase characters";
}

export function containsCharacter(value: string): string | undefined {
  return !!value.match(/[\^$*.[\]{}()?\-"!@#%&/\\,><':;|_~`]/)
    ? undefined
    : "Must contain one of ^ $ * . [ ] { } ( ) ? - \" ! @ # % & / \\ , > < ' : ; | _ ~ ` character";
}

export function requireValidUrl(value: string = ""): string | undefined {
  return value.match(
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i
  )
    ? undefined
    : "Not a valid URL";
}

export function passwordsMustMatch(value: string, allValues: any) {
  return value !== allValues.password ? "Passwords do not match" : undefined;
}

const maxLength = (length: number, translateKey: string) => (value: string): string | undefined => {
  return !value || value.length <= length ? undefined : translateKey;
};

const minLength = (length: number, translateKey: string) => (value: string): string | undefined => {
  return value.length >= length ? undefined : translateKey;
};
