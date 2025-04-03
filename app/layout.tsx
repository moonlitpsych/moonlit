import { Newsreader } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'
import Footer from './components/Footer'

const newsreader = Newsreader({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  title: 'Moonlit Psychiatry',
  description: 'Fast, discreet psychiatric care in Utah',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${newsreader.variable} font-serif`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-[#FEF8F1]">
        {children}
        <Footer />
      </body>
    </html>
  )
} 