import { ConversationList } from "@/components/dm/conversation-list";
import { MOCK_CONVERSATIONS, MOCK_USERS } from "@/lib/data";

export default function DmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = MOCK_USERS[0];
  return (
    <div className="flex h-screen bg-background">
      <aside className="w-1/3 border-r border-border h-full hidden md:flex flex-col">
        <ConversationList conversations={MOCK_CONVERSATIONS} currentUser={currentUser} />
      </aside>
      <main className="flex-1 h-full">
        {children}
      </main>
    </div>
  );
}
