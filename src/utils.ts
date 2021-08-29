export function formatMatrix(matrix: string): string {
  return matrix.trim()
}

export function joinMatrices(...matrices: string[]): string {
  let res = ''

  for (let i = 0; i < 7; i++) {
    let firstChar = true
    for (const matrix of matrices) {
      if (!firstChar) {
        res += '--'
      }
      firstChar = false

      res += matrix.split('\n')[i]
    }

    if (i < 6) {
      res += '\n'
    }
  }

  return res
}
