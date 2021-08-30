#!/usr/bin/env node

import { char } from './chars/char'
import { appendStandardBorders, createSvg, fillSideBorders, fillTopAndBottomBorders, joinMatrices, printMatrix } from './utils'
import fs from 'fs'

async function main(): Promise<void> {
  const matrix = joinMatrices(char['A'], char['B'], char['B'], char['B'])

  appendStandardBorders(matrix)

  fillTopAndBottomBorders(matrix)
  fillSideBorders(matrix)

  const png = createSvg(matrix)
  fs.writeFileSync('test.png', png)

  printMatrix(matrix)
}

main().catch(console.error)
