import { createCanvas, NodeCanvasRenderingContext2D } from 'canvas'
import { Point } from './point'

export type Matrix = string[]

export function formatMatrix(matrix: string): Matrix {
  return matrix.trim().split('\n')
}

export function joinMatricesHorizontal(...matrices: Matrix[]): Matrix {
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

export function joinMatricesVertical(...matrices: Matrix[]): Matrix {
  const res: Matrix = []

  // ToDo: align

  let firstMatrix = true
  for (const matrix of matrices) {
    if (!firstMatrix) {
      res.push('-')
    }
    firstMatrix = false

    for (const line of matrix) {
      res.push(line)
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
  const columnCount = matrix[0].length
  const rowCount = matrix.length
  let rowsToAppend = columnCount - rowCount

  // First to append should be at the bottom
  let addToTop = false
  while (rowsToAppend > 0) {
    if (addToTop) {
      matrix.unshift('-'.repeat(columnCount))
    } else {
      matrix.push('-'.repeat(columnCount))
    }

    addToTop = !addToTop
    rowsToAppend--
  }
}

export function fillSideBorders(matrix: Matrix): void {
  const columnCount = matrix[0].length
  const rowCount = matrix.length

  let columnsToAppend = rowCount - columnCount

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
  const columnCount = matrix[0].length
  const rowCount = matrix.length

  const radius = 5
  const borderWidth = 4
  const squareSize = 50

  const yellowFill = '#ffc107'
  const yellowBorder = '#E0A800'
  const whiteFill = '#fafafa'
  const whiteBorder = '#ccc'

  const canvas = createCanvas(columnCount * squareSize, rowCount * squareSize)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // White squares
  for (let x = 0; x < columnCount; x++) {
    for (let y = 0; y < rowCount; y++) {
      const item = matrix[y][x]
      if (item === '-') {
        drawRoundedRect(ctx, x * squareSize, y * squareSize, squareSize, squareSize, radius, whiteFill, whiteBorder, borderWidth)
      }
    }
  }

  // Yellow squares
  for (let x = 0; x < columnCount; x++) {
    for (let y = 0; y < rowCount; y++) {
      const item = matrix[y][x]
      if (item === 'x') {
        drawRoundedRect(ctx, x * squareSize, y * squareSize, squareSize, squareSize, radius, yellowFill, yellowBorder, borderWidth)
      }
    }
  }

  const buffer = canvas.toBuffer('image/png')
  return buffer
}

function drawRoundedRect(
  ctx: NodeCanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fillStyle: string,
  strokeStyle: string,
  lineWidth: number,
): void {
  const xOffset = 0
  const yOffset = 0

  x += lineWidth / 2
  y += lineWidth / 2
  height -= lineWidth
  width -= lineWidth

  const leftTop = new Point(x + xOffset, y + yOffset)
  const rightTop = new Point(x + width - xOffset, y + yOffset)
  const leftBottom = new Point(x + xOffset, y + height - yOffset)
  const rightBottom = new Point(x + width - xOffset, y + height - yOffset)

  ctx.beginPath()
  ctx.moveTo(x + radius + yOffset, y + yOffset)
  // right (right top -> right bottom)
  ctx.arcTo(rightTop.x, rightTop.y, rightBottom.x, rightBottom.y, radius)
  // bottom (right bottom -> left bottom)
  ctx.arcTo(rightBottom.x, rightBottom.y, leftBottom.x, leftBottom.y, radius)
  // left (left bottom -> left top)
  ctx.arcTo(leftBottom.x, leftBottom.y, leftTop.x, leftTop.y, radius)
  // top (left top -> right top)
  ctx.arcTo(leftTop.x, leftTop.y, rightTop.x, rightTop.y, radius)

  if (strokeStyle) {
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = strokeStyle
    ctx.stroke()
  }

  if (fillStyle) {
    ctx.fillStyle = fillStyle
    ctx.fill()
  }
}
