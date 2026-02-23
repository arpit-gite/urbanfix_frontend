import { useDroppable } from "@dnd-kit/core";
import { useWorkflowStore } from "../../store/workflow.store";
import AgentCard from "../AgentCard/AgentCard";

export default function Workspace() {
  const { setNodeRef } = useDroppable({
    id: "workspace"
  });

  const agents = useWorkflowStore(s => s.agents);

  return (
    <div
      ref={setNodeRef}
      style={{
        width: "50%",
        padding: 20,
        background: "#fafafa"
      }}
    >
      <h3>Workspace</h3>
      {agents.map(agent => (
        <AgentCard key={agent._id} agent={agent} />
      ))}
    </div>
  );
}
