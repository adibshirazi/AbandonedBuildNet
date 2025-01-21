"use client"

import { useCallback, useEffect, useState } from "react"
import ReactFlow, {
  type Node,
  type Edge,
  Background,
  Controls,
  ConnectionMode,
  useNodesState,
  useEdgesState,
} from "reactflow"
import "reactflow/dist/style.css"
import { Card } from "@/components/ui/card"
import { InputNode, HiddenNode, OutputNode } from "./components/network-nodes"
import { ControlPanel } from "./components/control-panel"
import { type NetworkState, forwardPropagate, initializeNetwork } from "./lib/neural-network"

const nodeTypes = {
  input: InputNode,
  hidden: HiddenNode,
  output: OutputNode,
}

export default function NeuralPlayground() {
  // Initialize network state with random weights
  const [network] = useState<NetworkState>(initializeNetwork())

  // Initialize input values
  const [inputs, setInputs] = useState([0.5, 0.5, 0.5, 0.5])

  // Initialize nodes and edges state
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  // Calculate network outputs whenever inputs change
  const [outputs, setOutputs] = useState<number[][]>([[]])

  useEffect(() => {
    const newOutputs = forwardPropagate(inputs, network)
    setOutputs(newOutputs)
  }, [inputs, network])

  // Create the neural network visualization
  const createNetwork = useCallback(() => {
    const newNodes: Node[] = [
      // Input nodes
      ...inputs.map((value, i) => ({
        id: `input-${i}`,
        type: "input",
        position: { x: 0, y: i * 100 },
        data: {
          label: ["Building Age", "Maintenance Score", "Occupancy Rate", "Structural Integrity"][i],
          value,
        },
      })),
      // Hidden layer nodes
      ...Array(4)
        .fill(0)
        .map((_, i) => ({
          id: `hidden-${i}`,
          type: "hidden",
          position: { x: 200, y: i * 100 },
          data: {
            label: `H${i + 1}`,
            value: outputs[1]?.[i] ?? 0,
          },
        })),
      // Output node
      {
        id: "output",
        type: "output",
        position: { x: 400, y: 150 },
        data: {
          label: "Abandoned?",
          value: outputs[2]?.[0] ?? 0,
        },
      },
    ]

    const newEdges: Edge[] = [
      // Connect input to hidden layer
      ...inputs.flatMap((_, i) =>
        Array(4)
          .fill(0)
          .map((_, j) => ({
            id: `input${i}-hidden${j}`,
            source: `input-${i}`,
            target: `hidden-${j}`,
            animated: true,
          })),
      ),
      // Connect hidden to output layer
      ...Array(4)
        .fill(0)
        .map((_, i) => ({
          id: `hidden${i}-output`,
          source: `hidden-${i}`,
          target: "output",
          animated: true,
        })),
    ]

    setNodes(newNodes)
    setEdges(newEdges)
  }, [inputs, outputs, setNodes, setEdges])

  // Update network visualization whenever outputs change
  useEffect(() => {
    createNetwork()
  }, [createNetwork, outputs])

  // Handle input changes
  const handleInputChange = (index: number, value: number) => {
    const newInputs = [...inputs]
    newInputs[index] = value
    setInputs(newInputs)
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="flex-1 p-8">
        <Card className="w-full h-[800px] relative">
          <div className="absolute inset-0">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              connectionMode={ConnectionMode.Loose}
              fitView
              fitViewOptions={{ padding: 0.2 }}
              minZoom={0.1}
              maxZoom={1.5}
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </Card>
      </div>
      <div className="w-[340px] p-8">
        <ControlPanel inputs={inputs} onInputChange={handleInputChange} />
      </div>
    </div>
  )
}

