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

export function appendFixedSideBorders(matrix: Matrix): void {
  const res: Matrix = []

  for (let lineNo = 0; lineNo < matrix.length; lineNo++) {
    matrix[lineNo] = `--${matrix[lineNo]}--`
  }
}

export function appendTopAndBottomBorders(matrix: Matrix): void {
  const squaresPerLine = matrix[0].length
  const existingLines = matrix.length
  let lineCountToAppend = squaresPerLine - existingLines

  let addToTop = true
  while (lineCountToAppend > 0) {
    if (addToTop) {
      matrix.unshift('-'.repeat(squaresPerLine))
    } else {
      matrix.push('-'.repeat(squaresPerLine))
    }

    addToTop = !addToTop
    lineCountToAppend--
  }
}

export function printMatrix(matrix: Matrix): void {
  for (const line of matrix) {
    console.log(line)
  }
}
