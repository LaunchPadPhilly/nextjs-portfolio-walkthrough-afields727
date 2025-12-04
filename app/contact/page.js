import Link from 'next/link'

export default function Contact() {
  return (
    <div className="min-h-screen p-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center text-pink-400">
          Get In Touch
        </h1>
        <p className="text-xl text-purple-300 text-center mb-12">
          I'd love to hear from you! Feel free to reach out through any of these channels.
        </p>

        <div className="bg-white rounded-lg shadow-sm border border-pink-100 p-8 md:p-12 mb-8">
          <div className="space-y-8">
            {/* Email */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors border border-pink-100">
              <div className="text-5xl">📧</div>
              <div className="flex-grow">
                <p className="font-bold text-purple-400 text-lg mb-1">Email</p>
                <a 
                  href="mailto:adrum0070@launchpadphilly.org" 
                  className="text-pink-500 hover:text-pink-600 hover:underline text-lg"
                >
                  adrum0070@launchpadphilly.org
                </a>
                <p className="text-sm text-gray-500 mt-1">I'll respond within 48 hours!</p>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors border border-purple-100">
              <div className="text-5xl">🔗</div>
              <div className="flex-grow">
                <p className="font-bold text-purple-400 text-lg mb-1">LinkedIn</p>
                <a 
                  href="https://www.linkedin.com/in/asma-d-6337b231b" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:text-purple-600 hover:underline text-lg"
                >
                  linkedin.com/in/asma-d-6337b231b
                </a>
                <p className="text-sm text-gray-500 mt-1">Connect with me professionally</p>
              </div>
            </div>

            {/* GitHub */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors border border-pink-100">
              <div className="text-5xl">💻</div>
              <div className="flex-grow">
                <p className="font-bold text-pink-400 text-lg mb-1">GitHub</p>
                <a 
                  href="https://github.com/asmadrummond" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-600 hover:underline text-lg"
                >
                  github.com/asmadrummond
                </a>
                <p className="text-sm text-gray-500 mt-1">Check out my code and contributions</p>
              </div>
            </div>

            {/* Twitter/X (Optional) */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors border border-purple-100">
              <div className="text-5xl">🐦</div>
              <div className="flex-grow">
                <p className="font-bold text-purple-400 text-lg mb-1">Twitter / X</p>
                <a 
                  href="https://twitter.com/asmadrummond" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:text-purple-600 hover:underline text-lg"
                >
                  @asmadrummond
                </a>
                <p className="text-sm text-gray-500 mt-1">Follow me for updates and thoughts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-sm border border-pink-100 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-4 text-pink-400">Let's Work Together</h2>
          <p className="text-purple-300 mb-6 leading-relaxed">
            I'm always interested in hearing about new opportunities, whether it's a 
            freelance project, collaboration, or just a friendly chat about web development. 
            Don't hesitate to reach out!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/projects" 
              className="bg-purple-200 text-purple-800 px-6 py-3 rounded-lg font-semibold hover:bg-purple-300 transition-all shadow-sm text-center"
            >
              View My Projects
            </Link>
            <Link 
              href="/about" 
              className="bg-pink-200 text-pink-800 px-6 py-3 rounded-lg font-semibold hover:bg-pink-300 transition-all shadow-sm text-center"
            >
              Learn More About Me
            </Link>
          </div>
        </div>

        {/* Response Time Info */}
        <div className="mt-8 text-center text-purple-300">
          <p className="text-sm">
            💡 <strong>Response Time:</strong> I typically respond within 24-48 hours
          </p>
        </div>
      </div>
    </div>
  )
}
