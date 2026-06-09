import React from 'react';
import { ShieldCheck, ThumbsUp, MapPin, Lock } from "lucide-react";

const reasons = [
  {
    Icon: ShieldCheck,
    title: "Verified Artisans",
    subtitle: "All artisans are reviewed and verified for your peace of mind.",
  },
  {
    Icon: ThumbsUp,
    title: "Quality Service",
    subtitle: "Skilled professionals delivering top-notch service.",
  },
  {
    Icon: MapPin,
    title: "Local & Nearby",
    subtitle: "Find experts near you, fast and convenient.",
  },
  {
    Icon: Lock,
    title: "Safe & Secure",
    subtitle: "Your information and payments are always protected.",
  },
];

export default function WhyChooseUs() {
  return (
    <div className="w-full px-6 py-10">
      <div className="max-w-7xl mx-auto bg-gray-100 rounded-2xl px-10 py-10">

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Why choose ArtisanHub?
        </h2>

        {/* Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-8">
          {reasons.map((reason) => (
            <div key={reason.title} className="flex items-start gap-4">
              {/* Icon */}
              <div className="p-2  rounded-xl shrink-0">
                <reason.Icon size={40} className="text-green-700" />
              </div>
              {/* Text */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">{reason.title}</h3>
                <p className="text-xs text-gray-500 leading-5">{reason.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}