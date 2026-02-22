import { useDraggable } from "@dnd-kit/core";
import { useWorkflowStore } from "../../store/workflow.store";

const DraggableAgent = ({ agent }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: agent._id
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: 12,
        margin: 10,
        background: "#f4f4f4",
        borderRadius: 6,
        cursor: "grab"
      }}
    >
      {agent.name}
    </div>
  );
};

export default function AgentMenu() {
  const availableAgents = useWorkflowStore(s => s.availableAgents);

  return (
    <div style={{ width: "20%", borderRight: "1px solid #ddd", padding: 10 }}>
      <h3>Agents</h3>
      {availableAgents.map(agent => (
        <DraggableAgent key={agent._id} agent={agent} />
      ))}
    </div>
  );
}
