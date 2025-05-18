import { Inter, Pacifico, Rubik } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik'
})

const pacifico = Pacifico({
  subsets: ['latin'],
  variable: '--font-pacifico',
  weight: '400'
})

export const fonts = {
  inter,
  rubik,
  pacifico
}
