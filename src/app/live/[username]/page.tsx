
"use client";

import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MOCK_USERS, MOCK_COMMENTS, User, Comment } from "@/lib/data";
import { Heart, Send, Users, X } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';

const LiveChatComment = ({ comment }: { comment: Comment }) => (
    <div className="flex items-start gap-2 p-2 rounded-lg">
        <Avatar className="w-8 h-8">
            <AvatarImage src={comment.user.avatarUrl} />
            <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
            <span className="font-semibold text-sm">{comment.user.name}</span>
            <p className="text-sm text-white/90">{comment.text}</p>
        </div>
    </div>
);


export default function LivePage() {
    const params = useParams();
    const username = params.username as string;
    const broadcaster = MOCK_USERS.find(u => u.name.toLowerCase().replace(' ', '_') === username);
    
    const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS.slice(0, 3));
    const [newComment, setNewComment] = useState("");
    const [viewerCount, setViewerCount] = useState(Math.floor(Math.random() * 2000) + 500);
    const [likes, setLikes] = useState(0);

    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Simulate new comments
        const commentInterval = setInterval(() => {
            const randomComment = MOCK_COMMENTS[Math.floor(Math.random() * MOCK_COMMENTS.length)];
            const randomUser = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
            setComments(prev => [...prev, { ...randomComment, id: `comment-${Date.now()}`, user: randomUser }]);
        }, 3000);

        // Simulate viewer count fluctuations
        const viewerInterval = setInterval(() => {
            setViewerCount(prev => prev + Math.floor(Math.random() * 10) - 5);
        }, 5000);
        
        return () => {
            clearInterval(commentInterval);
            clearInterval(viewerInterval);
        }
    }, []);

    useEffect(() => {
        // Auto-scroll to bottom of chat
        if (scrollAreaRef.current) {
            const scrollableView = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
            if(scrollableView) {
                scrollableView.scrollTop = scrollableView.scrollHeight;
            }
        }
    }, [comments]);
    
    const handleSendComment = (e: React.FormEvent) => {
        e.preventDefault();
        if(!newComment.trim()) return;
        
        const comment: Comment = {
            id: `comment-${Date.now()}`,
            user: MOCK_USERS[0], // Current user
            text: newComment,
            timestamp: "now"
        };
        setComments(prev => [...prev, comment]);
        setNewComment("");
    }
    
    const handleLike = () => {
        setLikes(prev => prev + 1);
        // We could also add a floating heart animation here
    }

    if (!broadcaster) {
        return notFound();
    }

    return (
        <div className="flex flex-col md:flex-row h-screen bg-black text-white">
            <div className="flex-1 relative bg-gray-900">
                <Image 
                    src="https://placehold.co/1080x1920.png" 
                    alt="Live Stream" 
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="live stream video"
                />
                 <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={broadcaster.avatarUrl} />
                                <AvatarFallback>{broadcaster.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold">{broadcaster.name}</p>
                                <p className="text-xs text-white/80">@{broadcaster.name.toLowerCase().replace(' ', '_')}</p>
                            </div>
                            <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
                        </div>
                         <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-black/30 p-2 rounded-md">
                                <Users size={18} />
                                <span className="font-bold text-sm">{viewerCount.toLocaleString()}</span>
                            </div>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                                <X/>
                            </Button>
                        </div>
                     </div>
                 </div>
                 <div className="absolute bottom-4 right-4">
                    <div className="flex flex-col items-center gap-2">
                        <Button onClick={handleLike} variant="ghost" size="icon" className="text-white bg-white/20 hover:bg-white/30 rounded-full h-12 w-12">
                             <Heart className="text-red-500 fill-current" size={28}/>
                        </Button>
                        <span className="text-sm font-bold">{likes.toLocaleString()}</span>
                    </div>
                 </div>
            </div>
            <aside className="w-full md:w-80 bg-gray-900/50 backdrop-blur-sm border-l border-white/10 flex flex-col">
                <div className="p-4 border-b border-white/10 text-center">
                    <h2 className="font-bold">Live Chat</h2>
                </div>
                <ScrollArea ref={scrollAreaRef} className="flex-1 p-2">
                    <div className="flex flex-col gap-2">
                       {comments.map((comment) => <LiveChatComment key={comment.id} comment={comment}/>)}
                    </div>
                </ScrollArea>
                <div className="p-4 border-t border-white/10">
                    <form onSubmit={handleSendComment} className="flex gap-2">
                        <Input 
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..." 
                            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                        />
                        <Button type="submit" variant="ghost" size="icon" disabled={!newComment.trim()}>
                            <Send/>
                        </Button>
                    </form>
                </div>
            </aside>
        </div>
    );
}

export async function generateStaticParams() {
  return MOCK_USERS.map((u) => ({
    username: u.name.toLowerCase().replace(' ', '_'),
  }));
}
