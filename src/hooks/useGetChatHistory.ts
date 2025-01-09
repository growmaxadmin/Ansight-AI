
export function useGetChatHistory(chatId) {
    const getChatHistory = {
      status: 200,
      data: {
        chat_id: "chat_001",
        messages: [
          {
            id: "msg_001",
            role: "user",
            content: "Upload sales_2023.csv",
            timestamp: "2024-12-16T10:28:00Z",
            type:"text"
          },
          {
            id: "msg_002",
            role: "assistant",
            content: "“When Karan left us, it felt impossible to bring those dreams to life. For a year, I lived in the shadow of unbearable grief, trying to make sense of the void he left behind. But on his first death anniversary, I made myself a promise: to honor his memory by bringing his dreams to life, in my own way,” Kaamboj wrote.",
            timestamp: "2024-12-16T10:28:05Z",
            type:"text"
          },
          {
            id: "msg_003",
            role: "user",
            content: "On Monday, South Korea's transport ministry provided details of what transpired in the last few minutes before the crash. The following are the final minutes of Flight 7C2216 as provided by South Korea's transport ministry and fire authorities.",
            timestamp: "2024-12-16T10:30:00Z",
            type:"text"
          },
          {
            id: "msg_004",
            role: "assistant",
            content: "“When Karan left us, it felt impossible to bring those dreams to life. For a year, I lived in the shadow of unbearable grief, trying to make sense of the void he left behind. But on his first death anniversary, I made myself a promise: to honor his memory by bringing his dreams to life, in my own way,” Kaamboj wrote.",
            timestamp: "2024-12-16T10:28:05Z",
            type:"text"
          },
          {
            id: "msg_005",
            role: "user",
            content: "On Monday, South Korea's transport ministry provided details of what transpired in the last few minutes before the crash. The following are the final minutes of Flight 7C2216 as provided by South Korea's transport ministry and fire authorities.",
            timestamp: "2024-12-16T10:30:00Z",
            type:"text"
          },
        ],
      },
    };
  
    if (chatId) {
      return { data: getChatHistory?.data?.messages };
    }
  
    return { data: null }; 
  }
  