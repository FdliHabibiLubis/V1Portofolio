"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects, C } from "../lib/data";

const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

export default function ProyekPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeProj = projects[selectedIndex];

  return (
    <div style={{ backgroundColor: "#fff", color: "#111", minHeight: "100vh" }}>
      <section className="pt-28 pb-12 md:pt-32 md:pb-16 max-w-[1200px] mx-auto px-5 md:px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>

          {/* ── Standardized Header (Matching Kontak Page) ── */}
          <motion.div variants={fadeInUp} className="mb-5 sm:mb-6 text-left">
            <div className="flex items-center gap-3 font-bold text-[11px] uppercase tracking-[0.2em] mb-1.5" style={{ color: C.primary, fontFamily: "var(--font-space-grotesk)" }}>
              <span className="w-8 h-px" style={{ background: C.primary }} />
              Hasil Karya
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight" style={{ color: "#111", fontFamily: "var(--font-space-grotesk)" }}>
              Proyek <span style={{ color: C.primary }}>Pilihan</span>
            </h1>
            <p className="max-w-md text-xs sm:text-sm mt-1 leading-relaxed" style={{ color: "#6b7280", fontFamily: "var(--font-inter)" }}>
              Kumpulan proyek yang telah saya selesaikan dengan arsitektur dan antarmuka modern.
            </p>
          </motion.div>

          {/* ── MOBILE-ONLY LAYOUT (lg:hidden) ── */}
          <div className="block lg:hidden">
            {/* Horizontal Project Selector Pill Strip */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar scroll-smooth">
              {projects.map((proj, idx) => {
                const isActive = idx === selectedIndex;
                return (
                  <button
                    key={proj.id}
                    onClick={() => setSelectedIndex(idx)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-black transition-all duration-200 whitespace-nowrap cursor-pointer border ${
                      isActive
                        ? "bg-[#0D9488] text-white border-black shadow-md scale-105"
                        : "bg-[#fff] text-[#475569] border-[#e5e7eb] hover:border-[#0D9488] hover:bg-[#F8FAFC]"
                    }`}
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    <span className={`text-[10px] font-mono ${isActive ? "text-teal-100" : "text-slate-400"}`}>
                      0{idx + 1}
                    </span>
                    <span>{proj.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Preview Card with Smooth Fade Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProj.id}
                initial={{ opacity: 0, y: 8, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.99 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <PreviewCard activeProj={activeProj} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── DESKTOP-ONLY 2-COLUMN LAYOUT (hidden lg:grid) ── */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">

            {/* ── LEFT COLUMN: Vertical Project List (7 cols) ── */}
            <div className="lg:col-span-7 flex flex-col gap-2">
              <div className="flex items-center justify-between px-1 mb-0.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0D9488]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  DAFTAR PROYEK ({projects.length})
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  PILIH PROYEK ↓
                </span>
              </div>

              {projects.map((proj, idx) => {
                const isActive = idx === selectedIndex;

                return (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedIndex(idx)}
                    className={`group relative p-3 rounded-xl border-[2.5px] transition-all duration-200 cursor-pointer select-none ${
                      isActive
                        ? "bg-[#F0FDFA] border-[#0D9488] border-l-[6px] shadow-sm translate-x-1"
                        : "bg-[#fff] border-[#e5e7eb] hover:border-[#0D9488]/80 hover:bg-[#F8FAFC] hover:translate-x-1"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`text-[11px] font-mono font-black px-2 py-0.5 rounded-md border transition-all ${
                            isActive
                              ? "bg-[#0D9488] text-white border-black"
                              : "bg-[#F1F5F9] text-slate-500 border-[#e5e7eb] group-hover:border-[#0D9488]"
                          }`}
                          style={{ fontFamily: "var(--font-space-grotesk)" }}
                        >
                          0{idx + 1}
                        </span>

                        <h3
                          className={`text-sm sm:text-base font-black tracking-tight truncate transition-colors ${
                            isActive ? "text-[#0F1712]" : "text-slate-700 group-hover:text-[#0D9488]"
                          }`}
                          style={{ fontFamily: "var(--font-space-grotesk)" }}
                        >
                          {proj.title}
                        </h3>
                      </div>

                      <span
                        className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border whitespace-nowrap transition-all ${
                          isActive
                            ? "bg-[#0D9488] text-white border-black"
                            : "bg-[#F1F5F9] text-slate-600 border-[#e5e7eb]"
                        }`}
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {proj.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── RIGHT COLUMN: Desktop Preview Card with Smooth Fade Animation (5 cols) ── */}
            <div className="lg:col-span-5 sticky top-28 h-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProj.id}
                  initial={{ opacity: 0, scale: 0.98, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  <PreviewCard activeProj={activeProj} />
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </motion.div>
      </section>
    </div>
  );
}

// ── Reusable Light Theme Preview Card Component ──
function PreviewCard({ activeProj }) {
  return (
    <div
      className="rounded-2xl bg-[#fff] border-[3px] border-[#0D9488] shadow-[6px_6px_0px_#0D9488] overflow-hidden flex flex-col select-none transition-shadow duration-200 hover:shadow-[8px_8px_0px_#0D9488]"
    >
      {/* Browser Mockup Top Window Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#F8FAFC] border-b border-[#e5e7eb] shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/90 shadow-sm" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/90 shadow-sm" />
          <div className="w-2 h-2 rounded-full bg-green-500/90 shadow-sm" />
        </div>
        <div className="flex items-center px-2.5 py-0.5 rounded bg-[#fff] border border-[#e5e7eb] max-w-[160px]">
          <span
            className="text-[8.5px] font-mono text-slate-500 truncate"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {activeProj.linkText}
          </span>
        </div>
      </div>

      {/* 16:9 Aspect Ratio Screenshot Display Container */}
      <div className="relative w-full aspect-[16/9] bg-[#F1F5F9] flex items-center justify-center p-1.5 border-b border-[#e5e7eb] overflow-hidden group">
        <Image
          src={activeProj.mockup}
          alt={activeProj.title}
          width={800}
          height={450}
          priority
          className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      {/* Compact Application Explanation & Details Section */}
      <div className="w-full p-3 sm:p-3.5 bg-[#F8FAFC] flex flex-col gap-2 shrink-0">
        {/* Top Info Bar: Title & Category & GitHub Button */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span
              className="text-[8.5px] font-bold px-1.5 py-0.5 rounded bg-[#0D9488] text-white border border-black uppercase tracking-wider whitespace-nowrap"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {activeProj.category}
            </span>
            <h3
              className="text-xs sm:text-sm font-black text-[#111] truncate"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {activeProj.title}
            </h3>
          </div>

          <a
            href={activeProj.gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold text-white bg-[#0D9488] border border-black shadow-[1.5px_1.5px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[0.5px_0.5px_0px_#000] transition-all shrink-0"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <span>GitHub</span>
            <span className="material-symbols-outlined text-[10px]">arrow_outward</span>
          </a>
        </div>

        {/* Application Explanation Description */}
        <p
          className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-medium"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {activeProj.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1 pt-1.5 border-t border-[#e5e7eb]">
          {activeProj.tags.map((t, i) => (
            <span
              key={i}
              className="px-1.5 py-0.5 rounded text-[8.5px] font-bold bg-[#fff] text-[#0D9488] border border-[#e5e7eb] transition-colors hover:border-[#0D9488]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
