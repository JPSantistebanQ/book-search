import type { Metadata } from 'next'

import { fonts } from '@/app/fonts'
import { Providers } from '@/app/providers'

import './ui/globals.css'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={fonts.inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
