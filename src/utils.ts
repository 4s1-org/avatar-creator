import { createCanvas } from 'canvas'

export type Matrix = string[]

export function formatMatrix(matrix: string): Matrix {
  return matrix.trim().split('\n')
}

export function joinMatrices(...matrices: Matrix[]): Matrix {
  const res: Matrix = []

  for (let lineNo = 0; lineNo < 7; lineNo++) {
    let firstChar = true
    for (const matrix of matrices) {
      if (!firstChar) {
        res[lineNo] += '--'
      } else {
        res[lineNo] = ''
      }
      firstChar = false

      res[lineNo] += matrix[lineNo]
    }
  }

  return res
}

export function appendStandardBorders(matrix: Matrix): void {
  const squaresPerLine = matrix[0].length

  // Top
  matrix.unshift('-'.repeat(squaresPerLine))
  // Bottom
  matrix.push('-'.repeat(squaresPerLine))

  for (let lineNo = 0; lineNo < matrix.length; lineNo++) {
    // Left and right
    matrix[lineNo] = `-${matrix[lineNo]}-`
  }
}

export function fillTopAndBottomBorders(matrix: Matrix): void {
  const existingColumns = matrix[0].length
  const existingRows = matrix.length
  let rowsToAppend = existingColumns - existingRows

  // First to append should be at the bottom
  let addToTop = false
  while (rowsToAppend > 0) {
    if (addToTop) {
      matrix.unshift('-'.repeat(existingColumns))
    } else {
      matrix.push('-'.repeat(existingColumns))
    }

    addToTop = !addToTop
    rowsToAppend--
  }
}

export function fillSideBorders(matrix: Matrix): void {
  const existingColumns = matrix[0].length
  const existingRows = matrix.length

  let columnsToAppend = existingRows - existingColumns

  // First to append should be at the right side
  let addToLeft = false
  while (columnsToAppend > 0) {
    if (addToLeft) {
      matrix = matrix.map((x) => `-${x}`)
    } else {
      matrix = matrix.map((x) => `${x}-`)
    }

    addToLeft = !addToLeft
    columnsToAppend--
  }
}

export function printMatrix(matrix: Matrix): void {
  for (const line of matrix) {
    console.log(line)
  }
  console.log()
  console.log('Rows:    ' + matrix.length)
  console.log('Columns: ' + matrix[0].length)
}

export function createSvg(matrix: Matrix): any {
  const canvas = createCanvas(200, 200)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#0f0'
  ctx.fillRect(0, 0, 50, 60)
  ctx.fillStyle = '#f00'
  ctx.fillRect(100, 100, 30, 20)

  // https://flaviocopes.com/canvas-node-generate-image/
  // https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-using-html-canvas

  const buffer = canvas.toBuffer('image/png')
  return buffer

  // const colCount = matrix[0].length
  // const rowCount = matrix.length
  // const boxPadding = 2
  // const boxSize = 98
  // const rounding = 5
  // const border = 3

  // for (let row = 0; row < rowCount; row++) {
  //   for (let col = 0; col < colCount; col++) {
  //     const x = boxSize * col + boxPadding / 2 + boxPadding * col
  //     const y = boxSize * row + boxPadding / 2 + boxPadding * row
  //     const letter = matrix[row][col]
  //     console.log('x: ' + x + ' y: ' + y + ' letter: ' + letter)

  //     const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  //     rect.setAttributeNS(null, 'x', x.toString())
  //     rect.setAttributeNS(null, 'y', y.toString())
  //     rect.setAttributeNS(null, 'width', boxSize.toString())
  //     rect.setAttributeNS(null, 'height', boxSize.toString())
  //     rect.setAttributeNS(null, 'rx', rounding.toString())
  //     rect.setAttributeNS(null, 'ry', rounding.toString())
  //     rect.setAttributeNS(null, 'stroke-width', border.toString())

  //     if (letter === 'x') {
  //       rect.setAttributeNS(null, 'fill', '#ffc107')
  //       rect.setAttributeNS(null, 'stroke', '#E0A800')
  //     } else if (letter === 'X') {
  //       rect.setAttributeNS(null, 'fill', '#c9302c')
  //       rect.setAttributeNS(null, 'stroke', '#ac2925')
  //     } else {
  //       rect.setAttributeNS(null, 'fill', '#fafafa')
  //       rect.setAttributeNS(null, 'stroke', '#ccc')
  //     }
  //   }
  // }
}
