import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from './components/Header'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FEF8F1]">
      <Header />
      
      {/* Hero Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h1 className="text-[2.25rem] font-serif text-[#091747] mb-16">
          See a psychiatrist{' '}
          <span className="text-[#F4B69C]">faster</span>.
        </h1>
        <div className="grid grid-cols-2 gap-16 mb-12">
          <Link 
            href="/book" 
            className="block bg-white p-6 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all hover:translate-y-[-2px] hover:bg-[#BF9C73] group"
          >
            <h2 className="text-[2rem] font-serif text-[#091747] group-hover:text-white">
              I'd like to see a<br />psychiatrist.
            </h2>
          </Link>
          <Link 
            href="/refer" 
            className="block bg-white p-6 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all hover:translate-y-[-2px] hover:bg-[#BF9C73] group"
          >
            <h2 className="text-[2rem] font-serif text-[#091747] group-hover:text-white">
              I'd like to refer<br />my client.
            </h2>
          </Link>
        </div>
        <div className="text-center">
          <p className="text-lg text-[#091747]">
            Fast. Discreet. Telehealth. And serving all of Utah.
          </p>
          <p className="text-lg text-[#091747]">
            Meet an empathetic, invested professional as soon as tomorrow.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 bg-[#FEF8F1]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <p className="text-xl font-serif text-[#091747] mb-6">
                "I ran out of my medication weeks before I'd be able to see any of my go-to doctors. My Moonlit psychiatrist listened to my situation, and I picked up my refill within hours of realizing I was out, which I expected and hoped for. What I didn't expect was how kind the doctor was."
              </p>
              <div className="flex items-center justify-between">
                <p className="text-[#091747] italic">- E.F., patient</p>
                <Image 
                  src="/images/my-notion-face-transparent.png"
                  alt="Avatar illustration"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <p className="text-xl font-serif text-[#091747] mb-6">
                  "Got the meds I needed weeks sooner than if I'd waited to see my normal doctor. It was fast, but he also listened and cared."
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-[#091747] italic">- E.S., patient</p>
                  <Image 
                    src="/images/my-notion-face-transparent (2).png"
                    alt="Avatar illustration"
                    width={64}
                    height={64}
                    className="w-16 h-16"
                  />
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <p className="text-xl font-serif text-[#091747] mb-6">
                  "You're kind and personable. Way less robotic than others I've seen."
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-[#091747] italic">- Anon, patient</p>
                  <Image 
                    src="/images/my-notion-face-transparent (3).png"
                    alt="Avatar illustration"
                    width={64}
                    height={64}
                    className="w-16 h-16"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-8 mt-16">
            <Link 
              href="/book"
              className="px-8 py-3 bg-[#091747] text-white rounded hover:bg-[#0c1f5e] transition-colors font-serif text-lg"
            >
              Book now
            </Link>
            <Link
              href="/providers"
              className="px-8 py-3 border-2 border-[#091747] text-[#091747] rounded hover:bg-[#091747] hover:text-white transition-colors font-serif text-lg"
            >
              Browse providers
            </Link>
          </div>
        </div>
      </section>

      {/* States We Serve */}
      <section className="px-6 py-16 bg-[#FEF8F1]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-serif text-[#091747] mb-8">
            States we serve
          </h2>
          <div className="flex justify-center">
            <Image 
              src="/images/utah icon.png"
              alt="Utah state icon"
              width={120}
              height={160}
              className="mx-auto"
            />
          </div>
        </div>
      </section>
    </main>
  )
} 