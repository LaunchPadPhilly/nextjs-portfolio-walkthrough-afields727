import './globals.css'
import './about/dashboard.css'
import './projects/dashboard.css'
import './contact/dashboard.css'
import PixelBackground from './components/PixelBackground'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Portfolio',
  description: 'A Next.js portfolio website showcasing my projects and skills',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col relative`}>
        <PixelBackground />
        <Navbar />

        <main className="grow pt-16 relative z-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}
