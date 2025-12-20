'use client'

import { ExternalLink, Zap, Home, Building } from 'lucide-react';
import  Link  from 'next/link';

const Gallery = () => {
  const projects = [
    {
      title: "Modernt kök - Elinstallation",
      category: "Bostäder",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <Home className="w-5 h-5" />
    },
    {
      title: "Laddstolpe Tesla Model S",
      category: "Laddstolpar",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <Zap className="w-5 h-5" />
    },
    {
      title: "Kontorsbyggnad - Elcentral",
      category: "Kommersiellt",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <Building className="w-5 h-5" />
    },
  ];

  return (
    <section className="py-20 bg-white" aria-label="Projektgalleri">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Våra senaste projekt</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Se exempel på vårt professionella arbete inom olika områden av elektricitet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                <img 
                  src={project.image} 
                  alt={project.title}
                  loading='lazy'
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-[#66BEF0] rounded-lg flex items-center justify-center" aria-hidden="true">
                    {project.icon}
                  </div>
                  <span className="text-sm font-medium text-[#66BEF0]">{project.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <button className="flex items-center gap-2 text-white md:hover:scale-95 transition-colors" aria-label={`Se mer om ${project.title}`}>
                  <Link href="/Blog">Se mer</Link>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
