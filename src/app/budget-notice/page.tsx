import Link from "next/link";

export default function BudgetNoticePage() {
  return (
    <div className="flex-1 relative flex flex-col items-center justify-center bg-white px-6 py-24 md:py-32 overflow-hidden font-sans">
      {/* Subtle ambient background grid & warm glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-stone-200/50 via-amber-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Luxury Container */}
      <div className="relative z-10 max-w-2xl w-full bg-white/85 backdrop-blur-xl border border-neutral-200/80 rounded-3xl p-8 sm:p-12 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center flex flex-col items-center">
        
        {/* Architectural Luxury Crest */}
        <div className="relative mb-8 group">
          <div className="absolute -inset-2 bg-gradient-to-r from-stone-400 to-amber-700/40 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
          <div className="relative w-20 h-20 bg-gradient-to-br from-neutral-900 to-neutral-800 text-stone-200 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300 border border-stone-700/50">
            <svg className="w-9 h-9 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>

        {/* Editorial Heading */}
        <h2 className="text-sm font-semibold tracking-[0.25em] text-neutral-500 uppercase mb-3">
          Project Scope & Thresholds
        </h2>
        <h1 className="text-4xl sm:text-5xl md:text-[52px] font-bold text-neutral-900 tracking-tight mb-6 leading-[1.1]">
          A Note on Our <span className="font-serif italic font-normal">Minimum Scope.</span>
        </h1>

        {/* The Exact User Requested Statement */}
        <div className="relative bg-[#f8f9f8] border-l-4 border-[#105E3F] rounded-r-2xl border-y border-r border-neutral-200/70 px-6 py-6 mb-10 max-w-lg w-full text-left sm:text-center shadow-xs">
          <p className="text-lg md:text-xl text-neutral-800 font-medium leading-relaxed">
            “Thankyou for enquiring but we dont do projects under 75 lakhs”
          </p>
        </div>

        {/* Luxury Subtext */}
        <p className="text-sm text-neutral-500 mb-10 max-w-md leading-relaxed">
          We focus exclusively on large-scale turnkey architecture and luxury interior developments. We sincerely appreciate your interest and wish you the absolute best with your upcoming project!
        </p>

        {/* Premium Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center gap-3 bg-neutral-900 hover:bg-black text-white font-medium text-sm md:text-base px-9 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-xl active:scale-[0.99] w-full sm:w-auto overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Homepage
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
}
