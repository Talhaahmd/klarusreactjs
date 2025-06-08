'use client';
import React, { useEffect, useState } from 'react';
import initIsotope2 from '@/common/initIsotope2';
import { supabase } from '@/lib/supabaseClient';

function Portfolio() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    initIsotope2();
  }, [projects]);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase.from('projects').select('*');
      if (!error && data) setProjects(data);
    }
    fetchProjects();
  }, []);

  return (
    <section className="work-minimal section-padding pb-40 py-32" style={{ minHeight: '80vh' }}>
      <div className="container">
        <div className="row mb-80">
          <div className="col-lg-4">
            <div className="sec-head">
              <h6 className="sub-title main-color mb-10">DISCOVER OUR CASES</h6>
              <h3>Latest Projects</h3>
            </div>
          </div>
          <div className="filtering col-lg-8 d-flex justify-content-end align-items-end">
            <div>
              <div className="filter">
                <span data-filter="*" className="active" data-count="08">
                  All
                </span>
                <span data-filter=".design" data-count="03">
                  Design
                </span>
                <span data-filter=".development" data-count="02">
                  Development
                </span>
                <span data-filter=".marketing" data-count="03">
                  Marketing
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xxl w-full" style={{ maxWidth: '1800px' }}>
        <div className="gallery2 row sm-marg gap-6 md:gap-12">
          {projects.length === 0 ? (
            <div className="col-12 text-center text-gray-400 py-10">No projects found.</div>
          ) : (
            (() => {
              const cols = 4; // 4-column layout
              const items = projects.map((project, idx) => {
                const filterClass = project.category
                  ? project.category.toLowerCase().replace(/\s+/g, '-')
                  : 'design';
                const colClass = idx % 4 === 0 || idx % 4 === 5 ? 'col-lg-6 items ' + filterClass : 'col-lg-3 items width2 ' + filterClass;
                return (
                  <div className={colClass + ' mb-10'} key={project.id || idx}>
                    <div className="item">
                      <div className="img group overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105">
                        <img
                          src={project.featured_image || '/assets/imgs/works/4/h1.jpg'}
                          alt={project.title}
                          className="w-full h-auto object-cover rounded-2xl group-hover:opacity-90 transition duration-300"
                        />
                        <div className="cont inline d-flex align-items-center">
                          <div>
                            <h5>
                              <a href={`/project-details/${project.id}`}>{project.title}</a>
                            </h5>
                          </div>
                          <div className="ml-auto">
                            <p>
                              <a href={`/project-details/${project.id}`}>{project.category}</a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              });
              // If the last row is incomplete, fill with a text block
              const remainder = items.length % cols;
              if (remainder !== 0) {
                items.push(
                  <div className="col-lg-3 items width2 flex items-center justify-center mb-10" key="portfolio-text-block">
                    <div className="flex flex-col items-center justify-center w-full h-full min-h-[200px] bg-gradient-to-br from-black/80 to-gray-900/80 rounded-2xl shadow-xl">
                      <span className="text-3xl md:text-4xl font-bold tracking-wide text-white opacity-80">Our Portfolio</span>
                    </div>
                  </div>
                );
              }
              return items;
            })()
          )}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
