import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <nav className="flex items-center justify-between px-6 py-4">
      <Link href="/" className="flex items-center gap-4">
        <Image 
          src="/images/moonlit-logo.png"
          alt="Moonlit Psychiatry Logo"
          width={32}
          height={32}
          priority
        />
        <div>
          <div className="-space-y-1">
            <div className="text-3xl font-serif text-[#091747]">
              moonlit
            </div>
            <div className="text-sm tracking-widest text-[#091747] font-light">
              PSYCHIATRY
            </div>
          </div>
        </div>
      </Link>
      <div className="flex items-center space-x-6">
        <Link href="/providers" className="text-[#091747] hover:text-[#BF9C73]">
          Our providers
        </Link>
        <Link 
          href="/book" 
          className="px-4 py-2 text-white bg-[#BF9C73] rounded hover:bg-[#A88B68] transition-colors"
        >
          Book now
        </Link>
      </div>
    </nav>
  )
} 