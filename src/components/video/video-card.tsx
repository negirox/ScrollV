"use client";

import { useState } from "react";
import type { Video, Comment } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Heart, MessageCircle, Send, MoreVertical, ShieldBan, Flag, Bookmark } from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { BadgeCheck } from "lucide-react";

export function VideoCard({ video }: { video: Video }) {
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(video.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <Card className="w-full overflow-hidden shadow-lg border-2 border-border bg-card">
      <CardHeader className="flex flex-row items-center gap-3 p-4">
        <Avatar>
          <AvatarImage src={video.user.avatarUrl} alt={video.user.name} />
          <AvatarFallback>{video.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <div className="flex items-center gap-1">
             <p className="font-semibold text-card-foreground">{video.user.name}</p>
             {video.user.isVerified && <BadgeCheck className="h-5 w-5 text-blue-500" />}
          </div>
          <p className="text-sm text-muted-foreground">{video.topic}</p>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <Flag className="mr-2 h-4 w-4" />
                    <span>Report Abuse</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <ShieldBan className="mr-2 h-4 w-4" />
                    <span>Block User</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-0 relative aspect-[9/16]">
        <Image
          src={video.thumbnailUrl}
          alt={video.description}
          layout="fill"
          objectFit="cover"
          data-ai-hint="short form video"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <p className="text-white text-sm">{video.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <div className="flex items-center w-full gap-2">
          <Button variant="ghost" size="icon" onClick={handleLike}>
            <Heart className={`h-6 w-6 ${isLiked ? "text-red-500 fill-current" : ""}`} />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setShowComments(!showComments)}>
            <MessageCircle className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Send className="h-6 w-6" />
          </Button>
          <div className="flex-grow" />
          <Button variant="ghost" size="icon" onClick={handleSave}>
            <Bookmark className={`h-6 w-6 ${isSaved ? "text-primary fill-current" : ""}`} />
          </Button>
        </div>
        <div className="w-full text-sm font-semibold">
            <span>{likes.toLocaleString()} likes</span>
          </div>

        {showComments && (
          <div className="w-full mt-4">
            <Separator className="mb-4" />
            <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
              {video.comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.user.avatarUrl} alt={comment.user.name} />
                    <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                     <p>
                      <Link href={`/profile/${comment.user.id}`} className="font-semibold hover:underline inline-flex items-center gap-1">
                        {comment.user.name}
                        {comment.user.isVerified && <BadgeCheck className="h-4 w-4 text-blue-500" />}
                      </Link>{" "}
                      <span className="text-muted-foreground">{comment.text}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                  </div>
                </div>
              ))}
              {video.comments.length === 0 && (
                <p className="text-sm text-muted-foreground text-center">No comments yet.</p>
              )}
            </div>
            <div className="flex w-full items-center gap-2 mt-4">
              <Input placeholder="Add a comment..." />
              <Button>Post</Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
