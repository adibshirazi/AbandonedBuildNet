import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Abandoned Place Prediction',
  description: 'Created By ASH',
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
