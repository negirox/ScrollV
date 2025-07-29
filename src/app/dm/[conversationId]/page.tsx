import { MessageView } from "@/components/dm/message-view";
import { MOCK_CONVERSATIONS, MOCK_USERS } from "@/lib/data";
import { notFound } from "next/navigation";

export default function ConversationPage({ params }: { params: { conversationId: string } }) {
    const conversation = MOCK_CONVERSATIONS.find(c => c.id === params.conversationId);
    const currentUser = MOCK_USERS[0];

    if (!conversation) {
        notFound();
    }

    return (
       <MessageView conversation={conversation} currentUser={currentUser} />
    );
}

export async function generateStaticParams() {
  return MOCK_CONVERSATIONS.map((c) => ({
    conversationId: c.id,
  }));
}
