import { Newsreader } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from './components/Footer'

const newsreader = Newsreader({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  adjustFontFallback: false,
})

const inter = Inter({ subsets: ['latin'] })

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
      <body className="bg-surface">
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
} 