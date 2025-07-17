// 검증 관련 상수
export const VALIDATION_RULES = {
  NAME_REGEX: /^[\p{Script=Hangul}]+$/u,
  NAME_MIN_LENGTH: 2,
  YEAR_REGEX: /^\d{4}$/,
  MONTH_REGEX: /^\d{2}$/,
  DAY_REGEX: /^\d{2}$/,
  MIN_AGE: 15,
};

// 이름이 한글만으로 이루어졌는지
export function isKoreanOnly(name: string): boolean {
  return VALIDATION_RULES.NAME_REGEX.test(name);
}

// 이름이 최소 길이 이상인지
export function isMinLength(str: string, min: number): boolean {
  return str.length >= min;
}

// 이름 입력값에서 한글만 남기기
export function filterKorean(input: string): string {
  return input.replace(/[A-Za-z\u{1F000}-\u{1FFFF}]/gu, '');
}

// 연도 형식이 맞는지
export function isValidYearFormat(year: string): boolean {
  return VALIDATION_RULES.YEAR_REGEX.test(year);
}

// 월 형식이 맞는지
export function isValidMonthFormat(month: string): boolean {
  return VALIDATION_RULES.MONTH_REGEX.test(month);
}

// 일 형식이 맞는지
export function isValidDayFormat(day: string): boolean {
  return VALIDATION_RULES.DAY_REGEX.test(day);
}

// 나이 계산
export function calculateAge(year: number, month: number, day: number): number {
  const today = new Date();
  let age = today.getFullYear() - year;
  if (
    today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day)
  ) {
    age--;
  }
  return age;
}

// 최소 나이 이상인지
export function isMinimumAge(
  year: number,
  month: number,
  day: number,
  minAge: number
): boolean {
  return calculateAge(year, month, day) >= minAge;
}

// 실제로 존재하는 날짜인지
export function isValidDate(year: number, month: number, day: number): boolean {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}
