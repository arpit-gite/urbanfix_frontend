import { useDraggable } from "@dnd-kit/core";
import { useWorkflowStore } from "../../store/workflow.store";
import "./AgentMenu.css";

const DraggableAgent = ({ agent }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: agent._id
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`agent-menu-item ${isDragging ? "dragging" : ""}`}
    >
      <div className="agent-menu-item-content">
        <span className="agent-menu-name">{agent.name}</span>
        <span className="agent-menu-type">{agent.type}</span>
      </div>
    </div>
  );
};

export default function AgentMenu() {
  const availableAgents = useWorkflowStore(s => s.availableAgents);

  return (
    <div className="agent-menu">
      <div className="agent-menu-header">
        <h3>Agents</h3>
        <p className="agent-menu-subtitle">
          Drag agents into workspace
        </p>
      </div>

      <div className="agent-menu-list">
        {availableAgents.map(agent => (
          <DraggableAgent key={agent._id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
