/**
 * Diacritic-insensitive so "dien thoai" matches "Điện thoại" — necessary for this Vietnamese-facing
 * library. `đ`/`Đ` is folded to `d`/`D` as an explicit extra step: unlike `ệ`/`ạ` (a base letter plus a
 * combining mark that NFD splits apart), Vietnamese `đ` is its own base codepoint with no combining-mark
 * decomposition, so `\p{Diacritic}` stripping alone leaves it untouched.
 */
export function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/đ/g, 'd')
    .trim();
}

/** Case- and diacritic-insensitive substring match. An empty/whitespace-only query matches everything. */
export function matchesSearch(label: string, query: string): boolean {
  if (query.trim() === '') return true;
  return normalizeSearchText(label).includes(normalizeSearchText(query));
}
