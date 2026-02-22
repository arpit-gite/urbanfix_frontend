import { useWorkflowStore } from "../../store/workflow.store";

export default function AgentCard({ agent }) {
  const removeAgent = useWorkflowStore(s => s.removeAgent);
  const updateAgentName = useWorkflowStore(s => s.updateAgentName);
  const persist = useWorkflowStore(s => s.persist);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 10,
        margin: 10,
        borderRadius: 6
      }}
    >
      <input
        value={agent.name}
        onChange={(e) => {
          updateAgentName(agent._id, e.target.value);
          persist();
        }}
        style={{ width: "100%" }}
      />

      <p>Type: {agent.type}</p>

      <button
        onClick={() => {
          removeAgent(agent._id);
          persist();
        }}
      >
        Delete
      </button>
    </div>
  );
}
