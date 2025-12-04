export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-white/90 backdrop-blur-sm border-t border-purple-100 text-center p-8 mt-auto">
      <div className="max-w-7xl mx-auto">
        <p className="text-gray-600">
          © {currentYear} Asma Drummond. Built with Next.js and Tailwind CSS
        </p>
      </div>
    </footer>
  )
}

