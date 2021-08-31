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
  const line1 = joinMatricesHorizontal(char['R'], char['u'], char['n'])
  const line2 = joinMatricesHorizontal(char['M'], char['S'])
  let matrix = joinMatricesVertical(line1)

  appendStandardBorders(matrix)

  fillTopAndBottomBorders(matrix)
  matrix = fillSideBorders(matrix)

  const png = createSvg(matrix)
  fs.writeFileSync('avatar.png', png)

  printMatrix(matrix)
}

main().catch(console.error)
