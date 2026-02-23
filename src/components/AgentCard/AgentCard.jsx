import { useEffect, useMemo, useState } from "react";
import { useWorkflowStore } from "../../store/workflow.store";
import "./AgentCard.css";

export default function AgentCard({ agent }) {
  const removeAgent = useWorkflowStore(s => s.removeAgent);
  const updateAgentName = useWorkflowStore(s => s.updateAgentName);
  const persist = useWorkflowStore(s => s.persist);

  const [localName, setLocalName] = useState(agent.name);

  // Debounce logic
  const debouncedUpdate = useMemo(() => {
    let timer;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        updateAgentName(agent._id, value);
        persist();
      }, 500);
    };
  }, [agent._id, updateAgentName, persist]);

  useEffect(() => {
    setLocalName(agent.name);
  }, [agent.name]);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${agent.name}"? This action cannot be undone.`
    );

    if (!confirmDelete) return;

    removeAgent(agent._id);
    persist();
  };

  return (
    <div className="agent-card">
      <div className="agent-field">
        <label className="agent-label">Agent Name</label>
        <input
          className="agent-input"
          value={localName}
          onChange={(e) => {
            const value = e.target.value;
            setLocalName(value);
            debouncedUpdate(value);
          }}
        />
      </div>

      <div className="agent-type">
        <strong>Type:</strong> {agent.type}
      </div>

      <button
        className="agent-delete-btn"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}
