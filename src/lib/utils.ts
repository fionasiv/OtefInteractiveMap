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
  try {
    if (url.includes('youtube.com/watch?v=')) {
      const urlObj = new URL(url);
      videoId = urlObj.searchParams.get('v') || "";
    } else if (url.includes('youtu.be/')) {
      const parts = url.split('youtu.be/');
      if (parts[1]) {
        videoId = parts[1].split('?')[0].split('/')[0];
      }
    } else if (url.includes('youtube.com/v/')) {
      videoId = url.split('youtube.com/v/')[1].split('?')[0];
    }
  } catch (e) {
    console.error("Error parsing YouTube URL:", e);
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}
