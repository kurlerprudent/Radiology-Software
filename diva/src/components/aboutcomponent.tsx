// components/landing/TeamShowcase.tsx
"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Linkedin, 
  Github,
  Brain,
  Microscope,
  Code2,
  CloudCog
} from "lucide-react";

const team = [
  {
    name: "Dr. Nsiah Kofi Denis ",
    role: "Software Engineer",
    expertise: "Machine learning",
    avatar: "/team/dr-asare.jpg",
    skills: ["CT Analysis", "AI Validation", "Clinical Research"],
    social: { linkedin: "#", github: "#" },
    delay: 0.1
  },
  {
    name: "Hon Josh ",
    role: "AI Engineer",
    expertise: "Deep Learning",
    avatar: "/team/ama-mensah.jpg",
    skills: ["PyTorch", "Computer Vision", "Model Optimization"],
    social: { linkedin: "#", github: "#" },
    delay: 0.2
  },
  {
    name: "Obed  Sarkodie",
    role: "Fullstack Developer",
    expertise: "HealthTech Systems",
    avatar: "/team/kofi-annan.jpg",
    skills: ["Next.js", "FHIR", "Security"],
    social: { linkedin: "#", github: "#" },
    delay: 0.3
  },
  {
    name: "Esi Boateng",
    role: "Medical Researcher",
    expertise: "Pulmonary Diseases",
    avatar: "/team/esi-boateng.jpg",
    skills: ["Clinical Trials", "Data Analysis", "Publications"],
    social: { linkedin: "#", github: "#" },
    delay: 0.4
  }
];

export function TeamShowcase() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            The Minds Powering Innovation
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Combining medical expertise with technical excellence to revolutionize
            diagnostic healthcare in West Africa
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: member.delay }}
            >
              <Card className="p-6 group hover:shadow-lg transition-all h-full flex flex-col">
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="w-24 h-24 mb-4 border-4 border-blue-100 dark:border-blue-900">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-2xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-xl font-bold text-center">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 text-sm mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                    {member.expertise}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="flex justify-center gap-4 mb-6">
                    <motion.a 
                      whileHover={{ y: -2 }}
                      href={member.social.linkedin}
                      className="text-slate-500 hover:text-blue-600"
                    >
                      <Linkedin className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ y: -2 }}
                      href={member.social.github}
                      className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                  </div>

                  <div className="space-y-2">
                    {member.skills.map((skill, skillIndex) => (
                      <div 
                        key={skillIndex}
                        className="flex items-center gap-2 text-sm px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full"
                      >
                        <span className="text-blue-500">
                          {skill === "PyTorch" ? <Brain className="w-4 h-4" /> :
                           skill === "CT Analysis" ? <Microscope className="w-4 h-4" /> :
                           skill === "Next.js" ? <Code2 className="w-4 h-4" /> :
                           <CloudCog className="w-4 h-4" />}
                        </span>
                        <span className="text-slate-700 dark:text-slate-300">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Animated Background Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="absolute left-0 right-0 -z-10 top-0 h-[800px] [mask-image:linear-gradient(to_bottom,white_30%,transparent)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#eff6ff_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,#1e3a8a_0%,transparent_70%)]" />
          <div className="absolute [mask-image:radial-gradient(200px_circle_at_center,white,transparent)] inset-0 bg-[url('/images/dots-pattern.svg')] bg-[size:40px_40px] opacity-10 dark:opacity-20" />
        </motion.div>
      </div>
    </section>
  );
}