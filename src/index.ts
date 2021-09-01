#!/usr/bin/env node

import { char } from './chars/char'
import fs from 'fs'
import { Matrix } from './matrix'

async function main(): Promise<void> {
  const matrix = new Matrix()
  matrix.addChar(char['R'])
  matrix.addChar(char['u'])
  matrix.newLine()
  matrix.addChar(char['s'])
  matrix.makeItPretty()
  matrix.print()

  const png = matrix.createSvg()
  fs.writeFileSync('avatar.png', png)
}

main().catch(console.error)
