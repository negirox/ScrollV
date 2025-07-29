"use client";

import { useState, useEffect, useRef } from "react";
import { VideoCard } from "@/components/video/video-card";
import { MOCK_VIDEOS, type Video } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { StoryBar } from "@/components/stories/story-bar";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>(MOCK_VIDEOS.slice(0, 3));
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMoreVideos = () => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setVideos((prev) => {
        const newVideos = [
          ...prev,
          ...MOCK_VIDEOS.slice(prev.length, prev.length + 3),
        ];
        if (newVideos.length >= MOCK_VIDEOS.length) {
          setHasMore(false);
        }
        return newVideos;
      });
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreVideos();
      }
    });

    if (loaderRef.current) {
      observer.current.observe(loaderRef.current);
    }

    return () => observer.current?.disconnect();
  }, [loadMoreVideos]);


  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl">
        <StoryBar />
        <div className="space-y-6 py-8 px-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
        <div ref={loaderRef} className="flex justify-center">
          {hasMore && (
             <div className="flex items-center justify-center p-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
