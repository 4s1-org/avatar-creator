#!/usr/bin/env node

import { char } from './chars/char'
import { joinMatrices } from './utils'

const yellowFill = '#ffc107'
const yellowBorder = '#E0A800'
const redFill = '#c9302c'
const redBorder = '#ac2925'
const whiteFill = '#fafafa'
const whiteBorder = '#ccc'

async function main(): Promise<void> {
  console.log('---')
  console.log(joinMatrices(char['A'], char['B'], char['C']))
  console.log('---')
}

main().catch(console.error)
