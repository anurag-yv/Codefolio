"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from "react-icons/fa";
import Image from "next/image";


// --------------------
// Types
// --------------------
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

// --------------------
// Project Card Component
// --------------------
const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      className="card overflow-hidden hover:shadow-accent/20 group transition-all duration-500 hover:-translate-y-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
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
              className="bg-secondary p-3 rounded-full text-accent hover:bg-accent hover:text-primary transition-colors duration-300 shadow-md hover:shadow-accent/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub size={20} />
            </motion.a>
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary p-3 rounded-full text-accent hover:bg-accent hover:text-primary transition-colors duration-300 shadow-md hover:shadow-accent/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaExternalLinkAlt size={20} />
              </motion.a>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl text-text font-semibold group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        <div className="flex items-center space-x-3 text-textLight text-sm">
          {project.stars !== undefined && (
            <div className="flex items-center">
              <FaStar className="mr-1 text-yellow-400" />
              <span>{project.stars}</span>
            </div>
          )}
          {project.forks !== undefined && (
            <div className="flex items-center">
              <FaCodeBranch className="mr-1 text-accent" />
              <span>{project.forks}</span>
            </div>
          )}
        </div>
      </div>

      <p className="text-textLight mb-4 line-clamp-3 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className="text-xs text-primary font-medium bg-accent/90 px-2 py-1 rounded shadow-sm hover:shadow-accent/20 hover:bg-accent transition-all duration-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

// --------------------
// Technology Detection Helper
// --------------------
async function detectTechnologies(username: string, repoName: string): Promise<string[]> {
  try {
    const treeResponse = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/git/trees/main?recursive=1`
    );
    if (!treeResponse.ok) return [];

    const treeData = await treeResponse.json();
    const files = (treeData.tree || []).filter((item: any) => item.type === "blob");

    const extensions = new Set<string>();
    const detectedTech: string[] = [];
    const keyFiles: string[] = [];

    files.forEach((file: any) => {
      const path = file.path.toLowerCase();
      const ext = path.split(".").pop();
      if (ext) extensions.add(ext);

      if (path === "package.json") keyFiles.push("package.json");
      if (path === "requirements.txt") keyFiles.push("requirements.txt");
      if (path === "pom.xml") keyFiles.push("pom.xml");
      if (path.includes("dockerfile")) keyFiles.push("docker");
    });

    if (extensions.has("js") || extensions.has("jsx")) detectedTech.push("JavaScript");
    if (extensions.has("ts") || extensions.has("tsx")) detectedTech.push("TypeScript");
    if (extensions.has("py")) detectedTech.push("Python");
    if (extensions.has("java")) detectedTech.push("Java");
    if (extensions.has("cpp") || extensions.has("c")) detectedTech.push("C/C++");
    if (extensions.has("html")) detectedTech.push("HTML");
    if (extensions.has("css")) detectedTech.push("CSS");
    if (extensions.has("sql")) detectedTech.push("SQL");

    // Package.json
    if (keyFiles.includes("package.json")) {
      const pkgResponse = await fetch(
        `https://api.github.com/repos/${username}/${repoName}/contents/package.json`
      );
      if (pkgResponse.ok) {
        const pkgData = await pkgResponse.json();
        const content = JSON.parse(atob(pkgData.content));
        const deps = { ...content.dependencies, ...content.devDependencies };

        if (deps.react) detectedTech.push("React");
        if (deps.next) detectedTech.push("Next.js");
        if (deps["@angular/core"]) detectedTech.push("Angular");
        if (deps.express) detectedTech.push("Express.js");
        if (deps["react-native"]) detectedTech.push("React Native");
      }
    }

    // Python requirements
    if (keyFiles.includes("requirements.txt")) {
      const reqResponse = await fetch(
        `https://api.github.com/repos/${username}/${repoName}/contents/requirements.txt`
      );
      if (reqResponse.ok) {
        const reqData = await reqResponse.json();
        const content = atob(reqData.content);
        const lines = content.split("\n").filter((line) => line && !line.startsWith("#"));
        lines.forEach((line) => {
          const pkg = line.split(/[=<>]/)[0].trim().toLowerCase();
          if (pkg.includes("flask") || pkg.includes("django")) detectedTech.push("Web Framework (Python)");
          if (pkg.includes("tensorflow") || pkg.includes("torch")) detectedTech.push("Machine Learning");
          if (pkg.includes("numpy") || pkg.includes("pandas")) detectedTech.push("Data Science");
        });
      }
    }

    // pom.xml
    if (keyFiles.includes("pom.xml")) {
      const pomResponse = await fetch(
        `https://api.github.com/repos/${username}/${repoName}/contents/pom.xml`
      );
      if (pomResponse.ok) {
        const pomData = await pomResponse.json();
        const content = atob(pomData.content);
        if (content.includes("org.springframework")) detectedTech.push("Spring Boot");
        if (content.includes("maven-surefire-plugin")) detectedTech.push("Maven");
      }
    }

    return [...new Set(detectedTech)];
  } catch (error) {
    console.error(`Error detecting technologies for ${repoName}:`, error);
    return [];
  }
}

// --------------------
// Main Projects Component
// --------------------
const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://api.github.com/users/anurag-yv/repos");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const repos = await response.json();
        if (!Array.isArray(repos) || repos.length === 0) throw new Error("No repositories found");

        const filteredRepos = repos.filter((repo) =>
          ["algoquest", "talktome", "mental health"].some((key) =>
            repo.name.toLowerCase().includes(key)
          )
        );

        const formattedRepos = await Promise.all(
          filteredRepos.map(async (repo) => {
            const codeTech = await detectTechnologies("anurag-yv", repo.name);
            return {
              id: repo.id,
              title: repo.name.replace(/[-_]/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase()),
              description: repo.description || "No description provided",
              technologies: [...new Set([repo.language, ...codeTech].filter(Boolean))],
              github: repo.html_url,
              demo: repo.homepage || "",
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              image:
                repo.name.includes("algoquest")
                  ? "algoquest.png"
                  : repo.name.includes("talktome")
                  ? "talktome.png"
                  : repo.name.includes("mental")
                  ? "mental-health.png"
                  : "",
            };
          })
        );

        setProjects(formattedRepos);
      } catch (err: any) {
        console.error("Error fetching projects:", err);
        setError("Failed to fetch projects. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 scroll-mt-20">
      <motion.h2
        className="section-heading text-center mb-10"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h2>

      {error && (
        <div className="p-3 mb-6 bg-yellow-500/20 border border-yellow-500 rounded text-yellow-200 text-center">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card h-72 bg-secondary/20 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {!isLoading && projects.length === 0 && !error && (
        <p className="text-center text-textLight mt-8">No matching projects found.</p>
      )}

      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.a
          href="https://github.com/anurag-yv"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center px-6 py-3 border-2 hover:shadow-lg hover:shadow-accent/10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGithub className="mr-2" /> See More on GitHub
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Projects;
