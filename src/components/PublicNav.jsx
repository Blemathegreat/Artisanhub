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
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">

        {/* Logo and Tagline */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={photos.logo}
            alt="ArtisanHub Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
          />

          <div className="flex flex-col leading-tight">
            <h1 className="display-heading text-lg sm:text-xl font-bold text-gray-900">
              Artisan
              <span className="text-green-500">Hub</span>
            </h1>

            <p className="caption text-xs text-gray-500">
              Find. Trust. Get it done.
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navlinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `body-text text-sm font-medium transition-colors duration-300 ${
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

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="body-text text-sm font-medium text-gray-700 hover:text-green-500 transition-colors duration-300"
          >
            Sign In
          </Link>

          <Link
            to="/onboarding"
            className="body-text bg-green-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-green-600 transition-colors duration-300 shadow-sm"
          >
            Join as Artisan
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen
            ? <X className="w-6 h-6" />
            : <Menu className="w-6 h-6" />
          }
        </button>

      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white border-t border-gray-100 px-4 sm:px-6 py-4"
        >
          <nav
            className="flex flex-col"
            aria-label="Mobile navigation"
          >
            {navlinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `body-text py-3 text-sm font-medium transition-colors duration-300 border-b border-gray-50 last:border-b-0 ${
                    isActive ? "text-green-500" : "text-gray-700 hover:text-green-500"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="flex flex-col gap-3 pt-4">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="body-text text-sm font-medium text-gray-700 hover:text-green-500 transition-colors duration-300 py-2.5 text-center border border-gray-200 rounded-xl"
              >
                Sign In
              </Link>

              <Link
                to="/for-artisans"
                onClick={() => setIsMobileMenuOpen(false)}
                className="body-text bg-green-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium text-center hover:bg-green-600 transition-colors duration-300 shadow-sm"
              >
                Join as Artisan
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}