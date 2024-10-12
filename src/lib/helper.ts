import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export const parseLinkHeader = (header: any) => {
  const links: any = {};
  if (!header) return links;

  header.split(",").forEach((link: any) => {
    const [url, rel] = link.split(";");
    const cleanedUrl = url.trim().slice(1, -1); // Remove angle brackets
    const cleanedRel = rel.trim().slice(5, -1); // Remove "rel=" and quotes
    links[cleanedRel] = cleanedUrl;
  });

  return links;
};
