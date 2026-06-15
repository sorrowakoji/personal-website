import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Sorrow Akoji',
  description:
    'Official website of Sorrow Akoji — VTuber, gamer, and teacher. Watch streams, teaching basic skills, read game reviews, commission videos, and explore fanart.',
  keywords: ['vtuber', 'streaming', 'gaming', 'teaching', 'fanart', 'commission'],
  openGraph: {
    title: 'Sorrow Akoji — VTuber',
    description: 'Official VTuber website — streams, reviews, commissions & fanart',
    type: 'website',
  },
  themeColor: '#7346ef',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} dark bg-background`}
    >
      <body className="font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
