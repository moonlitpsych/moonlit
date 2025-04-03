import React from 'react'
import Script from 'next/script'
import Header from '../components/Header'

export default function BookPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Header />

      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-8 sm:py-12 max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-16">
          <div className="text-sm tracking-widest text-text font-light mb-4 sm:mb-8">
            BOOK AN APPOINTMENT
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-text max-w-3xl">
            Get the mental health medical attention you need{' '}
            <span className="text-[#f6b398]">without the typical wait.</span>
          </h1>
        </div>

        {/* PracticeQ Widget Container */}
        <div className="bg-white p-4 sm:p-8 rounded-lg shadow-sm max-w-2xl mx-auto">
          <div id="intakeq" className="w-full max-w-[720px] mx-auto"></div>
        </div>
      </section>

      {/* PracticeQ Widget Script */}
      <Script
        id="practiceq-widget"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function (c) {
              window.intakeq="673cd162794661bc66f3cad1";
              var i = c.createElement("script");
              i.type = "text/javascript";
              i.async = true;
              i.src = "https://intakeq.com/js/widget.min.js?1";
              document.head.appendChild(i);
            })(document);
          `
        }}
      />
    </div>
  )
} 