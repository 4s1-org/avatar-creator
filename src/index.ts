#!/usr/bin/env node

import { char } from './chars/char'
import fs from 'fs'
import { Matrix } from './matrix'

async function main(): Promise<void> {
  const matrixNew = new Matrix()
  matrixNew.addChar(char['R'])
  matrixNew.addChar(char['u'])
  matrixNew.newLine()
  matrixNew.addChar(char['s'])
  matrixNew.makeItPretty()
  matrixNew.print()

  const png = matrixNew.createSvg()
  fs.writeFileSync('avatar.png', png)
}

main().catch(console.error)
