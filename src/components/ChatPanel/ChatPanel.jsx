import { useState } from "react";
import toast from "react-hot-toast";
import { sendChat } from "../../services/api";

export default function ChatPanel() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const handleSend = async () => {
    if (!message) return;
    try {
      const res = await sendChat(message);
      setChat(prev => [
        ...prev,
        { role: "user", text: message },
        { role: "ai", text: res.data.reply }
      ]);
      setMessage("");
    } catch (error) {
      setMessage("");
      const apiMessage =
        error.response?.data?.message ||
        "AI service unavailable";
      toast.error(apiMessage);
      return;
    }
  };

  return (
    <div style={{ width: "30%", borderLeft: "1px solid #ddd", padding: 20 }}>
      <h3>Chat</h3>

      <div style={{ height: "70%", overflowY: "auto" }}>
        {chat.map((c, i) => (
          <div key={i}>
            <strong>{c.role === "user" ? "You" : "AI"}:</strong> {c.text}
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        style={{ width: "100%" }}
      />

      <button onClick={handleSend}>Send</button>
    </div>
  );
}
