"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
	const pathname = usePathname()

	const links = [
		{ href: '/', label: 'Home' },
			{ href: '/about', label: 'About' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/contact', label: 'Contact' },
	]

	return (
				<nav className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-black/70 border-b border-gray-800">
				<div className="mx-auto max-w-6xl px-6">
						<div className="flex h-16 items-center justify-center">
							<ul className="flex items-center gap-6 list-none">
						{links.map(link => {
							const active = pathname === link.href
							return (
								<li key={link.href}>
									<Link
										href={link.href}
												className={
													`inline-block px-4 py-2 rounded-md text-sm font-bold whitespace-nowrap transition no-underline ` +
													(active
														? 'text-purple-400 bg-purple-900/30 hover:bg-purple-800/40 hover:text-white'
														: 'text-purple-500 hover:text-white hover:bg-purple-600/20')
												}
										aria-current={active ? 'page' : undefined}
									>
										{link.label}
									</Link>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</nav>
	)
}
