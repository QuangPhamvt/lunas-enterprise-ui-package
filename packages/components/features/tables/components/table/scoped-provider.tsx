import { memo, useMemo } from 'react';

/**
 * Builds a memoised `<Context.Provider>` wrapper component from a plain
 * `{ ...value, children }` prop shape, so each UITable render-scope context
 * (inner-wrapper, inner-table, head-row, body, row) doesn't need its own
 * hand-written `memo` + `useMemo` boilerplate.
 *
 * The resulting component still re-renders its subtree only when one of the
 * value fields actually changes — `useMemo`'s deps array is the field values
 * themselves, the same shallow comparison a manually written dependency list
 * would perform.
 */
export function createScopedProvider<TValue extends Record<string, unknown>>(Context: React.Context<TValue | null>, displayName: string) {
  const ScopedProvider = memo<React.PropsWithChildren<TValue>>(({ children, ...value }) => {
    // biome-ignore lint/correctness/useExhaustiveDependencies: deps are every field of `value`, whose shape is fixed by TValue at each call site
    const contextValue = useMemo(() => value as unknown as TValue, Object.values(value));
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  });
  ScopedProvider.displayName = displayName;
  return ScopedProvider;
}
