import React from 'react'
import type { Metadata } from 'next'

import { fonts } from '@/app/fonts'
import { Providers } from '@/app/providers'

import './ui/globals.css'

export const metadata: Metadata = {
  title: 'Book Scout',
  description: 'Find your next book'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={fonts.inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
