const Month = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12
} as const;
export type MonthType = typeof Month[keyof typeof Month];

interface ErrorMessage {
  [key: string]: string;
}
export const MESSAGE: ErrorMessage = {
  "0001": 'ログインに失敗しました'
} as const;
export type MESSAGE = typeof MESSAGE[keyof typeof MESSAGE];
