#!/usr/bin/env node
/**
 * Fails when a public export, or a prop declared by a public `*Props` type, has no JSDoc.
 *
 * "Public" means reachable from a build entry in `tsdown.config.ts`. Props inherited from
 * node_modules (e.g. native `<div>` attributes) are skipped — only props this library declares
 * itself must be documented.
 *
 *   node scripts/check-jsdoc.mjs
 */
import { readFileSync } from 'node:fs';
import { relative } from 'node:path';

import ts from 'typescript';

const config = readFileSync('tsdown.config.ts', 'utf8');
const entries = [...config.matchAll(/'\.\/(packages\/components\/[^']+)'/g)].map(match => match[1]);

const program = ts.createProgram(entries, {
  jsx: ts.JsxEmit.ReactJSX,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  baseUrl: '.',
  paths: { '@/*': ['packages/*'] },
  skipLibCheck: true,
});
const checker = program.getTypeChecker();

const isOwn = node => !node.getSourceFile().fileName.includes('node_modules');
const hasDoc = symbol => ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim().length > 0;
const where = node => relative('packages/components', node.getSourceFile().fileName);

const seen = new Set();
const missing = [];

for (const entry of entries) {
  const sourceFile = program.getSourceFile(entry);
  const moduleSymbol = sourceFile && checker.getSymbolAtLocation(sourceFile);
  if (!moduleSymbol) continue;

  for (let symbol of checker.getExportsOfModule(moduleSymbol)) {
    if (symbol.flags & ts.SymbolFlags.Alias) symbol = checker.getAliasedSymbol(symbol);
    const declaration = symbol.declarations?.[0];
    if (!declaration || !isOwn(declaration)) continue;

    const key = `${declaration.getSourceFile().fileName}:${symbol.name}`;
    if (seen.has(key)) continue;
    seen.add(key);

    if (!hasDoc(symbol)) missing.push(`${where(declaration)}  ${symbol.name}`);

    const isPropsType = symbol.flags & (ts.SymbolFlags.TypeAlias | ts.SymbolFlags.Interface) && symbol.name.endsWith('Props');
    if (!isPropsType) continue;
    for (const prop of checker.getDeclaredTypeOfSymbol(symbol).getProperties()) {
      const propDeclaration = prop.declarations?.[0];
      if (propDeclaration && isOwn(propDeclaration) && !hasDoc(prop)) {
        missing.push(`${where(propDeclaration)}  ${symbol.name}.${prop.name}`);
      }
    }
  }
}

if (missing.length > 0) {
  console.error(`${missing.length} public export(s)/prop(s) without JSDoc:\n`);
  for (const line of missing.sort()) console.error(`  ${line}`);
  process.exit(1);
}
console.log(`JSDoc check passed (${seen.size} public exports).`);
