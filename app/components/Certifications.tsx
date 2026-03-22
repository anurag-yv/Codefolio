"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";

type Certificate = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  link?: string;
  image: string;
};

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Data Structures & Algorithms",
    issuer: "Programming Pathshala",
    date: "2025",
    description:
      "Developed strong problem-solving skills through competitive programming, with hands-on experience in data structures, algorithms, and optimized coding techniques.",
    link: "https://drive.google.com/file/d/1JwyUNqgOufLPx-gPrCndmSZzaM4WVKjz/view?usp=sharing",
    image: "Cp.png",
  },
  {
    id: 2,
    title: "Cloud Computing",
    issuer: "NPTEL",
    date: "2025",
    description:
      "Gained understanding of cloud computing concepts including virtualization, cloud architecture, service models (IaaS, PaaS, SaaS), and deployment strategies, along with real-world applications.",
    link: "https://drive.google.com/file/d/1hPWv5CeCNxke_MI7sYAkP55H--2uUjAR/view",
    image: "np.png",
  },
  {
    id: 3,
    title: "Computational Theory: Language Principles & Finite Automata",
    issuer: "Coursera",
    date: "2025",
    description:
      "Built a strong theoretical foundation in computation by studying formal languages, finite automata, and computational models, enhancing the ability to analyze problem complexity and design efficient solutions.",
    link: "https://infyspringboard.onwingspan.com/public-assets/infosysheadstart/cert/lex_auth_0135015511562403847605/1-1e3499a4-6bdb-4801-8cf5-1b8e925571d8.pdf",
    image: "ct.png",
  },
  {
    id: 4,
    title: "Computer Communications",
    issuer: "Coursera",
    date: "2024",
    description:
      "Developed a strong understanding of computer networking concepts including network architecture, protocols, data transmission, and communication models, with practical insights into real-world networking systems.",
    link: "https://www.coursera.org/account/accomplishments/specialization/MHZHWKRNLKHI?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=s12n",
    image: "cc.png",
  },
];

const CertificateCard = ({ cert }: { cert: Certificate }) => {
  return (
    <motion.div
      className="card flex gap-4 items-start p-5 hover:shadow-accent/20 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* SMALL IMAGE */}
      <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border border-accent/20">
        <Image
          src={`/certificates/${cert.image}`}
          alt={cert.title}
          fill
          quality={100}
          priority
          sizes="80px"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-text">
            {cert.title}
          </h3>

          <span className="text-sm text-accent whitespace-nowrap">
            {cert.date}
          </span>
        </div>

        <p className="text-textLight text-sm mt-1">
          {cert.issuer}
        </p>

        <p className="text-textLight text-sm mt-2 leading-relaxed">
          {cert.description}
        </p>

        {/* LINK */}
        {cert.link && (
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-accent mt-3 hover:underline"
          >
            View Certificate
            <FaExternalLinkAlt className="ml-1" size={12} />
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  return (
    <section id="certificates" className="py-20">
      <motion.h2
        className="section-heading text-center mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        Certificates
      </motion.h2>

      <motion.p
        className="text-textLight text-center max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        Certifications that reflect my continuous learning and practical exposure
        to modern technologies and development practices.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <CertificateCard key={cert.id} cert={cert} />
        ))}
      </div>
    </section>
  );
};

export default Certifications;