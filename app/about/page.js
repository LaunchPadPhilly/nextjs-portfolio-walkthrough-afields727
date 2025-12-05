// About page - bio, goals, and skills

export default function About() {
  const skills = ['JavaScript','React','Tailwind CSS','HTML','Next.js', 'Prompt Engineering', 'AI', 'Project Management']

  return (
    <div className="about-page">
      <div className="about-title">
        <h1>About Me!</h1>
        <p>Learn more about my journey and skills</p>
      </div>

      <div className="about-divider"></div>

      <div className="about-wrapper">
        <div className="profile-card">
          <div style={{ padding: '30px 25px' }}>
            <p className="bio-text">
              Hi, I'm <strong>Syriana</strong>, a software developer combining code, creativity, and UX. I'm currently focused on learning Next.js, Tailwind CSS, and building accessible, performant interfaces.
            </p>
            <p className="goal-text" style={{ marginTop: '20px' }}>
              My goal is to keep growing—because the sky is not the limit. I want to refine best practices, deepen architectural thinking, and build a portfolio that reflects craftsmanship and curiosity.
            </p>
          </div>
        </div>
      </div>

      <div className="skills-section">
        <h2 className="skills-heading">Core Skills</h2>
        <div className="skills-badges">
          {skills.map(skill => (
            <span key={skill} className="skill-badge">{skill}</span>
          ))}
        </div>
      </div>
    
  )
}