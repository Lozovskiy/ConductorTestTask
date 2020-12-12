import { OptionsList } from "types/common";

export const arrayOfObjectsToOptionList = (
  arr: Array<{ [key: string]: any }>,
  textKey: string,
  valueKey: string
): OptionsList[] =>
  arr.map(
    (item: { [key: string]: string }): OptionsList => ({
      text: item[textKey],
      value: item[valueKey],
    })
  );

export const arrayOfStringsToOptionList = (arr: string[]): OptionsList[] =>
  arr.map(
    (item: string): OptionsList => ({
      text: item,
      value: item,
    })
  );
