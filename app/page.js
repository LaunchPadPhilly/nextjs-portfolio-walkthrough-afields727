export default function Projects() {
  const projects = [
    {
      title: "Portfolio Website",
      description: "A clean, responsive portfolio built with Next.js.",
    },
    {
      title: "API App",
      description: "An app that fetches and displays live data using REST APIs.",
    },
    {
      title: "UI Components",
      description: "Reusable components built with Tailwind CSS.",
    },
  ];

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8">Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <div
            key={i}
            className="p-6 bg-white shadow rounded-xl hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-700">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
