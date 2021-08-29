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
