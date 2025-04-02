// components/landing/FeaturesGrid.tsx
"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  ShieldCheck, 
  Zap, 
  Activity, 
  CloudUpload,
  BrainCircuit,
  BadgeCheck
} from "lucide-react";

const features = [
  {
    icon: <BrainCircuit className="w-8 h-8" />,
    title: "AI-Powered Analysis",
    description: "Deep learning model trained on 500,000+ annotated X-ray images",
    delay: 0.1
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Real-time Results",
    description: "Get predictions in under 5 seconds with 98.7% accuracy",
    delay: 0.2
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "HIPAA Compliant",
    description: "End-to-end encrypted storage and secure data handling",
    delay: 0.3
  },
  {
    icon: <Activity className="w-8 h-8" />,
    title: "Health Monitoring",
    description: "Track historical results and disease progression",
    delay: 0.4
  },
  {
    icon: <CloudUpload className="w-8 h-8" />,
    title: "Cloud Storage",
    description: "Secure DICOM image storage with 5-year retention",
    delay: 0.5
  },
  {
    icon: <BadgeCheck className="w-8 h-8" />,
    title: "Certified Experts",
    description: "Radiologist-validated results with second opinion option",
    delay: 0.6
  }
];

export function FeaturesGrid() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Transforming Radiology with AI
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Advanced diagnostic capabilities powered by cutting-edge deep learning 
            algorithms and medical expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: feature.delay }}
            >
              <Card className="p-6 group hover:border-blue-500 transition-all h-full">
                <div className="flex flex-col items-start">
                  <div className="mb-4 p-3 bg-blue-100/20 dark:bg-blue-900/20 rounded-lg">
                    <span className="text-blue-600 dark:text-blue-400">
                      {feature.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Animated Pattern Background */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="absolute left-0 right-0 -z-10 top-0 h-[500px] [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-cyan-100/50 dark:from-blue-900/50 dark:to-cyan-900/50" />
          <div className="absolute [mask-image:radial-gradient(200px_circle_at_center,white,transparent)] bg-[url('/images/grid.svg')] inset-0 bg-[size:40px_40px] opacity-10 dark:opacity-20" />
        </motion.div>
      </div>
    </section>
  );
}