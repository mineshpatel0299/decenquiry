"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

// Dropdown options based on screenshots
const BUDGET_OPTIONS = [
  "Under 50 Lakhs",
  "Under 75 Lakhs",
  "₹75 - ₹1 Crores",
  "₹1 - ₹1.5 Crores",
  "₹1.5 - ₹3.5 Crores",
  "₹3.5 - ₹5 Crores",
  "₹5 - ₹10 Crores",
  "Above ₹10 Crores"
];

const START_TIME_OPTIONS = [
  "As soon as possible",
  "Within 2–3 months",
  "3 – 6 months",
  "6 - 9 Months",
  "After 1 year / Not in the near future",
];

const SERVICE_OPTIONS = [
  "Turnkey: Design + Construction",
  "Design Consultation",
  "Construction Only",
];

const HEARD_ABOUT_OPTIONS = [
  "While Googling",
  "Facebook",
  "Instagram",
  "Our Ongoing Site",
  "Quora",
  "Social Media Advertisement",
  "Bill Boards",
  "Referral",
  "Others"
];

const COUNTRY_OPTIONS = [
  { flag: "🇮🇳", code: "+91", name: "India" },
  { flag: "🇦🇪", code: "+971", name: "United Arab Emirates" },
  { flag: "🇺🇸", code: "+1", name: "United States" },
  { flag: "🇬🇧", code: "+44", name: "United Kingdom" },
  { flag: "🇨🇦", code: "+1", name: "Canada" },
  { flag: "🇦🇺", code: "+61", name: "Australia" },
  { flag: "🇸🇬", code: "+65", name: "Singapore" },
  { flag: "🇩🇪", code: "+49", name: "Germany" },
  { flag: "🇫🇷", code: "+33", name: "France" },
  { flag: "🇸🇦", code: "+966", name: "Saudi Arabia" },
  { flag: "🇶🇦", code: "+974", name: "Qatar" },
  { flag: "🇰🇼", code: "+965", name: "Kuwait" },
  { flag: "🇴🇲", code: "+968", name: "Oman" },
  { flag: "🇧🇭", code: "+973", name: "Bahrain" },
  { flag: "🇲🇾", code: "+60", name: "Malaysia" },
  { flag: "🇿🇦", code: "+27", name: "South Africa" },
];

interface CustomDropdownProps {
  label?: string;
  sublabel?: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}

