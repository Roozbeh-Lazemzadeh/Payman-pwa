// Persian number to English number converter
export const persianToEnglishNumber = (num: string) => {
  const persianNumbers = '۰۱۲۳۴۵۶۷۸۹';
  const englishNumbers = '0123456789';
  return num
    .split('')
    .map((char) =>
      persianNumbers.includes(char)
        ? englishNumbers[persianNumbers.indexOf(char)]
        : char
    )
    .join('');
};
