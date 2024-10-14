import Image from "next/image";
import Link from "next/link";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import { IconEye, IconHeart } from "@tabler/icons-react";
import { format } from "date-fns";

type Campaign = {
  description: string;
  donationCount: string;
  endDate: string;
  ethBalance: string;
  fundingGoal: string;
  gitUrl: string;
  id: number;
  owner: string;
  status: string;
  title: string;
  usdcBalance: string;
};

export function CampaignCard({
  campaign,
  canDonate,
  handleDonate,
  isMyCampaign,
}: {
  campaign: Campaign;
  canDonate: boolean;
  handleDonate: (e: React.FormEvent) => any;
  isMyCampaign?: boolean;
}) {
  const repoFullName = campaign.gitUrl.split("/").slice(-2).join("/");
  const repoOwner = repoFullName.split("/")[0];

  const formattedEndDate = campaign?.endDate
    ? format(new Date(parseInt(campaign.endDate) * 1000), "PPP")
    : "N/A";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      {/* <FollowerPointerCard
        title={
          <TitleComponent
            title={campaign.title}
            avatar={`https://github.com/${repoOwner}.png`}
          />
        }
      > */}
      <div className="h-48 bg-blue-500 relative">
        <Image
          src={`https://opengraph.githubassets.com/1/${repoFullName}`}
          alt={campaign.title}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-105 transform object-cover transition duration-200"
        />
      </div>
      <Link href={`/campaigns/${campaign.id}`} passHref>
        <div className="p-6 flex-grow flex flex-col">
          <h2 className="font-bold text-xl mb-2 text-gray-800 line-clamp-1">
            {campaign.title}
          </h2>
          <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
            {campaign.description}
          </p>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <IconHeart className="w-5 h-5 text-red-500" />
              <span className="text-sm text-gray-600">
                {campaign.donationCount} donations
              </span>
              <span>{isMyCampaign ? "Yours" : ""}</span>
            </div>
            <div className="flex items-center space-x-2">
              <IconEye className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-600">{campaign.status}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-500">
              Goal: ${parseInt(campaign.fundingGoal).toLocaleString()}
            </span>
            <span className="text-sm font-semibold text-gray-500">
              End Date: ${formattedEndDate}
            </span>
            {canDonate && (
              <div className="space-x-2">
                <button
                  // disabled={isMyCampaign}
                  onClick={handleDonate}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors"
                >
                  Donate
                </button>
              </div>
            )}
          </div>
        </div>
      </Link>
      {/* </FollowerPointerCard> */}
    </div>
  );
}

const TitleComponent = ({
  title,
  avatar,
}: {
  title: string;
  avatar: string;
}) => (
  <div className="flex space-x-2 items-center">
    <Image
      src={avatar}
      height={20}
      width={20}
      alt="avatar"
      className="rounded-full border-2 border-white"
    />
    <p>{title}</p>
  </div>
);
