import { useEffect } from "react";
import { DndContext, PointerSensor, useSensor, useSensors, pointerWithin } from "@dnd-kit/core";
import { Toaster } from "react-hot-toast";
import AgentMenu from "./components/AgentMenu/AgentMenu";
import Workspace from "./components/Workspace/Workspace";
import ChatPanel from "./components/ChatPanel/ChatPanel";
import { useWorkflowStore } from "./store/workflow.store";

function App() {
  const loadWorkflow = useWorkflowStore(s => s.loadWorkflow);
  const loadAgents = useWorkflowStore(s => s.loadAgents);
  const addAgent = useWorkflowStore(s => s.addAgent);
  const persist = useWorkflowStore(s => s.persist);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8,
    },
  });

  const sensors = useSensors(pointerSensor);

  useEffect(() => {
    loadWorkflow();
    loadAgents();
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || over.id !== "workspace") {
      return;
    }

    const availableAgents = useWorkflowStore.getState().availableAgents;
    const selected = availableAgents.find(a => a._id === active.id);

    if (!selected) return;

    addAgent(selected);
    persist();
  };

  return (
    <DndContext sensors={sensors} collisionDetection={pointerWithin} onDragEnd={handleDragEnd} >
      <div style={{ display: "flex", height: "100vh" }}>
        <AgentMenu />
        <Workspace />
        <ChatPanel />
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </DndContext>
  );
}

export default App;
