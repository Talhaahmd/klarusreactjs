import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { supabase } from '@/lib/supabaseClient';

export default async function PortfolioPage() {
  const { data: projects, error } = await supabase.from('projects').select('*');

  return (
    <body className="bg-black text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-24">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4">Our Portfolio</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A curated collection of our finest work, showcasing the projects we&apos;ve brought to life with creativity and precision.
          </p>
        </section>

        {error && <p className="text-center text-red-500">Error loading projects: {error.message}</p>}
        {!projects || projects.length === 0 ? (
          <p className="text-center text-gray-400">No projects found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((project) => (
              <div key={project.id} className="relative bg-[#181818] rounded-xl overflow-hidden shadow-lg">
                {project.featured_image && (
                  <img
                    src={project.featured_image}
                    alt={project.title}
                    className="w-full h-[400px] object-cover"
                  />
                )}
                <div className="p-6">
                  <span className="text-sm uppercase tracking-widest text-gray-400 bg-gray-800 px-3 py-1 rounded-full inline-block mb-4">
                    {project.category}
                  </span>
                  <h2 className="text-3xl font-bold mb-2 text-white">{project.title}</h2>
                  <p className="text-gray-300 text-sm">{project.short_description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </body>
  );
}
