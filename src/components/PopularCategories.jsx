import React from 'react';
import { Scissors, Shirt, Wrench, Zap, Car, LayoutGrid, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion";

const categories = [
  { Icon: Scissors, title: "Barbers", subtitle: "& Hair Stylist", id: "0001" },
  { Icon: Shirt, title: "Tailors", subtitle: "& Fashion Designers", id: "0002" },
  { Icon: Wrench, title: "Plumbers", subtitle: "& Pipe Fitters", id: "0003" },
  { Icon: Zap, title: "Electricians", subtitle: "& Installers", id: "0004" },
  { Icon: Car, title: "Mechanics", subtitle: "& Auto Experts", id: "0005" },
  { Icon: LayoutGrid, title: "More", subtitle: "Categories", id: "0006" },
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

const childVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};


export default function PopularCategories() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white py-14 px-6">

      {/* Header */}
      <div className="flex flex-col items-center gap-2 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Popular Categories</h2>
        <p className="text-sm text-gray-400">Explore top artisan services</p>
      </div>

      {/* Cards Grid */}
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{  amount:0.2 }} className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 px-6 lg:px-10">
        {categories.map((cat) => {
          const isMore = cat.title === "More";
          return (
            <motion.div variants={childVariants}
              key={cat.title}
              onClick={() => navigate(isMore ? "/categories" : `/category/${cat.id}`)}
              className="bg-white border border-gray-100 shadow-sm rounded-xl py-6 px-4 flex flex-col items-center gap-3 cursor-pointer hover:shadow-md hover:border-green-100 transition group"
            >
              <div className="p-3 bg-green-50 mb-2 rounded-xl">
                <cat.Icon size={30} className="text-green-800 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-center">
                <h3 className="text-sm font-bold text-gray-900 ">{cat.title}</h3>
                <p className="text-xs text-gray-400">{cat.subtitle}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* View All */}
      <div
        onClick={() => navigate("/categories")}
        className="flex items-center justify-center gap-2 mt-10 text-green-700 font-semibold text-sm cursor-pointer hover:underline"
      >
        <span>View all categories</span>
        <ArrowRight size={16} />
      </div>

    </div>
  );
}