import type { Metadata } from 'next'
import Footer from 'components/Footer'
import Header from 'components/Header'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="h-20" />
      {children}
      <div className="h-12" />
      <Footer />
    </>
  )
}
