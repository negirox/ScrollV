"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { type Conversation, type User } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";


interface ConversationListProps {
  conversations: Conversation[];
  currentUser: User;
}

export function ConversationList({ conversations, currentUser }: ConversationListProps) {
  const params = useParams();

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Messages</h2>
            <Button variant="ghost" size="icon">
                <PenSquare />
            </Button>
          </div>
          <div className="mt-4">
              <Input placeholder="Search messages..." />
          </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {conversations.map((convo) => {
            const otherParticipant = convo.participants.find(p => p.id !== currentUser.id);
            if (!otherParticipant) return null;

            return (
              <Link href={`/dm/${convo.id}`} key={convo.id}>
                <div className={cn(
                  "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted",
                  params.conversationId === convo.id && "bg-accent text-accent-foreground hover:bg-accent"
                )}>
                  <Avatar>
                    <AvatarImage src={otherParticipant.avatarUrl} alt={otherParticipant.name} />
                    <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 truncate">
                    <p className="font-semibold truncate">{otherParticipant.name}</p>
                    <p className={cn(
                        "text-sm truncate", 
                        params.conversationId === convo.id ? "text-accent-foreground/80" : "text-muted-foreground"
                    )}>
                        {convo.lastMessage.text}
                    </p>
                  </div>
                   <p className="text-xs text-muted-foreground self-start">{convo.lastMessage.timestamp}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
