import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 text-purple-400">
          Hi, I'm <span className="text-pink-300">Asma Drummond</span>!
        </h1>
        
        <p className="text-xl md:text-2xl text-purple-300 mb-8 leading-relaxed">
          Welcome to my portfolio! I'm a passionate developer building amazing web experiences 
          with modern technologies. Explore my work and get to know me better.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link 
            href="/about" 
            className="bg-pink-200 text-pink-800 px-8 py-3 rounded-lg font-semibold hover:bg-pink-300 transition-all shadow-sm"
          >
            Learn About Me
          </Link>
          <Link 
            href="/projects" 
            className="bg-purple-200 text-purple-800 px-8 py-3 rounded-lg font-semibold hover:bg-purple-300 transition-all shadow-sm"
          >
            View My Projects
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-pink-100">
            <div className="text-4xl mb-4">👤</div>
            <h3 className="text-xl font-bold mb-2 text-purple-400">About Me</h3>
            <p className="text-purple-300">
              Discover my background, skills, and what drives me as a developer.
            </p>
            <Link href="/about" className="text-pink-400 hover:text-pink-500 mt-4 inline-block font-semibold">
              Learn more →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-pink-100">
            <div className="text-4xl mb-4">💼</div>
            <h3 className="text-xl font-bold mb-2 text-pink-400">Projects</h3>
            <p className="text-pink-300">
              Check out my latest work and projects I've built.
            </p>
            <Link href="/projects" className="text-purple-400 hover:text-purple-500 mt-4 inline-block font-semibold">
              View projects →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-purple-100">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-xl font-bold mb-2 text-purple-400">Contact</h3>
            <p className="text-purple-300">
              Let's connect! Reach out for collaborations or just to say hello.
            </p>
            <Link href="/contact" className="text-pink-400 hover:text-pink-500 mt-4 inline-block font-semibold">
              Get in touch →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
