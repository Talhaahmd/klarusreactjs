'use client';
import initIsotope from '@/common/initIsotope';
import React, { useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default async function Portfolio() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('id, title, category, featured_image')
    .order('created_at', { ascending: false });

  if (error) return <div>Error: {error.message}</div>;
  if (!projects || projects.length === 0) return <div>No projects found.</div>;

  return (
    <section className="work-grid section-padding pb-0">
      <div className="container">
        <div className="row mb-80">
          <div className="col-lg-4">
            <div className="sec-head">
              <h6 className="sub-title main-color mb-10">DISCOVER OUR CASES</h6>
              <h3>Latest Projects</h3>
            </div>
          </div>
        </div>
        <div className="row">
          {projects.map((project) => (
            <div key={project.id} className="col-lg-4 col-md-6 mb-50">
              <div className="item">
                <div className="img">
                  {project.featured_image && (
                    <img src={project.featured_image} alt={project.title} />
                  )}
                </div>
                <div className="cont d-flex align-items-end mt-30">
                  <div>
                    <span className="p-color mb-5 sub-title">{project.category}</span>
                    <h6>{project.title}</h6>
                  </div>
                  <div className="ml-auto">
                    <Link href={`/portfolio-grid/${project.id}`}>
                      <span className="ti-arrow-top-right"></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
