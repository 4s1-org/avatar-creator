import convert from 'color-convert'

export class SquareColor {
  public readonly borderColor: string

  constructor(public readonly fillColor: string, darken = 10) {
    const hslColoredBox = convert.hex.hsl.raw(fillColor)
    hslColoredBox[2] -= darken
    this.borderColor = `#${convert.hsl.hex(hslColoredBox)}`
  }
}
