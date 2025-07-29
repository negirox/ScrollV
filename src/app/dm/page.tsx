import { MessageSquareDashed } from "lucide-react";

export default function DmPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
      <MessageSquareDashed className="w-24 h-24 mb-4" />
      <h2 className="text-2xl font-semibold">No Conversation Selected</h2>
      <p>Select a conversation from the list to start chatting.</p>
    </div>
  );
}
