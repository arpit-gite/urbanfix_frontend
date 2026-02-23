import { useEffect } from "react";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
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

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5, // prevents accidental drag on click
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 150,      // press 150ms before drag
      tolerance: 5,
    },
  });

  const pointerSensor = useSensor(PointerSensor);

  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    pointerSensor
  );

  useEffect(() => {
    loadWorkflow();
    loadAgents();
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over?.id === "workspace") {
      const availableAgents = useWorkflowStore.getState().availableAgents;
      const selected = availableAgents.find(a => a._id === active.id);

      if (selected) {
        addAgent(selected);
        persist();
      }
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
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
