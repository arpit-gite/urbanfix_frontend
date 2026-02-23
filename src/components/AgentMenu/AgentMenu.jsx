import { useDraggable } from "@dnd-kit/core";
import { useWorkflowStore } from "../../store/workflow.store";
import "./AgentMenu.css";

const DraggableAgent = ({ agent }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: agent._id
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="agent-menu-item"
    >
      {agent.name}
    </div>
  );
};

export default function AgentMenu() {
  const availableAgents = useWorkflowStore(
    s => s.availableAgents
  );

  return (
    <div
      className="agent-menu"
      style={{
        width: "20%",
        borderRight: "1px solid #ddd",
        padding: 10,
        overflowY: "auto"
      }}
    >
      <h3>Agents</h3>
      <p className="agent-menu-subtitle">Drag agents into workspace</p>
      {availableAgents.map(agent => (
        <DraggableAgent key={agent._id} agent={agent} />
      ))}
    </div>
  );
}
