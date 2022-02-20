import { DefaultTheme } from "styled-components"

const color = {
  blue:{
    primaryBlue: '#2962ff',
  },
  white:{
    primaryWhite: '#f5f5f5',
  },
  achromatic:{
    primaryWhite: '#FAFAFA',
    white: '#FFFFFF',
    lightGray: '#e0e0e0',
    darkGray : "#929292",
    black: '#212121',
  },
}

export const theme = {
  ...color
}
export type Theme = typeof theme