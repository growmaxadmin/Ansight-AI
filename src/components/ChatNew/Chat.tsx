import { useChatContext } from '@/context/ChatContext';
import { useProfile } from '@/hooks/profile/useProfile';
import { uploadDocumentToChat } from '@/lib/chat/chat-service';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import ChatBox from './ChatBox';
import { ChatInput } from './ChatInput';
import { TriangleAlert } from 'lucide-react';

function Chat() {
  const { profile } = useProfile();
  const { id: chatId } = useParams();
  const { s3Key, setS3Key, addToQueue, isUploading, setIsUploading, queue } =
    useChatContext();

  async function uploadDatasetAgainstChat() {
    try {
      if (!chatId || !profile) return;
      setIsUploading(true);
      const message_res = await uploadDocumentToChat(
        chatId,
        s3Key,
        profile,
        setS3Key
      );
      addToQueue(message_res);
      toast.success('File uploaded successfully.');
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  }

  useEffect(() => {
    if (s3Key && isUploading) {
      uploadDatasetAgainstChat();
    }
  }, [s3Key, isUploading]);

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col w-full">
      <ChatBox />
      {queue.length > 0 &&
        (profile?.tokens_remaining === 0 ||
          profile?.tokens_remaining === null) && (
          <div className="px-4">
            <div className="flex max-w-3xl mx-auto bg-red-50 border border-red-200 rounded-lg p-2 items-center gap-3">
              <TriangleAlert size={24} color="red" />
              <p className="text-xs">
                You've reached the maximum usage for your current plan. Please
                upgrade to continue exploring more features.
              </p>
            </div>
          </div>
        )}
      <div className="mt-auto">
        <div className="py-4">
          <ChatInput />
        </div>
        <div className="px-2 pb-2 text-center">
          <div className="text-xs text-gray-500">
            Ansight can make mistakes. Check important info.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
