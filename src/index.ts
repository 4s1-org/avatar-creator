#!/usr/bin/env node

import { char } from './chars/char'
import { appendStandardBorders, createSvg, fillSideBorders, fillTopAndBottomBorders, joinMatrices, printMatrix } from './utils'
import fs from 'fs'

const yellowFill = '#ffc107'
const yellowBorder = '#E0A800'
const redFill = '#c9302c'
const redBorder = '#ac2925'
const whiteFill = '#fafafa'
const whiteBorder = '#ccc'

async function main(): Promise<void> {
  const matrix = joinMatrices(char['A'], char['B'])
  //const matrix = joinMatrices(char['A'])

  appendStandardBorders(matrix)

  fillTopAndBottomBorders(matrix)
  fillSideBorders(matrix)

  const png = createSvg(matrix)
  fs.writeFileSync('test.png', png)

  printMatrix(matrix)
}

main().catch(console.error)
