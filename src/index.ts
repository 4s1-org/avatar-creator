#!/usr/bin/env node

import fs from 'fs'
import { Matrix } from './matrix'
import { Command } from 'commander'

const program = new Command()
program
  .description('Avatar Generator')
  .addHelpText(
    'after',
    `Example call:
  $ pnpm run start -- -f example.txt`,
  )
  .option('-f, --file [file]', 'input file')
  .parse(process.argv)
const options = program.opts()

if (options.file) {
  const template = fs.readFileSync(options.file, { encoding: 'utf-8' })
  const matrix = new Matrix()
  matrix.addTemplate(template)
  matrix.print()
  const png = matrix.createSvg()
  fs.writeFileSync('avatar.png', png)
} else {
  program.help()
}

// async function main(): Promise<void> {
//   const matrix = new Matrix()
//   matrix.addChar(char['A'])
//   matrix.addChar(char['G'])
//   matrix.makeItPretty()
//   matrix.print()
//   const png = matrix.createSvg()
//   fs.writeFileSync('avatar.png', png)
// }

// main().catch(console.error)
