#!/usr/bin/env node
/**
 * Copies each implementation's JSDoc onto its `lazy()` wrapper in the feature barrels.
 *
 * The barrels below re-export components through `lazyField(...)` / `lazyChart(...)` wrappers so
 * each one loads on demand. A wrapper is a new symbol, so without this its editor hover would be
 * empty even though the implementation is documented. Run after editing a lazy component's JSDoc:
 *
 *   node scripts/sync-lazy-docs.mjs          # rewrite the barrels
 *   node scripts/sync-lazy-docs.mjs --check  # exit 1 if any wrapper doc is missing or stale
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const BARRELS = [
  'packages/components/features/charts/index.tsx',
  'packages/components/features/tables/index.tsx',
  'packages/components/features/tanstack-form/tanstack-form.tsx',
];

const WRAPPER = /^const (\w+) = lazy(?:Field|Chart)?<[\s\S]*?\(\s*\(\) =>\s*import\('([^']+)'\)\.then\(\s*m => \(\{ default: m\.(\w+)/gm;
const check = process.argv.includes('--check');

/** Returns the JSDoc block directly above `name`'s declaration in the module at `path`. */
function implementationDoc(barrelDir, path, name) {
  const file = ['.tsx', '.ts'].map(ext => join(barrelDir, path + ext)).find(existsSync);
  if (!file) return null;
  const source = readFileSync(file, 'utf8');
  const decl = new RegExp(`^(?:export )?(?:const|function) ${name}\\b`, 'm').exec(source);
  if (!decl) return null;
  const before = source.slice(0, decl.index).trimEnd();
  if (!before.endsWith('*/')) return null;
  return before.slice(before.lastIndexOf('/**'));
}

/** Splits `source` before `index` into [text without a trailing JSDoc, that JSDoc or null]. */
function splitTrailingDoc(source, index) {
  const before = source.slice(0, index);
  const trimmed = before.trimEnd();
  if (!trimmed.endsWith('*/')) return [before, null];
  const start = trimmed.lastIndexOf('/**');
  return [before.slice(0, start), trimmed.slice(start)];
}

let problems = 0;
for (const barrel of BARRELS) {
  const source = readFileSync(barrel, 'utf8');
  const matches = [...source.matchAll(WRAPPER)];
  let output = source;
  // Walk backwards so earlier indexes stay valid while splicing.
  for (const match of matches.reverse()) {
    const [, wrapper, path, impl] = match;
    const doc = implementationDoc(dirname(barrel), path, impl);
    if (!doc) {
      console.error(`${barrel}: ${wrapper} — ${impl} in ${path} has no JSDoc`);
      problems++;
      continue;
    }
    const [head, current] = splitTrailingDoc(output, match.index);
    if (current === doc) continue;
    if (check) {
      console.error(`${barrel}: ${wrapper} JSDoc is ${current ? 'stale' : 'missing'}`);
      problems++;
      continue;
    }
    output = `${head}${doc}\n${output.slice(match.index)}`;
  }
  if (!check && output !== source) writeFileSync(barrel, output);
}

if (problems) {
  console.error(check ? `\n${problems} wrapper doc(s) out of sync — run: node scripts/sync-lazy-docs.mjs` : `\n${problems} problem(s)`);
  process.exit(1);
}
console.log(check ? 'Lazy wrapper docs are in sync.' : 'Lazy wrapper docs synced.');
