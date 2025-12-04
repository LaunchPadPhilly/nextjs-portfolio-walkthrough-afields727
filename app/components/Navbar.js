import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-purple-100 border-b border-purple-200 shadow-sm sticky top-0 z-50" style={{ backgroundColor: '#f3e8ff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Name */}
          <Link href="/" className="text-2xl font-bold text-purple-400 hover:text-purple-500 transition-colors">
            Asma Drummond
          </Link>
          
          {/* Navigation links */}
          <div className="flex gap-6">
            <Link 
              href="/" 
              className="text-purple-400 hover:text-pink-400 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-purple-400 hover:text-pink-400 transition-colors font-medium"
            >
              About
            </Link>
            <Link 
              href="/projects" 
              className="text-purple-400 hover:text-pink-400 transition-colors font-medium"
            >
              Projects
            </Link>
            <Link 
              href="/contact" 
              className="text-purple-400 hover:text-pink-400 transition-colors font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

