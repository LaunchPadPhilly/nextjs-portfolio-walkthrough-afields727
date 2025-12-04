import Image from 'next/image'

export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online store with shopping cart, user authentication, and payment integration. Built with modern web technologies for a seamless shopping experience.",
      image: "https://placehold.co/600x400/fbcfe8/9f1239?text=E-Commerce+Platform",
      technologies: ["Next.js", "React", "Tailwind CSS", "Stripe"],
      status: "Completed"
    },
    {
      title: "Task Management App",
      description: "A productivity application that helps teams organize and track their work. Features include drag-and-drop functionality, real-time updates, and team collaboration tools.",
      image: "https://placehold.co/600x400/e9d5ff/6b21a8?text=Task+Manager",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      status: "In Progress"
    },
    {
      title: "Weather Dashboard",
      description: "A beautiful weather application that displays current conditions and forecasts. Includes location-based services and interactive maps for weather visualization.",
      image: "https://placehold.co/600x400/fce7f3/9f1239?text=Weather+App",
      technologies: ["JavaScript", "API Integration", "CSS3", "Chart.js"],
      status: "Completed"
    }
  ]

  return (
    <div className="min-h-screen p-8 py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center text-purple-400">
          My Projects
        </h1>
        <p className="text-xl text-purple-300 text-center mb-12">
          Here are some of the projects I've been working on
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-sm border border-pink-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              {/* Project Image */}
              <div className="relative h-48 w-full">
                <Image 
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    project.status === "Completed" 
                      ? "bg-purple-200 text-purple-800" 
                      : "bg-pink-200 text-pink-800"
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
              
              {/* Project Details */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-purple-400">
                  {project.title}
                </h3>
                <p className="text-purple-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="text-sm bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-medium border border-purple-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-pink-200 text-pink-800 px-4 py-2 rounded-lg font-semibold hover:bg-pink-300 transition-all">
                    View Project
                  </button>
                  <button className="flex-1 bg-purple-200 text-purple-800 px-4 py-2 rounded-lg font-semibold hover:bg-purple-300 transition-all">
                    Source Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg shadow-sm border border-pink-200 p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-purple-400">Interested in Working Together?</h2>
          <p className="text-xl mb-6 text-purple-300">
            I'm always open to discussing new projects and opportunities.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-pink-200 text-pink-800 px-8 py-3 rounded-lg font-semibold hover:bg-pink-300 transition-all shadow-sm"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  )
}