function CustomDropdown({
  label,
  sublabel,
  placeholder,
  options,
  value,
  onChange,
  required = true,
  error,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full text-left" ref={dropdownRef}>
      {label && (
        <label className="block text-[13px] md:text-sm font-medium text-neutral-800 mb-1.5 leading-snug">
          {label} {required && <span className="text-neutral-800">*</span>}
        </label>
      )}
      {sublabel && (
        <p className="text-[12px] md:text-[13px] text-neutral-600 mb-1.5 leading-relaxed">
          {sublabel}
        </p>
      )}

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white border ${error ? "border-red-400 bg-red-50/10" : "border-[#cfd0cf] hover:border-neutral-400"
          } rounded-lg px-4 py-3 text-sm flex items-center justify-between cursor-pointer transition-all shadow-2xs select-none ${isOpen ? "ring-1 ring-black border-black" : ""
          }`}
      >
        <span className={value ? "text-neutral-900 font-normal" : "text-neutral-400"}>
          {value || placeholder}
        </span>
        <span className="text-neutral-500 transition-transform duration-200">
          {isOpen ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
      </div>

      <input
        type="text"
        required={required}
        value={value}
        onChange={() => {}}
        tabIndex={-1}
        aria-hidden="true"
        className="opacity-0 absolute h-0 w-0 pointer-events-none -z-10"
      />

      {error && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}

      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-[#cfd0cf] rounded-lg shadow-xl max-h-[260px] overflow-y-auto py-1 animate-in fade-in zoom-in-95 duration-100">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center justify-between ${value === option ? "bg-neutral-100 text-black font-medium" : "text-neutral-700 hover:bg-neutral-50"
                }`}
            >
              <span>{option}</span>
              {value === option && (
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function EnquiryForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    startTime: "",
    projectKind: "",
    location: "",
    service: "",
    aboutProject: "",
    heardAbout: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [countryCode, setCountryCode] = useState(COUNTRY_OPTIONS[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDropdownChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    if (!formData.email.trim()) newErrors.email = "Please enter a valid email address.";
    if (!formData.phone.trim()) newErrors.phone = "Please enter your phone number.";
    if (!formData.budget) newErrors.budget = "Choose an option.";
    if (!formData.startTime) newErrors.startTime = "Choose an option.";
    if (!formData.projectKind.trim()) newErrors.projectKind = "Please specify the kind of project.";
    if (!formData.location.trim()) newErrors.location = "Please enter the plot location.";
    if (!formData.service) newErrors.service = "Choose an option.";
    if (!formData.aboutProject.trim()) newErrors.aboutProject = "Please share a brief about your project.";
    if (!formData.heardAbout) newErrors.heardAbout = "Choose an option.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (formData.budget === "Under 50 Lakhs" || formData.budget === "Under 75 Lakhs") {
      router.push("/budget-notice");
    } else {
      router.push("/thank-you");
    }
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-12 md:py-16">
      {/* Header text */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-black tracking-tight mb-3">
          Dive In:
        </h2>
        <h1 className="text-4xl md:text-5xl lg:text-[62px] font-bold text-black tracking-tight mb-5">
          Submit Your <span className="font-serif italic font-medium">Enquiry</span> Today!
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 font-normal max-w-3xl mx-auto">
          Because asking questions helps us avoid guessing. — who doesn&apos;t love clarity?
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-[#ebeceb] border border-black rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm relative">
        {submitted && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-sm flex items-center justify-between animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Thank you! Your enquiry has been submitted successfully. We will get in touch soon.</span>
            </div>
            <button onClick={() => setSubmitted(false)} className="text-emerald-600 hover:text-emerald-800 font-bold px-2">×</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          {/* Row 1: Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div>
              <label className="block text-[13px] md:text-sm font-medium text-neutral-800 mb-1.5">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full bg-white border ${errors.name ? "border-red-400 bg-red-50/10" : "border-[#cfd0cf]"
                  } rounded-lg px-4 py-3 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-[13px] md:text-sm font-medium text-neutral-800 mb-1.5">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full bg-white border ${errors.email ? "border-red-400 bg-red-50/10" : "border-[#cfd0cf]"
                  } rounded-lg px-4 py-3 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
          </div>

          {/* Row 2: Phone Number */}
          <div>
            <label className="block text-[13px] md:text-sm font-medium text-neutral-800 mb-1.5">
              Phone Number *
            </label>
            <div
              className={`w-full bg-white border ${errors.phone ? "border-red-400 bg-red-50/10" : "border-[#cfd0cf]"
                } rounded-lg px-3.5 py-2.5 flex items-center gap-2.5 focus-within:ring-1 focus-within:ring-black focus-within:border-black transition-all`}
            >
              <div className="relative" ref={countryRef}>
                <div
                  onClick={() => setIsCountryOpen(!isCountryOpen)}
                  className="flex items-center gap-1.5 shrink-0 border-r border-neutral-200 pr-3 py-0.5 cursor-pointer select-none hover:opacity-80 transition-opacity"
                >
                  <span className="text-base leading-none">{countryCode.flag}</span>
                  <span className="text-xs md:text-sm font-medium text-neutral-800">{countryCode.code}</span>
                  <svg
                    className={`w-3 h-3 text-neutral-500 transition-transform duration-200 ${isCountryOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {isCountryOpen && (
                  <div className="absolute z-50 left-0 top-full mt-2 w-64 bg-white border border-[#cfd0cf] rounded-xl shadow-2xl max-h-60 overflow-y-auto py-1.5 animate-in fade-in zoom-in-95 duration-150">
                    {COUNTRY_OPTIONS.map((country) => (
                      <div
                        key={country.name}
                        onClick={() => {
                          setCountryCode(country);
                          setIsCountryOpen(false);
                        }}
                        className={`px-3.5 py-2 text-sm cursor-pointer transition-colors flex items-center justify-between ${
                          countryCode.name === country.name
                            ? "bg-neutral-100 text-black font-semibold"
                            : "text-neutral-700 hover:bg-neutral-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className="text-base leading-none shrink-0">{country.flag}</span>
                          <span className="truncate text-xs md:text-sm">{country.name}</span>
                        </div>
                        <span className="text-neutral-500 font-mono text-xs shrink-0 ml-2">{country.code}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="w-full bg-transparent text-sm text-black placeholder:text-neutral-400 focus:outline-none"
              />
            </div>
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
          </div>

          {/* Row 3: Project Budget Dropdown */}
          <CustomDropdown
            label="What is your estimated total project budget (Design + Execution)? Kindly note that we currently undertake projects with a minimum project value of ₹75 lakhs and above. If your budget is below this threshold, we may not be the right fit for your project."
            placeholder="Select your budget range"
            options={BUDGET_OPTIONS}
            value={formData.budget}
            onChange={(val) => handleDropdownChange("budget", val)}
            error={errors.budget}
          />

          {/* Row 4: Project Start Time Dropdown */}
          <CustomDropdown
            label="When do you plan to start the project?"
            placeholder="As soon as possible"
            options={START_TIME_OPTIONS}
            value={formData.startTime}
            onChange={(val) => handleDropdownChange("startTime", val)}
            error={errors.startTime}
          />

          {/* Row 5: Kind of project */}
          <div>
            <label className="block text-[13px] md:text-sm font-medium text-neutral-800 mb-1.5">
              What kind of project are you looking to build? *
            </label>
            <input
              type="text"
              name="projectKind"
              value={formData.projectKind}
              onChange={handleInputChange}
              placeholder="Villa/Farmhouse/Resort/Apartment Interior/Office"
              className={`w-full bg-white border ${errors.projectKind ? "border-red-400 bg-red-50/10" : "border-[#cfd0cf]"
                } rounded-lg px-4 py-3 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all`}
            />
            {errors.projectKind && <p className="mt-1 text-xs text-red-500">{errors.projectKind}</p>}
          </div>

          {/* Row 6: Project Location */}
          <div>
            <label className="block text-[13px] md:text-sm font-medium text-neutral-800 mb-1.5">
              Where will the project site be situated? *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter the plot location"
              className={`w-full bg-white border ${errors.location ? "border-red-400 bg-red-50/10" : "border-[#cfd0cf]"
                } rounded-lg px-4 py-3 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all`}
            />
            {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location}</p>}
          </div>

          {/* Row 7: Service Dropdown */}
          <CustomDropdown
            label="What specific service do you need from decofice?"
            placeholder="Select the service you need"
            options={SERVICE_OPTIONS}
            value={formData.service}
            onChange={(val) => handleDropdownChange("service", val)}
            error={errors.service}
          />

          {/* Row 8: About Project */}
          <div>
            <label className="block text-[13px] md:text-sm font-medium text-neutral-800 mb-1.5">
              What do you want us to know about your project or vision? *
            </label>
            <textarea
              name="aboutProject"
              value={formData.aboutProject}
              onChange={handleInputChange}
              rows={4}
              placeholder="Share a brief about your project."
              className={`w-full bg-white border ${errors.aboutProject ? "border-red-400 bg-red-50/10" : "border-[#cfd0cf]"
                } rounded-lg px-4 py-3 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all resize-none`}
            />
            {errors.aboutProject && <p className="mt-1 text-xs text-red-500">{errors.aboutProject}</p>}
          </div>

          {/* Row 9: How did you know about us? */}
          <CustomDropdown
            label="How did you know about us?"
            placeholder="Select how you heard about us"
            options={HEARD_ABOUT_OPTIONS}
            value={formData.heardAbout}
            onChange={(val) => handleDropdownChange("heardAbout", val)}
            error={errors.heardAbout}
          />

          {/* Row 10: Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-black text-white hover:bg-neutral-800 font-medium text-sm md:text-base py-3.5 md:py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
