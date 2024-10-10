import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface PaymentPopupProps {
  onClose: () => void;
  totalPhotos: number;
  location: string;
  locations: string[]; // Add this prop for the list of locations
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({ onClose, totalPhotos, location, locations = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(location);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Add this list of cities
  const cities = ["Bangalore", "Pune", "Mumbai", "Delhi"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="relative flex-grow mr-2" ref={dropdownRef}>
              <div 
                className="w-full py-3 px-4 rounded-lg bg-gray-100 flex justify-between items-center cursor-pointer border-2 border-gray-200"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="text-gray-700 font-normal">{selectedLocation || "Select City"}</span>
                <ChevronDown size={18} className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
              </div>
              {isOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-auto">
                  {cities.map((city, index) => (
                    <div 
                      key={index}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                      onClick={() => {
                        setSelectedLocation(city);
                        setIsOpen(false);
                      }}
                    >
                      <span className="text-sm text-gray-600">{city}</span>
                      <span className="text-xs text-gray-400">Buy Data</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-700 hover:text-gray-900"
              aria-label="Close popup"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center">
            <div className="w-32 h-32 rounded-3xl overflow-hidden  mr-6">
              <img src="/popup_img.png"  className="w-full h-full object-cover" />
            </div>
            
            <div className="text-left flex-grow">
              <span className="text-6xl font-bold">{totalPhotos}</span>
              <h2 className="text-2xl font-bold">302</h2>
              <p className="text-gray-500 mt-2 text-lg font-bold">Total Number of photos</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Amount to pay : 2 ETH</span>
            <span className="text-blue-500">Pay through Meta mask</span>
          </div>
          <button 
            className="w-full py-3 bg-lime-400 text-black text-lg font-semibold rounded-md"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;