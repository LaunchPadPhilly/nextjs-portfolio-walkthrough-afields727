import Image from 'next/image'

export default function About() {
  return (
    <div className="min-h-screen p-8 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-12 text-center text-purple-400">
          About Me
        </h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-pink-100 p-8 md:p-12 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
            {/* Profile photo */}
            <div className="flex-shrink-0">
              <Image 
                src="/profile.jpg"
                alt="Profile photo"
                width={300}
                height={300}
                className="rounded-full border-4 border-pink-200 shadow-sm"
              />
            </div>
            
            {/* Bio */}
            <div className="flex-grow">
              <h2 className="text-3xl font-bold mb-4 text-pink-400">Hello! I'm Asma Drummond</h2>
              <p className="text-lg text-purple-300 leading-relaxed mb-4">
                I'm an aspiring UX designer with a passion for creating beautiful, user-centered digital experiences. 
                I love combining my creative side with technical skills to build interfaces that are both visually 
                appealing and intuitive to use.
              </p>
              <p className="text-lg text-purple-300 leading-relaxed mb-4">
                When I'm not designing, I'm exploring digital art and coding. Digital art allows me to express 
                my creativity and experiment with visual aesthetics, while coding gives me the power to bring 
                my designs to life. I believe the best user experiences come from the perfect blend of art and 
                technology.
              </p>
              <p className="text-lg text-purple-300 leading-relaxed">
                My goal is to continue growing as a UX designer, learning new tools and techniques that help me 
                create meaningful connections between users and the digital products they interact with every day.
              </p>
            </div>
          </div>
          </div>
        </div>
        </div>
        {/* Skills */}

        {/* Skills Section */}
        <div className="bg-white rounded-lg shadow-sm border border-purple-100 p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-purple-400">My Skills</h2>
          <div className="flex flex-wrap gap-3">
            <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full font-semibold">
              HTML & CSS
            </span>
            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold">
              JavaScript
            </span>
            <span className="bg-pink-200 text-pink-800 px-4 py-2 rounded-full font-semibold">
              React
            </span>
            <span className="bg-purple-200 text-purple-800 px-4 py-2 rounded-full font-semibold">
              Next.js
            </span>
            <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full font-semibold">
              Tailwind CSS
            </span>
            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold">
              Git & GitHub
            </span>
            <span className="bg-pink-200 text-pink-800 px-4 py-2 rounded-full font-semibold">
              Node.js
            </span>
            <span className="bg-purple-200 text-purple-800 px-4 py-2 rounded-full font-semibold">
              Responsive Design
            </span>
          </div>
        </div>

        {/* Goals/Interests Section */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg shadow-sm border border-pink-100 p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-pink-400">What I'm Learning</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-pink-100">
              <h3 className="text-xl font-bold mb-3 text-purple-400">Current Focus</h3>
              <ul className="space-y-2 text-purple-300">
                <li>• Advanced React patterns and hooks</li>
                <li>• Full-stack development with Next.js</li>
                <li>• Database design and optimization</li>
                <li>• API development and integration</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-purple-100">
              <h3 className="text-xl font-bold mb-3 text-pink-400">Future Goals</h3>
              <ul className="space-y-2 text-pink-300">
                <li>• Build scalable web applications</li>
                <li>• Contribute to open-source projects</li>
                <li>• Master cloud deployment and DevOps</li>
                <li>• Create impactful digital experiences</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    
  )
}
