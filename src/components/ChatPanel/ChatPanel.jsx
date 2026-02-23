import { useState } from "react";
import toast from "react-hot-toast";
import { sendChat } from "../../services/api";

export default function ChatPanel() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message;

    setLoading(true);

    // Immediately show user message
    setChat(prev => [
      ...prev,
      { role: "user", text: userMessage }
    ]);

    setMessage("");

    try {
      const res = await sendChat(userMessage);

      setChat(prev => [
        ...prev,
        { role: "ai", text: res.data.reply }
      ]);
    } catch (error) {
      const apiMessage =
        error.response?.data?.message ||
        "AI service unavailable";

      toast.error(apiMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "30%", borderLeft: "1px solid #ddd", padding: 20 }}>
      <h3>Chat</h3>

      <div style={{ height: "70%", overflowY: "auto", marginBottom: 10 }}>
        {chat.map((c, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <strong>{c.role === "user" ? "You" : "AI"}:</strong> {c.text}
          </div>
        ))}

        {loading && (
          <div style={{ fontStyle: "italic", color: "gray" }}>
            AI is thinking...
          </div>
        )}
      </div>

      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
        disabled={loading}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      <button onClick={handleSend} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
