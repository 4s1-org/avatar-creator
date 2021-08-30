#!/usr/bin/env node

import { char } from './chars/char'
import {
  appendStandardBorders,
  createSvg,
  fillSideBorders,
  fillTopAndBottomBorders,
  joinMatricesHorizontal,
  joinMatricesVertical,
  printMatrix,
} from './utils'
import fs from 'fs'

async function main(): Promise<void> {
  const line1 = joinMatricesHorizontal(char['S'], char['n'], char['o'], char['w'])
  const line2 = joinMatricesHorizontal(char['W'], char['h'], char['i'], char['t'], char['e'])
  let matrix = joinMatricesVertical(line1, line2)

  appendStandardBorders(matrix)

  fillTopAndBottomBorders(matrix)
  matrix = fillSideBorders(matrix)

  const png = createSvg(matrix)
  fs.writeFileSync('test.png', png)

  printMatrix(matrix)
}

main().catch(console.error)
