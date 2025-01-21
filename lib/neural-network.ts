export type NeuronWeights = {
  weights: number[]
  bias: number
}

export type NetworkLayer = {
  neurons: NeuronWeights[]
}

export type NetworkState = {
  layers: NetworkLayer[]
}

// Simple weighted average calculation
function calculateWeightedAverage(inputs: number[]): number {
  // Weights for each input (must sum to 1)
  const weights = [0.3, 0.3, 0.2, 0.2] // Building age and maintenance weighted more heavily

  // Calculate weighted sum
  const weightedSum = inputs.reduce((sum, input, i) => sum + (1 - input) * weights[i], 0)

  return weightedSum
}

// Forward propagation through entire network
export function forwardPropagate(inputs: number[], network: NetworkState): number[][] {
  const weightedAverage = calculateWeightedAverage(inputs)

  // Store all outputs for visualization
  return [
    inputs,
    [weightedAverage, weightedAverage, weightedAverage, weightedAverage], // Hidden layer
    [weightedAverage], // Output layer
  ]
}

// Initialize network (simplified for deterministic behavior)
export function initializeNetwork(): NetworkState {
  return {
    layers: [
      {
        neurons: Array(4)
          .fill(0)
          .map(() => ({
            weights: [0.25, 0.25, 0.25, 0.25],
            bias: 0,
          })),
      },
      {
        neurons: [
          {
            weights: [0.25, 0.25, 0.25, 0.25],
            bias: 0,
          },
        ],
      },
    ],
  }
}

