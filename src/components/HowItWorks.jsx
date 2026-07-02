import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Search",
    description: "Search for the service you need and find artisans near you.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#0F6E56]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>
    ),
    iconBg: "bg-[#E1F5EE]",
    iconWrapperClass: "rounded-full",
  },
  {
    id: 2,
    title: "Choose",
    description: "View profiles, ratings and reviews to choose the right artisan.",
    icon: (
      <div className="flex flex-col items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6l4 4v10a2 2 0 0 1-2 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M9 16h4" />
          <circle cx="9" cy="8" r="1.5" fill="currentColor" />
        </svg>
        <div className="flex gap-0.5">
          {[...Array(3)].map((_, i) => (
            <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    ),
    iconBg: "bg-[#0F6E56]",
    iconWrapperClass: "rounded-xl",
  },
  {
    id: 3,
    title: "Connect",
    description: "Contact the artisan easily and get your job done satisfactorily.",
    icon: (
      <div className="relative w-8 h-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#0F6E56]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <div className="absolute -bottom-1 -right-1 bg-[#E1F5EE] rounded-full p-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-[#0F6E56]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
      </div>
    ),
    iconBg: "bg-[#E1F5EE]",
    iconWrapperClass: "rounded-full",
  },
];
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5  // delay between each child
    }
  }
};
const childrenVariant ={
  hidden:{opacity:0},
  visible:{opacity:1},
  
  
}

const Connector = () => (
  <div className="hidden md:flex items-center self-center mb-8 ">
    <div className="w-[200px] border-t-2 border-dashed border-[#1D9E75] opacity-90" />
  </div>
);

export default function HowItWorks() {
  return (
    <section className="py-14 px-4 bg-white text-center">
      <h2 className="section-heading text-2xl font-bold text-gray-900 mb-2">How it works</h2>
      <p className="caption text-sm text-gray-500 mb-12">Get the best artisan service in 3 easy steps</p>

      <motion.div variants={containerVariants} initial="hidden" whileInView="visible"  className className="flex flex-col lg:flex-row items-center lg:justify-between   gap-4 md:gap-0 px-6 lg:px-10">
        {steps.map((step, index) => (
          <>
            {/* Card */}
            <motion.div
              key={step.id}
              variants={childrenVariant}
              className="flex  items-center lg:justify-between gap-3 md:space-x-4  bg-white border border-gray-200 rounded-2xl px-4 py-6 md:py-10 w-full  shadow-sm"
            >
              {/* Icon */}
              <div
                className={`w-20 h-20 flex items-center flex-shrink-0  ${step.iconBg} ${step.iconWrapperClass}  justify-center`}
              >
              
                  {step.icon}
              
              </div>

              {/* Text */}
             <div className="flex flex-col gap-3 items-start text-left">
               <p className="card-title text-sm font-bold text-gray-900">{step.id}. {step.title}</p>
              <p className="body-text text-xs text-gray-700 leading-relaxed font-bold">{step.description}</p>
             </div>
            </motion.div>

            {/* Dashed connector between cards */}
            {index < steps.length - 1 && <Connector key={`connector-${index}`} />}
          </>
        ))}
      </motion.div>
    </section>
  );
}