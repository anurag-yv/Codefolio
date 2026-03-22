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

        const repos = await res.json();

        console.log("Repo names:", repos.map((r: any) => r.name));

        const selected: Project[] = [];

        const wmsRepo = repos.find((r: any) =>
          r.name?.toLowerCase().includes("warehouse") ||
          r.name?.toLowerCase().includes("wms")
        );

        const mentalRepo = repos.find((r: any) =>
          r.name?.toLowerCase().includes("mental") ||
          r.name?.toLowerCase().includes("health")
        );

        // ✅ IF FOUND → use real repos
        if (wmsRepo) {
          selected.push({
            id: wmsRepo.id,
            title: "Waste Management System (WMS)",
            description:
              wmsRepo.description ||
              "A system to manage warehouse inventory, stock tracking and operations efficiently.",
            technologies: [wmsRepo.language || "React", "React", "Express.js", "Node.js", "JavaScript"],
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
            title: "Mental Health Awareness Among Children System",
            description:
              mentalRepo.description ||
              "A mental health monitoring and assessment platform for children.",
            technologies: [mentalRepo.language || "PHP", "Tailwind CSS", "PHP", "Chart.js"],
            github: mentalRepo.html_url,
            demo: mentalRepo.homepage || "",
            stars: mentalRepo.stargazers_count,
            forks: mentalRepo.forks_count,
            image: "mental-health.png",
          });
        }

        // 🔥 FINAL FIX: fallback if not found
        if (selected.length === 0 && repos.length > 0) {
          const fallback = repos.slice(0, 2);

          fallback.forEach((repo: any, index: number) => {
            selected.push({
              id: repo.id,
              title:
                index === 0
                  ? "Waste Management System (WMS)"
                  : "Mental Health Awareness Among Children System",
              description:
                repo.description ||
                (index === 0
                  ? "A system to manage warehouse inventory, stock tracking and operations efficiently."
                  : "A mental health monitoring and assessment platform for children."),
              technologies: [repo.language || "JavaScript"],
              github: repo.html_url,
              demo: repo.homepage || "",
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              image: index === 0 ? "wms.png" : "mental-health.png",
            });
          });
        }

        setProjects(selected);

      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
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
      ) : projects.length === 0 ? (
        <div className="text-center text-textLight">
          No projects found (check repo names in console)
        </div>
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