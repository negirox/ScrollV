import { Input } from "@/components/ui/input";
import { MOCK_VIDEOS } from "@/lib/data";
import { Search, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DiscoverPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary font-headline">Discover</h1>
        <p className="text-muted-foreground mt-2">
          Find the next viral video or trending topic.
        </p>
      </header>
      <div className="max-w-2xl mx-auto mb-8 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search videos, users, or topics..." className="pl-10 h-12 text-lg" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {MOCK_VIDEOS.map((video) => (
          <Link href="#" key={video.id}>
            <div className="relative aspect-[9/16] group overflow-hidden rounded-lg shadow-lg">
              <Image
                src={video.thumbnailUrl}
                alt={video.description}
                width={576}
                height={1024}
                className="transition-transform duration-300 group-hover:scale-110 object-cover w-full h-full"
                data-ai-hint="trending video"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-2 text-white">
                <p className="text-sm font-semibold truncate">{video.user.name}</p>
                <div className="flex items-center gap-1 text-xs">
                  <Heart size={14} />
                  <span>{video.likes.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
