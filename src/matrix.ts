import { Bootstrap3Color } from '@4s1/toolbox'
import { createCanvas, NodeCanvasRenderingContext2D } from 'canvas'
import { Point } from './point'
import convert from 'color-convert'
import { SquareColor } from './square-color'

export class Matrix {
  private data: string[] = []
  private charHeight = 7
  private charSpaceCount = 2
  private rowSpaceCount = 1
  private firstCharInRow = true

  public constructor() {
    this.newLine()
  }

  public newLine(): void {
    this.firstCharInRow = true

    // add empty space between rows
    if (this.data.length > 0) {
      for (let i = 0; i < this.rowSpaceCount; i++) {
        this.data.push('')
      }
    }

    for (let i = 0; i < this.charHeight; i++) {
      this.data.push('')
    }
  }

  public get rowCount(): number {
    return this.data.length
  }

  public addChar(char: string[]): void {
    const space = this.firstCharInRow ? '' : '-'.repeat(this.charSpaceCount)

    for (let i = 0; i < this.charHeight; i++) {
      this.data[this.rowCount - this.charHeight + i] += space + char[i]
    }

    this.firstCharInRow = false
  }

  public print(): void {
    for (const line of this.data) {
      console.log(line)
    }
    console.log()
    console.log('Rows:    ' + this.data.length)
    console.log('Columns: ' + this.data[0].length)
  }

  public makeItPretty(): void {
    // append top space
    this.data.unshift('')
    // append bottom space
    this.data.push('')
    // append side space
    this.data = this.data.map((x) => `-${x}-`)

    const rowCount = this.data.length
    let columnCount = this.getLongestRowCount()

    if (rowCount > columnCount) {
      // more rows than columns
      columnCount = this.data.length
    } else if (rowCount < columnCount) {
      // more columns than rows
      this.appendBorderRows(columnCount - rowCount)
    }

    this.align(columnCount)
  }

  private appendBorderRows(count: number): void {
    // First to append should be at the bottom
    let addToTop = false
    while (count > 0) {
      if (addToTop) {
        this.data.unshift('')
      } else {
        this.data.push('')
      }

      addToTop = !addToTop
      count--
    }
  }

  private getLongestRowCount(): number {
    let longestRow = 0
    for (let i = 0; i < this.data.length; i++) {
      const rowLength = this.data[i].length
      if (rowLength > longestRow) {
        longestRow = rowLength
      }
    }
    return longestRow
  }

  private align(rowLengthShouldBe: number): void {
    // First to append should be at the right side
    for (let i = 0; i < this.data.length; i++) {
      const rowLength = this.data[i].length
      let appendCount = rowLengthShouldBe - rowLength

      let addToLeft = false
      while (appendCount > 0) {
        if (addToLeft) {
          this.data[i] = `-${this.data[i]}`
        } else {
          this.data[i] = `${this.data[i]}-`
        }

        addToLeft = !addToLeft
        appendCount--
      }
    }
  }

  public createSvg(): any {
    const columnCount = this.data[0].length
    const rowCount = this.data.length

    const radius = 5
    const borderWidth = 4
    const squareSize = 50

    const canvas = createCanvas(columnCount * squareSize, rowCount * squareSize)
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let x = 0; x < columnCount; x++) {
      for (let y = 0; y < rowCount; y++) {
        const color = this.getColor(this.data[y][x])
        this.drawRoundedRect(
          ctx,
          x * squareSize,
          y * squareSize,
          squareSize,
          squareSize,
          radius,
          color.fillColor,
          color.borderColor,
          borderWidth,
        )
      }
    }

    const buffer = canvas.toBuffer('image/png')
    return buffer
  }

  private drawRoundedRect(
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

  private getColor(char: string): SquareColor {
    switch (char) {
      case '-':
        return new SquareColor('#ffffff')
      case 'r':
        return new SquareColor(Bootstrap3Color.red)
      case 'b':
        return new SquareColor(Bootstrap3Color.blue)
      case 'g':
        return new SquareColor(Bootstrap3Color.green)
      case 'c':
        return new SquareColor(Bootstrap3Color.cyan)
      case 'x':
      case 'y':
      default:
        return new SquareColor(Bootstrap3Color.yellow)
    }
  }
}
