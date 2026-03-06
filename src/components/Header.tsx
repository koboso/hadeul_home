"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 glass-card">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold gradient-text">
          HADEUL
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-text-secondary hover:text-text-primary transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-text-secondary hover:text-text-primary transition-colors">
            About
          </Link>
          <Link href="#services" className="text-text-secondary hover:text-text-primary transition-colors">
            Services
          </Link>
          <Link href="#contact" className="text-text-secondary hover:text-text-primary transition-colors">
            Contact
          </Link>
          <button className="px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg text-white text-sm transition-colors">
            문의하기
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-text-primary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-card border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          <Link href="/" className="text-text-secondary hover:text-text-primary" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" className="text-text-secondary hover:text-text-primary" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="#services" className="text-text-secondary hover:text-text-primary" onClick={() => setIsOpen(false)}>Services</Link>
          <Link href="#contact" className="text-text-secondary hover:text-text-primary" onClick={() => setIsOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
}
