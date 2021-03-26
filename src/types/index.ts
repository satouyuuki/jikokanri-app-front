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

// export type MonthKey = 'month' | 'year';
// const Year = (() => {
//   const array = [];
//   const end = 2099;
//   for (let i = 2021; i < end; i++) {
//     array.push(i);
//   }
//   const str = array.join('|');
//   return str;
// })();
// export type YearType = typeof Year;
