import type { Metadata } from 'next'
import { Providers } from '@/components'
import { textFont } from '@/config/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Only-Cart',
    default: 'Only-Cart - Tu tienda de ropa, zapatos y juguetes con estilo'
  },
  description:
    'Only-Cart es una tienda de ropa, zapatos y juguetes con estilo. Encuentra los mejores productos para ti y tu familia.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <Providers>
        <body className={textFont.className}>{children}</body>
      </Providers >
    </html >
  )
}
