import React from 'react'
import { Star } from "lucide-react";

const QuoteIcon = () => (
  <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 22V13.4C0 10.867 0.567 8.567 1.7 6.5C2.9 4.433 4.667 2.7 7 1.3L9.1 4.3C7.567 5.233 6.367 6.333 5.5 7.6C4.7 8.867 4.267 10.3 4.2 11.9H8.4V22H0ZM15.6 22V13.4C15.6 10.867 16.167 8.567 17.3 6.5C18.5 4.433 20.267 2.7 22.6 1.3L24.7 4.3C23.167 5.233 21.967 6.333 21.1 7.6C20.3 8.867 19.867 10.3 19.8 11.9H24V22H15.6Z" fill="#2D7A4F"/>
  </svg>
);

export default function TestimonialCards({ title, description, image, location, rating = 5 }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm max-w-[300px] mx-auto lg:mx-0 p-5 flex flex-col gap-4">
      <QuoteIcon />
      <p className="body-text text-sm text-gray-700 w-3/4 leading-relaxed">{description}</p>
      <div className="flex items-center gap-3">
        <img src={image} alt={title} className="w-11 h-11 rounded-full object-cover" />
        <div className='flex flex-col space-y-[4px]'>
          <h3 className="card-title text-sm font-semibold text-gray-900">{title}</h3>
          <p className="caption text-xs text-gray-400 mb-2">{location}</p>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={13} className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}