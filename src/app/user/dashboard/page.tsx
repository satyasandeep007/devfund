"use client";

import { useAccount } from "wagmi";
import { FC, useState, useRef, useEffect } from "react";
import PaymentPopup from "@/components/Paymentpopup";

const Dashboard: FC = () => {
  const { isConnected } = useAccount();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Bangalore");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const cities = ["Bangalore", "Pune", "Mumbai", "Delhi"];

  const drives = [
      {
        date: "09 Sep 2024, IST 13:26",
        coordinates: "12.993200, 77.701580",
        imageUrl: "/path-to-image.jpg", // Replace with actual image paths
      },
      {
        date: "09 Sep 2024, IST 13:26",
        coordinates: "12.993200, 77.701580",
        imageUrl: "/path-to-image.jpg",
      },
      {
        date: "09 Sep 2024, IST 13:26",
        coordinates: "12.993200, 77.701580",
        imageUrl: "/path-to-image.jpg",
      },
    ];
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* left div */}
      <div className="w-1/4 p-6 bg-zinc-50 border-r dark:bg-gray-900 dark:text-white">
        {/* Header and Download Button */}
        <div className="flex items-center justify-between mb-6">
          <img src="/drivesight.svg" className="w-24 h-24" />
          <button 
            onClick={() => setShowDialog(true)}
            className="px-3 py-1 text-sm text-blue-500 border border-blue-500 rounded hover:bg-blue-50 transition duration-300"
          >
            Download Data
          </button>
        </div>

        {/* City Selector */}
        <div className="mb-6 relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full px-4 py-2 text-left  border rounded-md  focus:outline-none ${
              isOpen ? 'ring-1 ring-lime-400' : ''
            }`}
          >
            <span className="block truncate">{selectedCity}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
              <ul className="py-1 overflow-auto text-base rounded-md max-h-60 focus:outline-none sm:text-sm">
                {cities.map((city) => (
                  <li
                    key={city}
                    className="flex justify-between px-4 py-2 cursor-pointer select-none hover:bg-gray-100"
                    onClick={() => {
                      setSelectedCity(city);
                      setIsOpen(false);
                    }}
                  >
                    <span className={`block truncate ${city === selectedCity ? 'font-medium' : 'font-normal'}`}>
                      {city}
                    </span>
                    <span className="text-xs text-blue-400 italic">Buy Data</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Drives List */}
        <div className="space-y-4">
          {drives.map((drive, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow dark:bg-gray-800"
            >
              <img
                src={drive.imageUrl}
                alt="Drive"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p className="flex items-center text-xs font-medium text-gray-400 dark:text-white pt-2 pb-1">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {drive.date}
                </p>
                <p className="flex items-center text-xs font-medium text-gray-400 dark:text-white pt-1 pb-2">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {drive.coordinates}
                </p>
                
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* right map div */}
      <div className="flex-1 relative bg-gray-200 dark:bg-gray-800">
        {/* Map Placeholder */}
        <div className="absolute inset-0 p-4">
          <p className="text-center text-gray-700 dark:text-gray-300">
            Map will render here...
          </p>
        </div>
      </div>

      {/* Buy Data Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Buy Data to Download</h2>
            <p className="text-sm  mb-6 dark:text-gray-200">To download and view this data, you need to purchase it first.</p>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowDialog(false);
                  setShowPaymentPopup(true);
                }}
                className="px-4 py-2 text-sm bg-lime-400 text-black rounded hover:bg-lime-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Popup */}
      {showPaymentPopup && (
        <PaymentPopup onClose={() => setShowPaymentPopup(false)} />
      )}
    </div>
  );
};

export default Dashboard;

