#!/usr/bin/env node

import fs from 'fs'
import { Matrix } from './matrix'
import { Command } from 'commander'
import { char } from './chars/char'

const program = new Command()
program
  .description('Avatar Generator')
  .addHelpText(
    'after',
    `Example calls:
  $ pnpm run start -- -f example.txt
  $ pnpm run start -- -t "Lorem Ipsum"`,
  )
  .option('-f, --file [file]', 'input file')
  .option('-t, --text [text]', 'input text')
  .parse(process.argv)
const options = program.opts()

if (options.file) {
  const template = fs.readFileSync(options.file, { encoding: 'utf-8' })
  const matrix = new Matrix()
  matrix.addTemplate(template)
  matrix.print()
  const png = matrix.createSvg()
  fs.writeFileSync('avatar.png', png)
} else if (options.text) {
  const matrix = new Matrix()
  for (let i = 0; i < options.text.length; i++) {
    const sign = options.text[i] as string
    if (sign === ' ') {
      matrix.newLine()
    } else {
      if (Object.prototype.hasOwnProperty.call(char, sign)) {
        // @ts-ignore
        matrix.addChar(char[sign])
      } else {
        matrix.addChar(char.fail)
      }
    }
  }
  matrix.makeItPretty()
  matrix.print()
  const png = matrix.createSvg()
  fs.writeFileSync('avatar.png', png)
} else {
  program.help()
}
