/* theme.ts */
import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const sizes = {
  sizes: {
    max: 'max-content',
    min: 'min-content',
    full: '100%',
    '3xs': '14rem',
    '2xs': '16rem',
    xs: '20rem',
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    '2xl': '42rem',
    '3xl': '48rem',
    '4xl': '56rem',
    '5xl': '64rem',
    '6xl': '72rem',
    '7xl': '80rem',
    '8xl': '90rem',
    container: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    }
  }
}

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: false
}

export const theme = extendTheme({
  config,
  fonts: {
    heading: 'var(--font-rubik)',
    body: 'var(--font-rubik)'
  }
})
