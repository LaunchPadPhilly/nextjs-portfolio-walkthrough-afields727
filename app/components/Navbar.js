import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full py-4 bg-blue-600 text-white shadow">
      <div className="max-w-4xl mx-auto flex justify-between items-center px-6">
        <h1 className="font-bold text-xl">Aaron Fields</h1>

        <div className="flex gap-6">
          <Link className="hover:text-gray-200 transition" href="/">Home</Link>
          <Link className="hover:text-gray-200 transition" href="/about">About</Link>
          <Link className="hover:text-gray-200 transition" href="/projects">Projects</Link>
          <Link className="hover:text-gray-200 transition" href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
