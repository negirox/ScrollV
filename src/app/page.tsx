"use client";

import { useState } from "react";
import { VideoCard } from "@/components/video/video-card";
import { MOCK_VIDEOS, type Video } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>(MOCK_VIDEOS.slice(0, 3));
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreVideos = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVideos((prev) => [...prev, ...MOCK_VIDEOS.slice(prev.length, prev.length + 3)]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex justify-center py-8 px-4">
      <div className="w-full max-w-2xl space-y-8">
        <h1 className="text-4xl font-bold text-center text-primary font-headline">
          For You
        </h1>
        <div className="space-y-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
        {videos.length < MOCK_VIDEOS.length && (
          <div className="flex justify-center">
            <Button onClick={loadMoreVideos} disabled={isLoading} size="lg">
              {isLoading ? "Loading..." : "Load More"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
