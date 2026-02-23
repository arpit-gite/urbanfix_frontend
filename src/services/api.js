import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const fetchAgents = async () => {
  const res = await api.get("/api/agents");
  return res.data;
};

export const fetchWorkflow = async () => {
  const res = await api.get("/api/workflow");
  return res.data;
};

export const saveWorkflow = async (agents) => {
  const res = await api.post("/api/workflow", { agents });
  return res.data;
};

export const sendChat = async (message) => {
  const res = await api.post("/api/chat", { message });
  return res;
};

export default api;
