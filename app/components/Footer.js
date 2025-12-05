import Link from 'next/link'

export default function Footer() {
	return (
		<footer className="bg-gray-900 border-t border-gray-800">
			<div className="max-w-6xl mx-auto px-4 py-8 text-center">
				<p className="text-gray-300">
					© {new Date().getFullYear()} Syriana Gil • Built with <span className="text-white">Next.js</span> & <span className="text-white">Tailwind CSS</span>
				</p>
				<div className="mt-4 flex items-center justify-center gap-6">
					<Link
						href="https://www.linkedin.com/in/syriana-gil-7717b331b"
						target="_blank"
						rel="noopener noreferrer"
						className="font-bold text-purple-500 hover:text-white hover:bg-purple-600/20 px-3 py-1 rounded transition"
					>
						LinkedIn
					</Link>
					<Link
						href="https://www.upwork.com/freelancers/~your-profile"
						target="_blank"
						rel="noopener noreferrer"
						className="font-bold text-purple-500 hover:text-white hover:bg-purple-600/20 px-3 py-1 rounded transition"
					>
						Upwork
					</Link>
				</div>
			</div>
		</footer>
	)
}
