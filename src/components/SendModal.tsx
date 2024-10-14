import React, { useState } from "react";
import { toast } from "react-toastify";

interface SendModalProps {
  onClose: () => void;
  balance: string | null;
  marketPrice: number;
  handleDonate: (e: React.FormEvent) => any;
  campaign: any;
  setDonationAmount: any;
  setDonationType: any;
  donationAmount: string;
  donationType: string;
}

const SendModal: React.FC<SendModalProps> = ({
  onClose,
  balance,
  marketPrice,
  handleDonate,
  campaign,
  setDonationAmount,
  setDonationType,
  donationType,
  donationAmount,
}) => {
  const [loading, setLoading] = useState(false);

  const handleMax = () => {
    if (balance) {
      setDonationAmount(balance); // Set amount to the user's balance
    }
  };

  return (
    <div className="flex fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50 ">
      <div className="rounded-lg w-[26rem] shadow-xl overflow-hidden">
        <div className="bg-indigo-50 p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <svg
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.1133 12.4442V2.00001H6.45419"
                  stroke="#5785EF"
                  stroke-width="2.31"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.12625 16.453L15.8298 2.93972"
                  stroke="#5785EF"
                  stroke-width="2.31"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <h2 className="text-lg font-semibold text-gray-800 uppercase">
                Donate
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L13 13M1 13L13 1"
                  stroke="#6B7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-base font-medium text-[#92A5B5] mb-1">
              Amount
            </label>
            <div className="flex items-center justify-between bg-indigo-50">
              <div className="flex items-center w-3/5 bg-indigo-50">
                <input
                  type="text"
                  className="w-full text-4xl font-light bg-indigo-50 py-4 border-b focus:outline-none focus:border-blue-500 placeholder:bg-indigo-50 focus:bg-indigo-50 placeholder:text-[#C2CDD6] placeholder:font-semibold"
                  placeholder="0.00"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
                <select
                  value={donationType}
                  onChange={(e) => setDonationType(e.target.value)}
                  className="ml-2 bg-indigo-50 text-[#1F2FCD] font-semibold focus:outline-none"
                >
                  <option value="USDC">USDC</option>
                  <option value="ETH">ETH</option>
                </select>
              </div>
              <button
                onClick={handleMax}
                className="bg-indigo-200 text-[#1F2FCD] px-4 py-1 rounded-xl text-sm"
              >
                MAX
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center text-md text-gray-500 mb-4 py-2">
            <span className="font-semibold text-[#1F2FCD]">
              {donationAmount
                ? (parseFloat(donationAmount) * marketPrice).toFixed(2)
                : "0.00"}{" "}
              USD
            </span>
            <div className="flex items-center space-x-2">
              <span className="mr-4 font-semibold text-[#92A5B5]">Fee</span>
              <span className="font-semibold"> 0 ETH</span>
              <svg
                width="9"
                height="5"
                viewBox="0 0 9 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 0.535645L3.82843 3.36407C4.21895 3.7546 4.85212 3.7546 5.24264 3.36407L8.07107 0.535644"
                  stroke="#4A5E6D"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="mb-4 border-t border-[#BCCEF9] pt-4">
            <div className="flex justify-between text-md text-[#7991A4]">
              <span className="font-semibold">Balance</span>
              <span>
                {balance} USDC /{" "}
                {balance
                  ? (parseFloat(balance) * marketPrice).toFixed(2)
                  : "0.00"}{" "}
                USD
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-500 mb-1">
              TO
            </label>
            <input
              type="text"
              className="w-full p-4 border rounded-xl focus:outline-none focus:border-blue-500 placeholder-transparent placeholder:text-[#CED7DE]"
              placeholder="Paste or input the destination address"
              value={campaign.title}
              disabled
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 bg-[#E7EBEF] text-[#171717] py-4 rounded-xl font-medium"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleDonate}
              className={`flex-1 bg-[#323F49] text-white py-4 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={loading || !donationAmount}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendModal;
