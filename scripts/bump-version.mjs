#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const pkgPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))

const [, y, z] = pkg.version.split('.').map(Number)
const [nextY, nextZ] = z >= 99 ? [y + 1, 0] : [y, z + 1]
pkg.version = `0.${nextY}.${nextZ}`

writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
console.log(`version bumped to ${pkg.version}`)
