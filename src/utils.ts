import { createCanvas, NodeCanvasRenderingContext2D } from 'canvas'
import { Point } from './point'

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
  const radius = 5
  const borderWidth = 4
  const squareSize = 50

  const canvas = createCanvas(110, 110)
  const ctx = canvas.getContext('2d')

  // Wichtig: Erst die weißen Kästchen, dann die gelben!

  drawRoundedRect(ctx, 0, 0, 50, squareSize, radius, '#f00', '#0f0', borderWidth)
  drawRoundedRect(ctx, 50, 0, 50, squareSize, radius, '#0f0', '#f00', borderWidth)
  drawRoundedRect(ctx, 0, 50, 50, squareSize, radius, '#0f0', '#00f', borderWidth)
  drawRoundedRect(ctx, 50, 50, 50, squareSize, radius, '#f00', '#f0f', borderWidth)

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
  const xOffset = 10
  const yOffset = 10

  x += 2
  y += 2
  height -= 5
  width -= 5

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
