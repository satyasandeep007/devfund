import Image from "next/image";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
export function CampaignCard({ campaign }: { campaign: any }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <FollowerPointerCard
        title={
          <TitleComponent
            title={campaign.githubRepo.name}
            avatar={`https://github.com/${
              campaign.githubRepo.fullName.split("/")[0]
            }.png`}
          />
        }
      >
        <div className="h-48 bg-navy-blue relative">
          <Image
            src={`https://opengraph.githubassets.com/1/${campaign.githubRepo.fullName}`}
            alt={campaign.title}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-95 group-hover:rounded-2xl transform object-cover transition duration-200"
          />
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <h2 className="font-bold text-xl mb-2 text-gray-800 line-clamp-1">
            {campaign.title}
          </h2>
          <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
            {campaign.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-500">
              Goal: ${campaign.fundingGoal.toLocaleString()}
            </span>
            <button className="bg-navy-blue text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">
              Donate
            </button>
          </div>
        </div>
      </FollowerPointerCard>
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
