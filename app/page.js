import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const title = "Welcome To Syriana's Portfolio"

  return (
    <div className="min-h-screen px-6 py-16">
      <section className="cy-hero">
        <div className="max-w-5xl mx-auto">
        <h1 className="cy-title" data-text={title}>{title}</h1>
        <p className="cy-tagline mt-2">Building beautiful, performant web applications</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
          <Link href="/projects" className="cy-link-btn">View My Work!</Link>
          <Link href="/about" className="cy-link-btn">Learn About Me!</Link>
          <Link href="/contact" className="cy-link-btn">Contact Me!</Link>
        </div>
        </div>
      </section>

      <div className="cy-divider" />

      {/* Profile Photo Section */}
      <section className="home-photo-section">
        <div className="profile-photo-container">
          <Image
            src="/profile-placeholder.png"
            alt="Syriana profile photo"
            width={300}
            height={300}
            className="profile-photo-image"
            priority
          />
          <p className="profile-photo-hint">Add a real profile photo named <code>profile-placeholder.png</code> in <code>public/</code>.</p>
        </div>
      </section>

      <div className="cy-divider" />

      <div className="text-center mt-10">
        <Link href="#next" aria-label="Scroll down" className="text-3xl text-purple-400 hover:text-purple-300 animate-bounce">↓</Link>
        <div id="next" className="sr-only">Next section anchor</div>
      </div>
    </div>
  )
}
