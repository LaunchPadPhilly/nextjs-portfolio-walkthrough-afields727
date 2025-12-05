import Link from 'next/link'

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-title">
        <h1>Get In Touch</h1>
        <p>Reach out through any of these channels</p>
      </div>

      <div className="contact-divider"></div>

      <div className="contact-wrapper">
        <div className="contact-card">
          <p className="contact-text">
            I&apos;m always open to new opportunities, so please don&apost hesitate to get in touch. Whether it&aposs about collaboration, job inquiries, or just general conversation, I&apod love to hear from you! Feel free to reach out through any of these channels.
          </p>

          <div className="contact-list">
            <div className="contact-row">
              <span className="contact-icon">📧</span>
              <div className="contact-detail">
                <p className="contact-label">Email</p>
                <p className="contact-subtext">syrianag311@gmail.com</p>
              </div>
            </div>

            <div className="contact-row">
              <span className="contact-icon">🔗</span>
              <div className="contact-detail">
                <p className="contact-label">LinkedIn</p>
                <Link href="https://www.linkedin.com/in/syriana-gil-7717b331b" target="_blank" rel="noopener noreferrer" className="contact-link">
                  linkedin.com/in/syriana-gil-7717b331b
                </Link>
                <p className="contact-subtext">Professional networking and updates</p>
              </div>
            </div>

            <div className="contact-row">
              <span className="contact-icon">💻</span>
              <div className="contact-detail">
                <p className="contact-label">GitHub</p>
                <Link href="https://github.com/syrianag" target="_blank" rel="noopener noreferrer" className="contact-link">
                  github.com/syrianag
                </Link>
                <p className="contact-subtext">Follow along on GitHub</p>
              </div>
            </div>
          </div>
        </div>

        <div className="enhance-panel">
          <h3 className="enhance-title">💡 Optional Enhancements:</h3>
          <ul className="enhance-list">
            <li>Add a contact form (coming in Week 4)</li>
            <li>Include your location or timezone</li>
            <li>Add social media icons</li>
            <li>List your availability for projects</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
