import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Prashniel Kumar',
  description: 'Portfolio by Prashniel Kumar created using Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
// I got job yey