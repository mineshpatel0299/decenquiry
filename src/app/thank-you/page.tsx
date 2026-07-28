import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="flex-1 relative flex flex-col items-center justify-center bg-white px-6 py-24 md:py-32 overflow-hidden font-sans">
      {/* Subtle ambient background grid & warm glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-emerald-100/40 via-teal-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Premium Container */}
      <div className="relative z-10 max-w-2xl w-full bg-white/80 backdrop-blur-3xl border border-white/60 rounded-[2.5rem] p-8 sm:p-14 md:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05),0_0_40px_rgba(16,94,63,0.03)] text-center flex flex-col items-center">

        {/* Premium Approved Icon & Status */}
        <div className="relative mb-8 group">
          <div className="relative flex items-center justify-center mt-2">
            {/* Elegant expanding ripple rings on hover */}
            <div className="absolute w-[88px] h-[88px] rounded-full bg-[#105E3F]/[0.03] border border-[#105E3F]/10 scale-100 group-hover:scale-110 transition-transform duration-700 ease-out" />
            <div className="absolute w-[72px] h-[72px] rounded-full bg-[#105E3F]/[0.05] border border-[#105E3F]/20 scale-100 group-hover:scale-105 transition-transform duration-500 ease-out delay-75" />

            {/* Core Icon Badge */}
            <div className="relative w-14 h-14 bg-gradient-to-br from-[#105E3F] to-[#0a422b] text-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(16,94,63,0.3)] z-10">
              {/* Subtle glass reflection on the badge */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-60" />

              <svg className="w-6 h-6 stroke-[2.5] relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <h2 className="text-[10px] font-semibold tracking-[0.3em] text-[#105E3F]/80 uppercase mb-4">
          Lead Status
        </h2>

        <h1 className="text-4xl sm:text-[46px] font-bold text-neutral-900 tracking-tight mb-8 leading-[1.15]">
          This Lead Has Been <br />
          <span className="font-serif italic font-light text-[#105E3F] relative inline-block mt-1">
            Approved
            <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#105E3F]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </span>
        </h1>

        {/* Premium Message Box */}
        <div className="relative bg-[#f9fdfa] border border-[#105E3F]/10 rounded-2xl px-6 sm:px-8 py-6 sm:py-7 mb-10 w-full max-w-lg shadow-[inset_0_1px_0_rgba(255,255,255,1),0_8px_20px_-4px_rgba(16,94,63,0.04)] text-center">
          <p className="text-[15px] sm:text-[15.5px] text-neutral-700 leading-[1.7] font-medium">
            Thank you for enquiring. Your project meets our minimum execution value of <span className="font-semibold text-[#105E3F]">₹75 Lakhs</span>, and our team will get in touch with you shortly to discuss the next steps.
          </p>
        </div>

        {/* Subtext */}
        <p className="text-[13px] sm:text-sm text-neutral-400 mb-10 max-w-md leading-relaxed px-4">
          Our senior design consultants are reviewing your project vision and will reach out to you via phone or email within 24 business hours. We look forward to collaborating with you!
        </p>

        {/* Premium Action Button */}
        <div className="flex flex-col items-center justify-center w-full">
          <Link
            href="https://www.decofice.com/"
            className="group relative inline-flex items-center justify-center gap-3 bg-[#105E3F] text-white font-medium text-sm px-10 py-4 rounded-full transition-all duration-300 shadow-[0_8px_20px_rgba(16,94,63,0.25)] hover:shadow-[0_12px_25px_rgba(16,94,63,0.35)] active:scale-[0.98] overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <svg className="w-4 h-4 relative z-10 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="relative z-10 tracking-wide">Return to Homepage</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
