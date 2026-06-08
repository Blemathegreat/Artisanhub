import React from "react";
import { photos } from "../assets/Photos.js";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function PublicNav() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navlinks = [
    { name: "Home", path: "/" },
    { name: "Find Artisans", path: "/search" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "For Artisans", path: "/for-artisans" },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center justify-between px-2 lg:px-8 py-4">
        
        {/* Logo and Tagline */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={photos.logo}
            alt="ArtisanHub Logo"
            className="w-12 h-12 rounded-full object-cover"
          />

          <div className="flex flex-col leading-tight">
            <h1 className="text-xl font-bold text-gray-900">
              Artisan
              <span className="text-green-500">Hub</span>
            </h1>

            <p className="text-xs text-gray-500">
              Find. Trust. Get it done.
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navlinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-green-500"
                    : "text-gray-700 hover:text-green-500"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions */}
        <div className=" hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="hidden md:block text-sm font-medium text-gray-700 hover:text-green-500 transition-colors duration-300"
          >
            Sign In
          </Link>

          <Link
            to="/for-artisans"
            className="bg-green-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-green-600 transition-colors duration-300 shadow-sm"
          >
            Join as Artisan
          </Link>
        </div>
        {/* Hamburger Menu Button */}
        <div className="md:hidden flex items-center px-6 py-4">
  {isMobileMenuOpen
    ? <X onClick={() => setIsMobileMenuOpen(false)} className="w-6 h-6 text-gray-800 cursor-pointer" />
    : <Menu onClick={() => setIsMobileMenuOpen(true)} className="w-6 h-6 text-gray-800 cursor-pointer" />
  }
</div>
        
      </div>
         {/* Mobile Menu Button */}
        {/* Mobile Menu */}
{isMobileMenuOpen && (
  <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4">
    <nav className="flex flex-col space-y-4">
      {navlinks.map((link, index) => (
        <NavLink
          key={index}
          to={link.path}
          onClick={() => setIsMobileMenuOpen(false)}
          className={({ isActive }) =>
            `text-sm font-medium transition-colors duration-300 ${
              isActive ? "text-green-500" : "text-gray-700 hover:text-green-500"
            }`
          }
        >
          {link.name}
        </NavLink>
      ))}

      <Link
        to="/login"
        onClick={() => setIsMobileMenuOpen(false)}
        className="text-sm font-medium text-gray-700 hover:text-green-500"
      >
        Sign In
      </Link>

      <Link
        to="/for-artisans"
        onClick={() => setIsMobileMenuOpen(false)}
        className="bg-green-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium text-center hover:bg-green-600"
      >
        Join as Artisan
      </Link>
    </nav>
  </div>
)}
    </header>
  );
}