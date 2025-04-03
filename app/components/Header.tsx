'use client';

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Spacer div to prevent content from being hidden under fixed header */}
      <div className="h-[72px] sm:h-[80px]" />
      
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#FEF8F1] via-[#FEF8F1]/80 to-transparent">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BF9C73] rounded">
            <Image 
              src="/images/moonlit-logo.png"
              alt="Moonlit Psychiatry Logo"
              width={32}
              height={32}
              priority
            />
            <div>
              <div className="-space-y-1">
                <div className="text-2xl sm:text-3xl font-serif text-[#091747]">
                  moonlit
                </div>
                <div className="text-xs sm:text-sm tracking-widest text-[#091747] font-light">
                  PSYCHIATRY
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/providers" 
              className="text-[#091747] hover:text-[#BF9C73] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BF9C73] rounded px-2 py-1"
            >
              Our providers
            </Link>
            <Link 
              href="/book" 
              className="px-4 py-2 text-white bg-[#BF9C73] rounded hover:bg-[#A88B68] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BF9C73]"
            >
              Book now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-[#091747] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BF9C73]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-50 md:hidden">
              <div className="px-4 pt-2 pb-4 space-y-3">
                <Link
                  href="/providers"
                  className="block py-3 text-[#091747] hover:text-[#BF9C73] focus:outline-none focus:ring-2 focus:ring-[#BF9C73] rounded px-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Our providers
                </Link>
                <Link
                  href="/book"
                  className="block py-3 px-4 text-white bg-[#BF9C73] rounded hover:bg-[#A88B68] transition-colors text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BF9C73]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book now
                </Link>
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  )
} 