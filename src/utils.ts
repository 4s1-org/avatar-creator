import { char } from './chars/char'
import { Matrix } from './matrix'

export function formatChar(charMatrix: string): string[] {
  return charMatrix.trim().split('\n')
}

export function upperAlphabet(): Matrix {
  const matrix = new Matrix()
  matrix.addChar(char['A'])
  matrix.addChar(char['B'])
  matrix.addChar(char['C'])
  matrix.addChar(char['D'])
  matrix.addChar(char['E'])
  matrix.addChar(char['F'])
  matrix.newLine()
  matrix.addChar(char['G'])
  matrix.addChar(char['H'])
  matrix.addChar(char['I'])
  matrix.addChar(char['J'])
  matrix.addChar(char['K'])
  matrix.addChar(char['L'])
  matrix.newLine()
  matrix.addChar(char['M'])
  matrix.addChar(char['N'])
  matrix.addChar(char['O'])
  matrix.addChar(char['P'])
  matrix.addChar(char['Q'])
  matrix.addChar(char['R'])
  matrix.newLine()
  matrix.addChar(char['S'])
  matrix.addChar(char['T'])
  matrix.addChar(char['U'])
  matrix.addChar(char['V'])
  matrix.addChar(char['W'])
  matrix.addChar(char['X'])
  matrix.newLine()
  matrix.addChar(char['Y'])
  matrix.addChar(char['Z'])
  matrix.makeItPretty()
  matrix.print()
  return matrix
}
