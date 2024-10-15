import React, { useState } from "react";

interface ReceiveModalProps {
  onClose: () => any;
  usdcMarketPrice: number;
  ethMarketPrice: number;
  handleWithdraw: (withdrawalType: string) => Promise<any>;
  address: string;
  campaign: any;
}

const ReceiveModal: React.FC<ReceiveModalProps> = ({
  onClose,
  ethMarketPrice,
  usdcMarketPrice,
  handleWithdraw,
  address,
  campaign,
}) => {
  const [loading, setLoading] = useState(false);
  const [withdrawalType, setWithdrawalType] = useState<"USDC" | "ETH">("USDC");

  const usdcBalanceUSD = parseFloat(campaign.usdcBalance) * usdcMarketPrice;
  const ethBalanceUSD = parseFloat(campaign.ethBalance) * ethMarketPrice;

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
                  strokeWidth="2.31"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.12625 16.453L15.8298 2.93972"
                  stroke="#5785EF"
                  strokeWidth="2.31"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <h2 className="text-lg font-semibold text-gray-800 uppercase">
                Withdraw
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
            <div className="bg-white rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Your Balances
              </h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">USDC: </span>
                <span className="font-medium">
                  {campaign.usdcBalance} (${usdcBalanceUSD.toFixed(2)})
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">ETH:</span>
                <span className="font-medium">
                  {campaign.ethBalance} (${ethBalanceUSD.toFixed(2)})
                </span>
              </div>
            </div>

            <label className="block text-base font-medium text-[#92A5B5] mb-2">
              Select token to withdraw
            </label>
            <div className="flex items-center justify-between bg-indigo-50">
              <select
                value={withdrawalType}
                onChange={(e) =>
                  setWithdrawalType(e.target.value as "USDC" | "ETH")
                }
                className="w-full bg-indigo-50 text-[#1F2FCD] font-semibold focus:outline-none py-2 px-4 rounded-lg"
              >
                <option value="USDC">USDC</option>
                <option value="ETH">ETH</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center text-md text-gray-500 mb-4 py-2">
            <span className="font-semibold text-[#1F2FCD]">
              Withdrawal Amount:
            </span>
            <span className="font-semibold">
              {withdrawalType === "USDC"
                ? campaign.usdcBalance
                : campaign.ethBalance}{" "}
              {withdrawalType}
            </span>
          </div>

          <div className="mb-4 border-t border-[#BCCEF9] pt-4">
            <div className="flex justify-between text-md text-[#7991A4]">
              <span className="font-semibold">USD Value:</span>
              <span>
                $
                {withdrawalType === "USDC"
                  ? usdcBalanceUSD.toFixed(2)
                  : ethBalanceUSD.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div>Address: {address}</div>
        <div className="bg-white p-6">
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 bg-[#E7EBEF] text-[#171717] py-4 rounded-xl font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => handleWithdraw(withdrawalType)}
              className={`flex-1 bg-[#323F49] text-white py-4 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Confirm Withdrawal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiveModal;
