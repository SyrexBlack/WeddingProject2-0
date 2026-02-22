/**
 * Русская плюрализация (склонение) для числительных.
 *
 * Правила:
 * - n % 10 === 1 && n % 100 !== 11 → one (1 день)
 * - n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) → few (2 дня)
 * - else → many (5 дней)
 *
 * Возвращает только форму слова, без числа.
 */
export function pluralize(n: number, one: string, few: string, many: string): string {
  const abs = Math.abs(n);
  const mod10 = abs % 10;
  const mod100 = abs % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return one;
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return few;
  }

  return many;
}
