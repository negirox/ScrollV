"use client";

import { useState } from 'react';
import type { Conversation, User, Message } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MoreVertical, Phone, Video } from "lucide-react";
import Link from 'next/link';

interface MessageViewProps {
  conversation: Conversation;
  currentUser: User;
}

export function MessageView({ conversation: initialConversation, currentUser }: MessageViewProps) {
  const [conversation, setConversation] = useState(initialConversation);
  const [newMessage, setNewMessage] = useState("");

  const otherParticipant = conversation.participants.find(p => p.id !== currentUser.id);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      sender: currentUser,
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConversation(prev => ({
      ...prev,
      messages: [...prev.messages, message],
      lastMessage: message,
    }));
    setNewMessage("");
  };


  if (!otherParticipant) return null;

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center gap-4 p-4 border-b border-border">
        <Avatar>
            <AvatarImage src={otherParticipant.avatarUrl} alt={otherParticipant.name} />
            <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <Link href={`/profile/${otherParticipant.id}`} className="font-semibold hover:underline flex-1 truncate">
            {otherParticipant.name}
        </Link>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Phone /></Button>
            <Button variant="ghost" size="icon"><Video /></Button>
            <Button variant="ghost" size="icon"><MoreVertical /></Button>
        </div>
      </header>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {conversation.messages.map((message, index) => {
            const isCurrentUser = message.sender.id === currentUser.id;
            const showAvatar = index === 0 || conversation.messages[index - 1].sender.id !== message.sender.id;

            return (
              <div
                key={message.id}
                className={cn(
                  "flex items-end gap-2",
                  isCurrentUser ? "justify-end" : "justify-start"
                )}
              >
                {!isCurrentUser && (
                  <Avatar className={cn("h-8 w-8", !showAvatar && "invisible")}>
                    <AvatarImage src={message.sender.avatarUrl} alt={message.sender.name} />
                    <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-xs md:max-w-md lg:max-w-lg rounded-2xl p-3 text-sm",
                    isCurrentUser
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted rounded-bl-none"
                  )}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <footer className="p-4 border-t border-border">
        <form className="flex items-center gap-2" onSubmit={handleSendMessage}>
          <Input 
            placeholder="Type a message..." 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send />
          </Button>
        </form>
      </footer>
    </div>
  );
}
