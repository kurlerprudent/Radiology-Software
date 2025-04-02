// components/landing/HeroSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-blue-900/60" />
        <img
          src="/bg1.jpg"
          alt="Advanced radiology equipment"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 container text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-6 inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20"
          >
            <span className="text-lg font-semibold text-white">
              AI-Powered Diagnostics
            </span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="block"
            >
              Revolutionizing
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Medical Imaging Analysis
            </motion.span>
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Leveraging deep learning to provide accurate, fast, and accessible 
            lung disease detection from X-ray images
          </motion.p>

          {/* CTA with Role Selection */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 rounded-xl shadow-lg"
                >
                  Get Started
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-lg">
                <DropdownMenuItem asChild>
                  <Link href="/login?role=patient" className="cursor-pointer">
                    As Patient
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/login?role=doctor" className="cursor-pointer">
                    As Doctor
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/login?role=admin" className="cursor-pointer">
                    As Admin
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="outline" 
              size="lg" 
              className="text-white border-white/30 hover:bg-white/10 hover:text-white text-lg px-8 py-6 rounded-xl shadow-lg"
            >
              Learn More
            </Button>
          </motion.div>

          {/* Animated Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="animate-bounce w-8 h-14 rounded-full border-2 border-white/40 flex items-center justify-center">
              <ChevronDown className="h-6 w-6 text-white/80" />
            </div>
          </motion.div>
        </motion.div>

        

        {/* Stats Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute left-8 bottom-8 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
        >
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-blue-400">
              <span className="countup" data-target="15234">15k+</span>
            </div>
            <div className="text-white/80">
              Scans Analyzed<br />with 98.7% Accuracy
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}