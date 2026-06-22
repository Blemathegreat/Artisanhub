import { useState } from "react";
import TestimonialCards from "./TestimonialCards";
import { testimonialData } from "../assets/Photos";
import {motion} from "framer-motion";
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,    // faster stagger feels more fluid
      delayChildren: 0.1        // slight pause before first card appears
    }
  }
}

const itemVariant = {
  hidden: { 
    opacity: 0, 
    y: 40                      
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",           
      stiffness: 80,            
      damping: 14               
    }
  }
}

export default function TestimonialsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(testimonialData.length / itemsPerPage);

  // slice out only the current page's items
  const currentItems = testimonialData.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div className="w-full py-14 px- lg:px-10">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900">What our customers say</h2>
        <p className="text-sm text-gray-400 mt-1">Real experiences from real people</p>
      </div>

     <motion.div 
  variants={containerVariant} 
  initial="hidden" 
  whileInView="visible"
  viewport={{ once: true }}
  className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ml-[20px]"
>
  {currentItems.map((t) => (
    <motion.div variants={itemVariant} whileHover={{ 
    y: -6,
    scale: 1.02,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }} key={t.title}>
      <TestimonialCards {...t} />
    </motion.div>
  ))}
</motion.div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`rounded-full transition-all duration-300 ${
              i === currentPage
                ? "w-3 h-3 bg-green-700"
                : "w-2.5 h-2.5 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}