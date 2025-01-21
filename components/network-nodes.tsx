import { Handle, Position } from "reactflow"

interface NodeData {
  label: string
  value?: number
  color?: string
}

export function InputNode({ data }: { data: NodeData }) {
  const value = typeof data.value === "number" ? data.value : 0
  const intensity = value
  const backgroundColor = `rgba(34, 197, 94, ${intensity})`

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border border-gray-200">
      <Handle type="source" position={Position.Right} />
      <div className="font-bold text-sm">{data.label}</div>
      <div className="mt-2 w-full h-2 rounded-full bg-gray-100">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            backgroundColor,
            width: `${value * 100}%`,
          }}
        />
      </div>
      <div className="text-xs text-muted-foreground">Health: {(value * 100).toFixed(0)}%</div>
    </div>
  )
}

export function HiddenNode({ data }: { data: NodeData }) {
  const value = typeof data.value === "number" ? Math.max(0, Math.min(1, data.value)) : 0

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border border-gray-200">
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <div className="font-bold text-sm">H</div>
      <div className="text-xs text-muted-foreground">{(value * 100).toFixed(0)}%</div>
    </div>
  )
}

export function OutputNode({ data }: { data: NodeData }) {
  const value = typeof data.value === "number" ? Math.max(0, Math.min(1, data.value)) : 0
  const backgroundColor = `rgba(239, 68, 68, ${value})`

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border border-gray-200">
      <Handle type="target" position={Position.Left} />
      <div className="font-bold text-sm">{data.label}</div>
      <div className="mt-2 w-full h-2 rounded-full bg-gray-100">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            backgroundColor,
            width: `${value * 100}%`,
          }}
        />
      </div>
      <div className="text-xs text-muted-foreground mt-1">{(value * 100).toFixed(1)}% Abandoned</div>
      <div className="text-xs text-muted-foreground mt-1">
        {value < 0.2
          ? "Well Maintained"
          : value < 0.4
            ? "Minor Issues"
            : value < 0.6
              ? "Needs Attention"
              : value < 0.8
                ? "Severely Neglected"
                : "Completely Abandoned"}
      </div>
    </div>
  )
}

