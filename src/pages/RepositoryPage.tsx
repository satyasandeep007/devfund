"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchGitHubRepos } from "@/lib/githubUtil";
import { parseLinkHeader } from "@/lib/helper";

const RepositoryPage: React.FC = () => {
  const { data: session }: any = useSession();
  const [repos, setRepos] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRepos = async () => {
      console.log(session, "session");
      if (session) {
        try {
          setLoading(true);
          const data = await fetchGitHubRepos(session.user.username);
          console.log(data, "data");
          setRepos(data);

          const links = parseLinkHeader(data.headers.get("Link"));
          setNextPage(links.next || null);
          setPrevPage(links.prev || null);
        } catch (error: any) {
          console.log(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    getRepos();
  }, [session, currentPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Language</th>
            <th className="px-4 py-2 text-left">Stars</th>
          </tr>
        </thead>
        <tbody>
          {repos.map((repo) => (
            <tr key={repo.id} className="border-t border-gray-300">
              <td className="px-4 py-2">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {repo.name}
                </a>
              </td>
              <td className="px-4 py-2">
                {repo.description || "No description"}
              </td>
              <td className="px-4 py-2">{repo.language || "N/A"}</td>
              <td className="px-4 py-2">{repo.stargazers_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {prevPage && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 mx-1 rounded-full text-black bg-gray-200 hover:bg-orange-600 hover:text-white"
          >
            Previous
          </button>
        )}
        {nextPage && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 mx-1 rounded-full text-black bg-gray-200 hover:bg-orange-600 hover:text-white"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default RepositoryPage;
