#!/usr/bin/env node

import { char } from './chars/char'
import fs from 'fs'
import { Matrix } from './matrix'

async function main(): Promise<void> {
  const matrix = new Matrix()
  matrix.addChar(char['A'])
  matrix.addChar(char['G'])
  matrix.makeItPretty()
  matrix.print()
  const png = matrix.createSvg()
  fs.writeFileSync('avatar.png', png)
}

main().catch(console.error)
