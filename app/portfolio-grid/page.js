import { supabase } from '@/lib/supabaseClient';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Our Works | Klarus',
};

export default async function PortfolioGridPage() {
  const { data: projects, error } = await supabase.from('projects').select('*');

  if (error) return <div className="text-center text-red-500 py-10">Error: {error.message}</div>;
  if (!projects || projects.length === 0) return <div className="text-center text-gray-600 py-10">No projects found.</div>;

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <Navbar />
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Our Works</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/portfolio-grid/${project.id}`}
            className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            {project.featured_image && (
              <img
                src={project.featured_image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{project.category}</p>
              <p className="text-gray-700 text-sm line-clamp-2">{project.short_description}</p>
        </div>
          </Link>
        ))}
      </div>
      <Footer />
    </main>
  );
}
