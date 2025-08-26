
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Connecting{' '}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Businesses, People & Opportunities
            </span>
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                CONNECTREE
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Building digital bridges between businesses and customers through innovative technology and trusted connections.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Company Links */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Company</h4>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-blue-500 transition-colors duration-200 text-sm"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-blue-500 transition-colors duration-200 text-sm"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-blue-500 transition-colors duration-200 text-sm"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-blue-500 transition-colors duration-200 text-sm"
                    >
                      Career
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-blue-500 transition-colors duration-200 text-sm"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Help Links */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Help</h4>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-blue-500 transition-colors duration-200 text-sm"
                    >
                      Customer Support
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-blue-500 transition-colors duration-200 text-sm"
                    >
                      Free listing
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-blue-500 transition-colors duration-200 text-sm"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-blue-500 transition-colors duration-200 text-sm"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-blue-500 transition-colors duration-200 text-sm"
                    >
                      Legal
                    </a>
                  </li>
                </ul>
              </div>

              {/* Features Links */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Features</h4>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-blue-500 transition-colors duration-200 text-sm"
                    >
                      Business Listings
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-blue-500 transition-colors duration-200 text-sm"
                    >
                      Digital card generation
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-blue-500 transition-colors duration-200 text-sm"
                    >
                      Networking
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-blue-500 transition-colors duration-200 text-sm"
                    >
                      Software solutions
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-blue-500 transition-colors duration-200 text-sm"
                    >
                      Video platform
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © 2025 Connectree. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
