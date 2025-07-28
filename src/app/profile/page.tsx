import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MOCK_USERS, MOCK_VIDEOS } from "@/lib/data";
import { Settings, UserPlus, Heart, PlaySquare, ShieldBan, BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const user = MOCK_USERS[0];
const userVideos = MOCK_VIDEOS.filter((v) => v.user.id === user.id);

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
        <Avatar className="w-32 h-32 border-4 border-primary">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="text-4xl">{user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <h1 className="text-3xl font-bold font-headline">{user.name}</h1>
            {user.isVerified && <BadgeCheck className="h-7 w-7 text-blue-500" />}
          </div>
          <p className="text-muted-foreground mb-4">@{user.name.toLowerCase()}</p>
          <p className="max-w-prose mb-4">
            Full-stack developer sharing my coding journey. Join me for tips, tutorials, and tech talk! 🚀
          </p>
          <div className="flex justify-center md:justify-start gap-2">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Follow
            </Button>
            <Button variant="outline">Message</Button>
            <Button variant="secondary">
                <ShieldBan className="mr-2 h-4 w-4" /> Block
            </Button>
            <Button variant="ghost" size="icon">
              <Settings />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center md:justify-start gap-8 mb-8 border-b pb-4">
        <div className="text-center">
            <p className="text-2xl font-bold">1.2K</p>
            <p className="text-muted-foreground">Following</p>
        </div>
        <div className="text-center">
            <p className="text-2xl font-bold">45.6K</p>
            <p className="text-muted-foreground">Followers</p>
        </div>
        <div className="text-center">
            <p className="text-2xl font-bold">587.3K</p>
            <p className="text-muted-foreground">Likes</p>
        </div>
      </div>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-sm mx-auto md:mx-0">
          <TabsTrigger value="videos"><PlaySquare className="mr-2 h-4 w-4" />Videos</TabsTrigger>
          <TabsTrigger value="liked"><Heart className="mr-2 h-4 w-4" />Liked</TabsTrigger>
        </TabsList>
        <TabsContent value="videos">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {userVideos.map((video) => (
                <Link href="#" key={video.id}>
                    <div className="relative aspect-[9/16] group overflow-hidden rounded-lg shadow-lg">
                    <Image
                        src={video.thumbnailUrl}
                        alt={video.description}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="user uploaded video"
                    />
                     <div className="absolute inset-0 bg-black/30" />
                     <div className="absolute bottom-2 left-2 text-white flex items-center gap-1 text-sm font-semibold">
                        <PlaySquare size={16} />
                        <span>{Math.floor(video.likes / 1000)}K</span>
                     </div>
                    </div>
                </Link>
                ))}
            </div>
        </TabsContent>
        <TabsContent value="liked">
            <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">Liked videos will appear here.</p>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
