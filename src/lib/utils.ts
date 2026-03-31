import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYouTubeEmbedUrl(url: string): string {
  if (!url) return "";
  
  // Handle already embedded URLs
  if (url.includes('youtube.com/embed/')) return url;

  let videoId = "";
  if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('v=')[1].split('&')[0];
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0];
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}
