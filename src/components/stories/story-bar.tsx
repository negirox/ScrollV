
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MOCK_STORIES, MOCK_USERS } from "@/lib/data";
import { PlusCircle } from "lucide-react";


export function StoryBar() {
    const stories = MOCK_STORIES;
    const currentUser = MOCK_USERS[0];

    return (
        <ScrollArea className="w-full whitespace-nowrap border-b">
            <div className="flex w-max space-x-4 p-4">
                <div className="flex flex-col items-center space-y-2 shrink-0">
                     <Button variant="ghost" className="w-16 h-16 rounded-full p-0 relative flex items-center justify-center bg-muted">
                        <Avatar className="w-16 h-16">
                            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <PlusCircle className="absolute bottom-0 right-0 w-6 h-6 text-primary bg-background rounded-full" />
                    </Button>
                    <span className="text-xs font-medium w-16 truncate text-center">Your Story</span>
                </div>
                {stories.map((story) => (
                    <div key={story.id} className="flex flex-col items-center space-y-2 shrink-0">
                        <button className="w-16 h-16 rounded-full p-0.5 flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 data-[viewed=true]:opacity-50" data-viewed={story.viewed}>
                            <Avatar className="w-full h-full border-2 border-background">
                                <AvatarImage src={story.user.avatarUrl} alt={story.user.name} />
                                <AvatarFallback>{story.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </button>
                        <span className="text-xs font-medium w-16 truncate text-center">{story.user.name}</span>
                    </div>
                ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-2" />
        </ScrollArea>
    );
}
