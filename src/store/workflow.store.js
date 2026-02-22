import { create } from "zustand";
import { fetchAgents, fetchWorkflow, saveWorkflow } from "../services/api";
import { v4 as uuid } from "uuid";

export const useWorkflowStore = create((set, get) => ({
  availableAgents: [],
  agents: [],

  loadAgents: async () => {
    const data = await fetchAgents();
    set({ availableAgents: data });
  },

  loadWorkflow: async () => {
    const data = await fetchWorkflow();
    set({ agents: data.agents || [] });
  },

  addAgent: (agent) => {
    const newAgent = {
      name: agent.name,
      type: agent.type
    };

    set({ agents: [...get().agents, newAgent] });
  },

  removeAgent: (id) => {
    set({ agents: get().agents.filter(a => a._id !== id) });
  },

  updateAgentName: (id, name) => {
    set({
      agents: get().agents.map(a =>
        a._id === id ? { ...a, name } : a
      )
    });
  },

  persist: async () => {
    await saveWorkflow(get().agents);
    const data = await fetchWorkflow();
    set({ agents: data.agents || [] });
  }
}));
