#!/usr/bin/env node

import { char } from './chars/char'
import { upperA } from './chars/upper-letter/upper-a'
import { appendFixedSideBorders, appendTopAndBottomBorders, joinMatrices, printMatrix } from './utils'

const yellowFill = '#ffc107'
const yellowBorder = '#E0A800'
const redFill = '#c9302c'
const redBorder = '#ac2925'
const whiteFill = '#fafafa'
const whiteBorder = '#ccc'

async function main(): Promise<void> {
  const matrix = joinMatrices(char['A'], char['B'])
  appendFixedSideBorders(matrix)
  appendTopAndBottomBorders(matrix)

  printMatrix(matrix)
}

main().catch(console.error)
