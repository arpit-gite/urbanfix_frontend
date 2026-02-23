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

    // Show user message immediately
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
    <div style={{ width: "30%", borderLeft: "1px solid #ddd", padding: 20, display: "flex", flexDirection: "column" }}>
      <h3>Chat</h3>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          marginBottom: 10,
          display: "flex",
          flexDirection: "column"
        }}
      >
        {chat.map((c, i) => (
          <div
            key={i}
            style={{
              background: c.role === "user" ? "#e3f2fd" : "#f5f5f5",
              padding: 12,
              borderRadius: 8,
              marginBottom: 10,
              alignSelf: c.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "100%"
            }}
          >
            <div
              style={{
                whiteSpace: "pre-wrap",   // 👈 preserves line breaks
                lineHeight: 1.6,
                fontSize: 14
              }}
            >
              {c.text}
            </div>
          </div>
        ))}

        {loading && (
          <div
            style={{
              fontStyle: "italic",
              color: "gray",
              marginBottom: 10
            }}
          >
            AI is thinking...
          </div>
        )}
      </div>

      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 8 }}
        disabled={loading}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type your message..."
      />

      <button
        onClick={handleSend}
        disabled={loading}
        style={{
          padding: 10,
          backgroundColor: loading ? "#ccc" : "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
