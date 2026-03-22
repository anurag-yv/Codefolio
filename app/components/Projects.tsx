"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from "react-icons/fa";
import Image from "next/image";

type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string;
  stars?: number;
  forks?: number;
  image?: string;
};

// 🔥 STATIC FALLBACK PROJECTS (ONLY USED IF API FAILS)
const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "Waste Management System (WMS)",
    description:
      "A system to manage warehouse inventory, stock tracking and operations efficiently.",
    technologies: ["React", "Node.js", "Express.js", "JavaScript"],
    github: "https://github.com/anurag-yv",
    demo: "",
    stars: 0,
    forks: 0,
    image: "wms.png",
  },
  {
    id: 2,
    title: "Mental Health Awareness Among Children System",
    description:
      "A mental health monitoring and assessment platform for children.",
    technologies: ["PHP", "Tailwind CSS", "Chart.js"],
    github: "https://github.com/anurag-yv",
    demo: "",
    stars: 0,
    forks: 0,
    image: "mental-health.png",
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      className="card overflow-hidden hover:shadow-accent/20 group transition-all duration-500 hover:-translate-y-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative overflow-hidden h-48 -mx-6 -mt-6 mb-6 rounded-t-lg">
        {project.image ? (
          <Image
            src={`/projects/${project.image}`}
            alt={project.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
            <span className="text-accent font-medium">Project Screenshot</span>
          </div>
        )}

        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <div className="flex space-x-4">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary p-3 rounded-full text-accent hover:bg-accent hover:text-primary transition"
              whileHover={{ scale: 1.1 }}
            >
              <FaGithub size={20} />
            </motion.a>

            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary p-3 rounded-full text-accent hover:bg-accent hover:text-primary transition"
                whileHover={{ scale: 1.1 }}
              >
                <FaExternalLinkAlt size={20} />
              </motion.a>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl text-text font-semibold group-hover:text-accent transition">
          {project.title}
        </h3>

        <div className="flex items-center space-x-3 text-textLight text-sm">
          {project.stars !== undefined && (
            <div className="flex items-center">
              <FaStar className="mr-1 text-yellow-400" />
              {project.stars}
            </div>
          )}

          {project.forks !== undefined && (
            <div className="flex items-center">
              <FaCodeBranch className="mr-1 text-accent" />
              {project.forks}
            </div>
          )}
        </div>
      </div>

      <p className="text-textLight mb-4 line-clamp-3">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className="text-xs text-primary font-medium bg-accent px-2 py-1 rounded"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/users/anurag-yv/repos"
        );

        if (!res.ok) {
          throw new Error("GitHub API failed");
        }

        const repos = await res.json();

        const selected: Project[] = [];

        const wmsRepo = repos.find((r: any) =>
          r.name?.toLowerCase().includes("warehouse") ||
          r.name?.toLowerCase().includes("wms")
        );

        const mentalRepo = repos.find((r: any) =>
          r.name?.toLowerCase().includes("mental") ||
          r.name?.toLowerCase().includes("health")
        );

        if (wmsRepo) {
          selected.push({
            id: wmsRepo.id,
            title: "Waste Management System (WMS)",
            description:
              wmsRepo.description ||
              "A system to manage warehouse inventory.",
            technologies: [wmsRepo.language || "React"],
            github: wmsRepo.html_url,
            demo: wmsRepo.homepage || "",
            stars: wmsRepo.stargazers_count,
            forks: wmsRepo.forks_count,
            image: "wms.png",
          });
        }

        if (mentalRepo) {
          selected.push({
            id: mentalRepo.id,
            title: "Mental Health Awareness System",
            description:
              mentalRepo.description || "Mental health platform.",
            technologies: [mentalRepo.language || "PHP"],
            github: mentalRepo.html_url,
            demo: mentalRepo.homepage || "",
            stars: mentalRepo.stargazers_count,
            forks: mentalRepo.forks_count,
            image: "mental-health.png",
          });
        }

        // ✅ If API worked but repos not found → fallback
        if (selected.length === 0) {
          setProjects(fallbackProjects);
        } else {
          setProjects(selected);
        }
      } catch (error) {
        console.error("GitHub failed → using fallback", error);

        // ✅ If API completely fails → fallback
        setProjects(fallbackProjects);
      }

      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20">

      <motion.h2
        className="section-heading text-center mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        My Projects
      </motion.h2>

      {loading ? (
        <div className="text-center text-textLight">Loading Projects...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <motion.a
          href="https://github.com/anurag-yv"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center px-6 py-3"
          whileHover={{ scale: 1.05 }}
        >
          <FaGithub className="mr-2" />
          View All Projects on GitHub
        </motion.a>
      </motion.div>

    </section>
  );
};

export default Projects;