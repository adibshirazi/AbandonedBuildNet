import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ControlPanelProps {
  inputs: number[]
  onInputChange: (index: number, value: number) => void
}

export function ControlPanel({ inputs, onInputChange }: ControlPanelProps) {
  const inputLabels = [
    {
      name: "Building Age",
      description: "Newer (100%) to Older (0%)",
    },
    {
      name: "Maintenance Score",
      description: "Well maintained (100%) to Neglected (0%)",
    },
    {
      name: "Occupancy Rate",
      description: "Fully occupied (100%) to Empty (0%)",
    },
    {
      name: "Structural Integrity",
      description: "Excellent (100%) to Poor (0%)",
    },
  ]

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>Building Health Indicators</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {inputs.map((value, index) => (
          <div key={index} className="space-y-2">
            <Label>{inputLabels[index].name}</Label>
            <p className="text-xs text-muted-foreground">{inputLabels[index].description}</p>
            <Slider
              value={[value]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={([newValue]) => onInputChange(index, newValue)}
            />
            <div className="text-xs text-muted-foreground text-right">{(value * 100).toFixed(0)}%</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

