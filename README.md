# AbandonedBuildNet

AbandonedBuildNet is an interactive React + Next.js application that visualizes how neural networks predict the likelihood of buildings being abandoned. Users can adjust building health indicators to see real-time predictions and gain insights into the factors affecting abandonment.

## Features

- Neural Network Visualization: Displays input, hidden, and output nodes in an intuitive flow.
- Interactive Controls: Users can adjust indicators like building age, maintenance score, and occupancy rate to see how they impact predictions.
- Real-Time Feedback: Provides a clear abandonment score with detailed statuses such as "Well Maintained" or "Completely Abandoned."
- Modern Design: Built with TailwindCSS for a clean, responsive user interface.

## Technologies Used

- Next.js: React framework with server-side rendering capabilities.
- TailwindCSS: For styling and responsive design.
- TypeScript: Ensures type safety and maintainable code.

## How It Works

- Neural Network Playground: 
  - Input indicators (e.g., Building Age, Maintenance Score) feed into a simulated neural network.
  - Outputs are dynamically updated to show the probability of abandonment.
- Control Panel: 
  - Sliders allow for real-time adjustments of key metrics.
  - Immediate feedback visualizes the impact of changes.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/adibshirazi/AbandonedBuildNet.git
   cd AbandonedBuildNet
   ```

2. Install dependencies:
    ```sh
    npm install
    ```
  

3. Start the development server:
    ```sh
    npm run dev
    ```

    
3. Open your browser and navigate to:
    ```sh
    [npm run dev](http://localhost:3000)
    ```
## License

This project is open-source and available under the [AGPL-3.0 License](LICENSE).
