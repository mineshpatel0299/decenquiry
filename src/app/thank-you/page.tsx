import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="flex-1 relative flex flex-col items-center justify-center bg-white px-6 py-24 md:py-32 overflow-hidden font-sans">
      {/* Subtle ambient background glow & grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-100/40 via-teal-50/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Luxury Container */}
      <div className="relative z-10 max-w-2xl w-full bg-white/80 backdrop-blur-xl border border-neutral-200/80 rounded-3xl p-8 sm:p-12 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center flex flex-col items-center">
        
        {/* Premium Animated Icon Crest */}
        <div className="relative mb-8 group">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#105E3F] to-emerald-400 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
          <div className="relative w-20 h-20 bg-gradient-to-br from-[#105E3F] to-[#0a422b] text-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
            <svg className="w-9 h-9 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Editorial Heading */}
        <h2 className="text-sm font-semibold tracking-[0.25em] text-[#105E3F] uppercase mb-3">
          Submission Successful
        </h2>
        <h1 className="text-4xl sm:text-5xl md:text-[54px] font-bold text-neutral-900 tracking-tight mb-6 leading-[1.1]">
          Thank You for Your <span className="font-serif italic font-normal">Enquiry.</span>
        </h1>

        {/* The Exact User Requested Statement */}
        <div className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-6 py-5 mb-10 max-w-lg w-full">
          <p className="text-lg md:text-xl text-neutral-800 font-medium leading-relaxed">
            “Thankyou for submitting the enquiry our team shall get in touch with you soon”
          </p>
        </div>

        {/* Subtext info */}
        <p className="text-sm text-neutral-500 mb-10 max-w-md leading-relaxed">
          Our senior design consultants are reviewing your project vision and will reach out via phone or email within 24 business hours.
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
