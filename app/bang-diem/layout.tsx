import { Footer, Header } from 'layouts'

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
