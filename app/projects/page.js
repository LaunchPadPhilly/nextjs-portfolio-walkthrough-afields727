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
    },
    {
      title: "Classic Waffles",
      description: "A delicious recipe for classic waffles, perfect for a cozy breakfast or brunch. This project showcases a simple static page with image integration.",
      image: "/Classic-Waffles-Recipe-4.jpg",
      technologies: ["HTML", "CSS"],
      status: "Completed"
    }
  ]

  return (
    <div className="projects-page">
      <div className="projects-title">
        <h1>My Projects</h1>
        <p>Showcase of my work and expertise</p>
      </div>

      <div className="projects-divider"></div>

      <div className="projects-wrapper">
        <div className="project-grid">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <div className="project-media">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="object-cover rounded-t-lg"
                />
                {project.status === "Featured" && (
                  <span className="featured-badge">Featured</span>
                )}
              </div>
              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.technologies.map((tech, techIndex) => (
                    <span className="tech-badge" key={techIndex}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="project-ideas">
          <h3>💡 Project Ideas:</h3>
          <ul>
            <li>Past school projects</li>
            <li>Personal coding projects</li>
            <li>Design work or creative projects</li>
            <li>Future projects you want to build (coming soon!)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
