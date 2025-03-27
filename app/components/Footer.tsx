import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer 
      className="relative bg-cover bg-center py-12"
      style={{ backgroundImage: 'url("/images/moonlit _ footer background.png")' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Logo and Contact Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-4">
              <Image 
                src="/images/moonlit-logo.png"
                alt="Moonlit Psychiatry Logo"
                width={32}
                height={32}
              />
              <div className="-space-y-1">
                <div className="text-3xl font-serif text-[#091747]">
                  moonlit
                </div>
                <div className="text-sm tracking-widest text-[#091747] font-light">
                  PSYCHIATRY
                </div>
              </div>
            </Link>
            <div className="space-y-1 text-[#091747]">
              <p className="text-sm">Leave us a message</p>
              <p className="text-sm">and we'll get back to you:</p>
              <p className="text-lg mt-2">(385) 246-2522</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <Link href="/about" className="block text-[#091747] hover:text-[#BF9C73]">
              about
            </Link>
            <Link href="/providers" className="block text-[#091747] hover:text-[#BF9C73]">
              see a psychiatrist
            </Link>
            <Link href="/refer" className="block text-[#091747] hover:text-[#BF9C73]">
              refer your client
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 